import pickle
import time

import numpy as np
import tensorflow as tf
from Project.predict import YOLO
from annoy import AnnoyIndex
from keras.applications.vgg16 import VGG16
from keras.applications.vgg16 import preprocess_input
from keras.preprocessing import image


class Processor(object):
    def __init__(self):
        self.yolo = YOLO()
        print("*" * 6 + "yolo loaded" + "*" * 6)

        self.img_size0 = 120
        self.vgg16_model = VGG16(weights='imagenet', include_top=False)
        self.vgg16_graph = tf.get_default_graph()
        print("*" * 6 + "vgg16 model loaded" + "*" * 6)

        self.a = AnnoyIndex(9 * 512)  # fixed
        self.a.load("../data/models/faces_{}.ann".format(self.img_size0))
        print("*" * 6 + "AnnoyIndex loaded" + "*" * 6)

        self.d = pickle.load(open("../data/dicts/faces_{}.dict".format(self.img_size0), "rb"))
        pass

    def recognize(self, img) -> tuple:
        # img -> PIL.Image
        # 返回识别的动漫头像
        # return: PIL.Image
        res = []

        boxes, scores = self.yolo.detect_image(img)

        for i, box in enumerate(boxes):
            top, left, bottom, right = box
            cropped = img.crop((left, top, right, bottom))
            res.append(cropped)

        return res

    def vgg_annoy_match(self, img, img_size=None, a=None, d=None, count=100):
        if img.mode.lower() != "rgb":
            img = img.convert("RGB")

        img_size = self.img_size0 if img_size is None else img_size
        if img.size != (img_size, img_size):
            img = img.resize((img_size, img_size))

        features = self.vgg16_extract_features(img)
        res = []

        a = self.a if a is None else a
        d = self.d if d is None else d
        for i in a.get_nns_by_vector(features.flatten().tolist(), count):
            res.append(d[i])

        return res

    def vgg16_extract_features(self, img):
        # img -> PIL.Image

        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = preprocess_input(x)

        with self.vgg16_graph.as_default():
            features = self.vgg16_model.predict(x)
            return features

    def match_by_name(self, img, name):
        pass


processor = Processor()
