# 番剧名 - 集数 - 帧数 - 序号
from AnimeRecog.main import processor
import pickle
import re
import time

from PIL import Image
from annoy import AnnoyIndex
from django.core.files.base import ContentFile
from django.shortcuts import redirect
from django.shortcuts import render


def index(request):
    # 主页
    return render(request, 'index.html')


def open_img(request):  # 打开图片
    return render(request, 'open.html')


def upload_image(request):
    if request.method.upper() == "POST":
        img = request.FILES.get("images")
        image = Image.open(ContentFile(img.read()))

        key = generate_key()
        image.save("static/images/{}.png".format(key))
        print(key)

        return redirect("/result?key=" + key)


names_dict = pickle.load(open("../data/names.d", "rb"))


def result(req):
    # 【[{name:,number:,cutnum,headnum:,path:,}...10个]，。。。3个】
    key = req.GET.get("key")
    img_uploaded = Image.open("static/images/{}.png".format(key))
    img_result, img_result2 = img_match(img_uploaded)

    # 取前三个结果
    if len(img_result2) > 3:
        img_result = img_result[:3]
        img_result2 = img_result2[:3]
    result_size = len(img_result2)

    print(img_result)
    '''
    [['yjsldxbd-06-14760-0.jpg', 'yjsldxbd-06-6960-0.jpg', 'yjsldxbd-06-14400-0.jpg', 'yjsldxbd-06-21720-0.jpg', 'yjsldxbd-07-1080-0.jpg', 'yjsldxbd-06-13560-0.jpg', 'yjsldxbd-06-30840-1.jpg', 'yjsldxbd-06-11520-0.jpg', 'yjsldxbd-07-1200-0.jpg', 'yjsldxbd-01-23760-0.jpg']]
    '''
    print(img_result2)
    # 将截取的动漫头像暂存到本地
    for i, h in enumerate(img_result2):
        h.save("static/temp/{}-{}.png".format(key, i))

    result_big_list = []
    for j in range(result_size):
        big_result = []
        for i in img_result[j]:
            result_list_i = {}
            pathlist = re.split(r"[-\\.]", str(i))
            result_list_i["name"] = names_dict[pathlist[0].upper()]
            result_list_i["number"] = pathlist[1]
            result_list_i["cutnum"] = pathlist[2]
            result_list_i["headnum"] = pathlist[3]
            result_list_i["path"] = "/static/" + pathlist[0].upper() + "/" \
                                    + pathlist[0].upper() + "-"\
                                    + pathlist[1] + "-"\
                                    + pathlist[2] + ".jpg"
            big_result.append(result_list_i)
        result_big_list.append(big_result)

    print(result_big_list)
    return render(req, "result.html",
                  {
                      "key": key,
                      "result_big_list": result_big_list,
                      "size": result_size
                  })


def generate_key():
    import random

    time_stamp = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    for i in range(5):
        time_stamp += random.choice('abcdefghijklmnopqrstuvwxyz')
    return time_stamp


def img_match(img):
    # img -> PIL.Image
    res = processor.recognize(img)
    resp = []
    print(res)

    for i in res:
        resp.append(processor.vgg_annoy_match(i.resize((60, 60))))
    return resp, res

