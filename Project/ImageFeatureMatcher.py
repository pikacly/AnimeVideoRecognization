from annoy import AnnoyIndex
import cv2
import numpy as np
import scipy
import scipy.spatial
# from scipy.misc import imread
from PIL import Image
import pickle
import random
import os
import time
import matplotlib.pyplot as plt


VECTOR_SIZE = 32

# Feature extractor
# 特征提取器
def extract_features(image_path, vector_size=VECTOR_SIZE):
    # image = imread(image_path, mode="RGB")
    # image = Image.open(image_path)
    image = cv2.imread(image_path)
    try:
        # Using KAZE, cause SIFT, ORB and other was moved to additional module
        # which is adding addtional pain during install
        # 此处为了简化安装步骤，使用KAZE，因为SIFT/ORB以及其他特征算子需要安
        # 装额外的模块
        alg = cv2.KAZE_create()
        # Finding image keypoints
        # 寻找图像关键点
        kps = alg.detect(image)
        # Getting first 32 of them.
        # 计算前32个
        # Number of keypoints is varies depend on image size and color pallet
        # 关键点的数量取决于图像大小以及彩色调色板
        # Sorting them based on keypoint response value(bigger is better)
        # 根据关键点的返回值进行排序（越大越好）
        kps = sorted(kps, key=lambda x: -x.response)[:vector_size]
        # computing descriptors vector
        # 计算描述符向量
        kps, dsc = alg.compute(image, kps)
        # Flatten all of them in one big vector - our feature vector
        # 将其放在一个大的向量中，作为我们的特征向量
        dsc = dsc.flatten()
        # Making descriptor of same size
        # 使描述符的大小一致
        # Descriptor vector size is 64
        # 描述符向量的大小为64
        needed_size = (vector_size * 64)
        if dsc.size < needed_size:
            # if we have less the 32 descriptors then just adding zeros
            # at the end of our feature vector
            # 如果少于32个描述符，则在特征向量后面补零
            dsc = np.concatenate([dsc, np.zeros(needed_size - dsc.size)])
    except Exception as e:
        print('Error: ', e)
        return None

    return dsc


def batch_extractor(images_path, pickled_db_path="features.pck"):
    files = [os.path.join(images_path, p) for p in sorted(os.listdir(images_path))]
    result = {}
    for f in files:
        print('Extracting features from image %s' % f)
        feature = extract_features(f)
        if feature is not None:
            name = f.split('/')[-1].lower()
            result[name] = feature

    # saving all our feature vectors in pickled file
    # 将特征向量存于pickled 文件
    with open(pickled_db_path, 'wb') as fp:
        pickle.dump(result, fp)


def batch_extractor_annoy(images_path, pickled_db_path="features.ann"):
    vector_length = VECTOR_SIZE * 64
    annoy = AnnoyIndex(vector_length, metric='angular')

    files = [os.path.join(images_path, p) for p in sorted(os.listdir(images_path))]
    result = {}
    for i in range(len(files)):
        f = files[i]
        print('Extracting features from image %s' % f)
        feature = extract_features(f)
        if feature is not None:
            name = f.split('/')[-1].lower()
            result[i] = name
            annoy.add_item(i, feature.tolist())
    tree_size = 100
    annoy.build(tree_size)
    annoy.save(pickled_db_path)

    # saving all our feature vectors in pickled file
    # 将存于pickled 文件
    with open("ann_dict.dict", 'wb') as fp:
        pickle.dump(result, fp)


class Matcher(object):

    def __init__(self, pickled_db_path="features.pck"):
        with open(pickled_db_path, "rb") as fp:
            self.data = pickle.load(fp)
        self.names = []
        self.matrix = []
        for k, v in self.data.items():
            self.names.append(k)
            self.matrix.append(v)
        self.matrix = np.array(self.matrix)
        self.names = np.array(self.names)

    def cos_cdist(self, vector):
        # getting cosine distance between search image and images database
        # 计算待搜索图像与数据库图像的余弦距离
        v = vector.reshape(1, -1)
        return scipy.spatial.distance.cdist(self.matrix, v, 'cosine').reshape(-1)

    def match(self, image_path, topn=5):
        time_start = time.time()

        features = extract_features(image_path)
        img_distances = self.cos_cdist(features)
        # getting top 5 records
        # 获得前5个记录
        nearest_ids = np.argsort(img_distances)[:topn].tolist()

        nearest_img_paths = self.names[nearest_ids].tolist()

        time_end = time.time()
        print("costs {}s".format(time_end - time_start))
        return nearest_img_paths, img_distances[nearest_ids].tolist()


