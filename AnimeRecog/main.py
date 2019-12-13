from Project.predict import YOLO
from keras.applications.vgg16 import VGG16
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input
from annoy import AnnoyIndex
import time
import pickle
import numpy as np


class Processor(object):
    def __init__(self):
        self.yolo = YOLO()
        print("*" * 6 + "yolo loaded" + "*" * 6)

        self.img_size0 = 60
        self.vgg16_model = VGG16(weights='imagenet', include_top=False)
        print("*" * 6 + "vgg16 model loaded" + "*" * 6)

        self.a = AnnoyIndex(512)  # fixed
        self.a.load("../data/models/faces_60.ann")
        print("*" * 6 + "AnnoyIndex loaded" + "*" * 6)

        self.d = pickle.load(open("../data/dicts/faces_60.dict", "rb"))
        pass

    def recognize(self, img) -> tuple:
        # img -> PIL.Image
        # 返回识别的动漫头像
        # return: PIL.Image
        res = []

        start = time.time()
        boxes, scores = self.yolo.detect_image(img)
        print(boxes)

        for i, box in enumerate(boxes):
            top, left, bottom, right = box
            cropped = img.crop((left, top, right, bottom))
            res.append(cropped)
        end = time.time()
        print("cost {}s".format(end - start))

        return res, end - start

    def vgg_annoy_match(self, img):
        if img.mode.lower() != "rgb":
            img = img.convert("RGB")
        elif img.size != (self.img_size0, self.img_size0):
            img = img.resize((self.img_size0, self.img_size0))

        features = self.vgg16_extract_features(img)
        res = []

        start = time.time()
        for i in self.a.get_nns_by_vector(features.flatten().tolist(), 10):
            # print(annoy_dict[i])
            res.append(self.d[i])
        end = time.time()
        print("cost {}s".format(end - start))

        return res, end - start

    def vgg16_extract_features(self, img):
        # img -> PIL.Image

        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        features = self.vgg16_model.predict(x)
        return features


# processor = Processor()
