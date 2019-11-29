from django.http import HttpResponse
from annoy import AnnoyIndex
from PIL import Image
from ..Project.match import *
import pickle

a = AnnoyIndex(512)  # fixed
a.load("../../data/models/faces_60.ann")
d = pickle.load("../../data/dicts/faces_60.dict")


def img_match(img):
    # img -> PIL.Image
    res, t0 = recognize(img)
    if len(res) == 0:
        return "400"

    global a, d
    img = res[0]
    return vgg_annoy_match(img.resize((60, 60)), a, d)
