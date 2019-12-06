from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.shortcuts import render
from annoy import AnnoyIndex
from Project.match import *
from PIL import Image
import pickle

a = AnnoyIndex(512)  # fixed
# a.load("../../data/models/faces_60.ann")
# d = pickle.load("../../data/dicts/faces_60.dict")


def img_match(img):
    # img -> PIL.Image
    res, t0 = recognize(img)
    if len(res) == 0:
        return "400"

    global a, d
    img = res[0]
    return vgg_annoy_match(img.resize((60, 60)), a, d)


def image_test(request):
    return render(request, "test.html")


def upload_image(request):
    if request.method.upper() == "POST":
        img = request.FILES.get("images")
        image = Image.open(ContentFile(img.read()))
        # image.save("static/test.jpg")
        return HttpResponse("success")


def index(request):
    # 主页
    return render(request, 'index.html')
