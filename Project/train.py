from keras.applications.vgg16 import VGG16
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input
from annoy import AnnoyIndex
import tensorflow as tf
import numpy as np
import os
import time
import pickle

model = VGG16(weights='imagenet', include_top=False)
graph = tf.get_default_graph()
img_size0 = 60
img_size = (img_size0, img_size0)


def _vgg16_extract_features(img_path):
    img = image.load_img(img_path, target_size=img_size)
    return vgg16_extract_features(img)


def vgg16_extract_features(img):
    # img -> PIL.Image

    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    with graph.as_default():
        features = model.predict(x)
    return features


def build_vgg16_annoy_tree(images_path, name=""):
    paths = [os.path.join(images_path, p) for p in sorted(os.listdir(images_path))]

    result = {}
    first = True
    files_size = len(paths)
    for i in range(files_size):
        path = paths[i]

        print('Extracting features from image %s (%.2f/100%%)' % (path, (i + 1) * 100 / files_size))
        feature = _vgg16_extract_features(path)
        if feature is not None:
            feature = feature.flatten().tolist()
            if first:
                first = False
                annoy = AnnoyIndex(len(feature), metric='angular')
                with open("../../data/{}".format(img_size0), "w") as f:
                    pass
            result[i] = path.split("/")[-1].lower()
            annoy.add_item(i, feature)

    tree_size = 100
    annoy.build(tree_size)
    annoy.save("../../data/models/{}_{}.ann".format(name, img_size0))

    # 将存于pickled 文件
    with open("../../data/dicts/{}_{}.dict".format(name, img_size0), 'wb') as fp:
        pickle.dump(result, fp)


if __name__ == "__main__":
    # build all faces index
    print("building /faces...")
    build_vgg16_annoy_tree("../../faces", name="faces")

    # separately build animes indexs
    oral_frames_path = "../../oral_frames"
    files = [os.path.join(oral_frames_path, f) for f in sorted(os.listdir(oral_frames_path))]
    for file in files:
        if os.path.isdir(file):
            print("building {}...".format(file))
            build_vgg16_annoy_tree(file, name=str(file.split("/")[-1]))
