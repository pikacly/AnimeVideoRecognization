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

