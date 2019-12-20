#番剧名 - 集数 - 帧数 - 序号
import re
from collections import defaultdict

import matplotlib.image as mpimg  # mpimg 用于读取图片
from django.shortcuts import render

from .models import *
from .routine_task import *

lena = mpimg.imread('lena.png')
def result(req,result_list):
    result_dict=defaultdict(dict)
    for i in result_list:
        pathlist =re.split(r"-", str(i))
        result_dict[i]["name"]=pathlist[0]
        result_dict[i]["number"]=pathlist[1]
        result_dict[i]["cutnum"] = pathlist[2]
        result_dict[i]["headnum"] = pathlist[3]
        result_dict[i]["path"]=i
    return render(req, result_list)

def result1(req,i):
    pathlist = re.split(r"-", str(i))
    result={}
    result["name"]=pathlist[0]
    result["number"]=pathlist[1]
    result["cutnum"] = pathlist[2]
    result["headnum"] = pathlist[3]
    result["path"] = str(i)#此处可以修改地址
    pic= mpimg.imread(path1)

    return render(req, result,pic)


from django.core.files.base import ContentFile
from django.http import HttpResponse
from django.shortcuts import render
from annoy import AnnoyIndex
from Project.match import *
from PIL import Image
# from AnimeRecog.main import processor
import pickle


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
        image2 = Image.open(ContentFile(img.read()))

        # image.save("static/test.jpg")
        res, time = img_match(image2)
        print(res)

        # test
        # res, t = processor.recognize(image2)
        # print(res)
        return HttpResponse("success")


def index(request):
    # 主页
    return render(request, 'index.html')


a = AnnoyIndex(512)  # fixed
a.load("../data/models/faces_60.ann")
d = pickle.load(open("../data/dicts/faces_60.dict", "rb"))
# img_match(Image.open("Project/test.jpg"))
