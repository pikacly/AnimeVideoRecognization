# 番剧名 - 集数 - 帧数 - 序号
import mimetypes
import os
import pickle
import re
import time
from wsgiref.util import FileWrapper

from AnimeRecog.main import processor
from PIL import Image
from annoy import AnnoyIndex
from django.core.files.base import ContentFile
from django.http import StreamingHttpResponse
from django.shortcuts import HttpResponse
from django.shortcuts import render


def index(request):
    # 主页
    return render(request, 'index.html')


def open_img(request):  # 打开图片
    return render(request, 'open.html')


def upload_image(request):
    if request.method.upper() == "POST":
        img = request.FILES.get("image")
        image = Image.open(ContentFile(img.read()))

        key = generate_key()
        image.save("media/images/{}.png".format(key))
        print(key)

        # return redirect("/result?key=" + key)
        return HttpResponse(key)


names_dict = pickle.load(open("../data/names.d", "rb"))
eng2name = pickle.load(open("../data/eng2name.d", "rb"))


def result(req):
    start_time = time.time()

    key = req.GET.get("key")
    img_uploaded = Image.open("media/images/{}.png".format(key))
    img_result, img_result2, count = img_match(img_uploaded)

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
        h.save("media/temp/{}-{}.png".format(key, i))
    face_list = []
    for i in range(result_size):
        face_list.append("/static/temp/{}-{}.png".format(key, i))

    result_big_list = []
    for j in range(result_size):
        result = process_match_result(img_result[j])
        result_big_list.append(result)

    end_time = time.time()
    return render(req, "result.html",
                  {
                      "key": key,
                      "key_path": "/static/images/{}.png".format(key),
                      "result_big_list": result_big_list,
                      "face_list": face_list,
                      "size": result_size,
                      "time": "%.2f" % (end_time - start_time),
                      "count": count,
                  })


def result_advanced(request):
    start_time = time.time()

    key = request.GET.get("key")
    name = eng2name[request.GET.get("name")]

    img = Image.open("media/images/{}.png".format(key))
    passport_path = '/Volumes/My Passport/data/'

    img_size = 120
    a = AnnoyIndex(9 * 512)
    path = passport_path + "models/" + name + "_{}.ann".format(img_size)
    a.load(path)

    d = pickle.load(open(passport_path + "dicts/" + name + "_{}.dict".format(img_size), "rb"))
    res = processor.vgg_annoy_match(img, img_size=img_size, a=a, d=d, count=20)

    a = None
    d = None

    end_time = time.time()

    return render(request, "result_advanced.html",
                  {
                      "key": key,
                      "key_path": "/static/images/{}.png".format(key),
                      "name": request.GET.get("name"),
                      "time": "%.2f" % (end_time - start_time),
                      "data": process_match_result(res),
                  })


def process_match_result(match_result):
    result = []
    for i in match_result:
        result_list_i = {}
        pathlist = re.split(r"[-\\.]", str(i))

        eng_name = pathlist[0].upper()
        if eng_name == 'QMNXDZZ':
            eng_name = 'QMNXDZN'
        elif eng_name == 'WTSHYLKZMB':
            eng_name = 'WTSHYLGZMB'
        result_list_i["name"] = names_dict[eng_name]
        pathlist[0] = eng_name

        result_list_i["number"] \
            = pathlist[1] = pathlist[1] if len(pathlist[1]) > 1 else "0" + pathlist[1]

        result_list_i["cutnum"] = pathlist[2]

        result_list_i["path"] \
            = "/static/" + pathlist[0].upper() + "/" \
              + pathlist[0].upper() + "-" \
              + pathlist[1] + "-" \
              + pathlist[2] + ".jpg"

        result_list_i['video_path'] = "{}/{}.mp4".format(pathlist[0].upper(), pathlist[1])

        result_list_i["cutsecond"] \
            = int(result_list_i["cutnum"]) // name2fps[result_list_i["video_path"]] - 2

        result_list_i["time"] \
            = stringify_frame(result_list_i["cutnum"], result_list_i["video_path"])
        result.append(result_list_i)

    return result


def generate_key():
    import random

    time_stamp = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
    for i in range(5):
        time_stamp += random.choice('abcdefghijklmnopqrstuvwxyz')
    return time_stamp


name2fps = pickle.load(open("../data/video2fps.d", "rb"))


def stringify_frame(number: int, name: str):
    fps = name2fps[name]

    number = int(number)
    seconds = number // fps
    minutes = seconds // 60

    return "%02d:%02d" % (minutes, seconds % 60)


def img_match(img):
    # img -> PIL.Image
    res = processor.recognize(img)
    resp = []
    print(res)

    count = {}
    for i in res:
        match_result = processor.vgg_annoy_match(i, count=150)
        resp.append(match_result[:10])

        # count and guess
        for m in match_result:
            name = m.split("-")[0]
            if count.get(name) is None:
                count[name] = 1
            else:
                count[name] += 1
    total_size = len(res) * 150
    new_count = {}
    for key in count.keys():
        name = names_dict[key.upper()]
        new_count[name] = "%.2f%%" % (count[key] / total_size * 100)

    return resp, res, new_count


video_path = '/Volumes/My Passport/video_resources/'


def file_iterator(file_name, chunk_size=8192, offset=0, length=None):
    with open(file_name, "rb") as f:
        f.seek(offset, os.SEEK_SET)
        remaining = length
        while True:
            bytes_length = chunk_size if remaining is None else min(remaining, chunk_size)
            data = f.read(bytes_length)
            if not data:
                break
            if remaining:
                remaining -= len(data)
            yield data


def stream_video(request):
    """将视频文件以流媒体的方式响应"""
    range_header = request.META.get('HTTP_RANGE', '').strip()
    range_re = re.compile(r'bytes\s*=\s*(\d+)\s*-\s*(\d*)', re.I)
    range_match = range_re.match(range_header)
    
    path = video_path + request.GET.get('path')
    size = os.path.getsize(path)
    content_type, encoding = mimetypes.guess_type(path)
    content_type = content_type or 'application/octet-stream'
    if range_match:
        first_byte, last_byte = range_match.groups()
        first_byte = int(first_byte) if first_byte else 0
        last_byte = first_byte + 1024 * 1024 * 10
        if last_byte >= size:
            last_byte = size - 1
        length = last_byte - first_byte + 1
        resp = StreamingHttpResponse(file_iterator(path, offset=first_byte, length=length), status=206,
                                     content_type=content_type)
        resp['Content-Length'] = str(length)
        resp['Content-Range'] = 'bytes %s-%s/%s' % (first_byte, last_byte, size)
    else:
        resp = StreamingHttpResponse(FileWrapper(open(path, 'rb')), content_type=content_type)
        resp['Content-Length'] = str(size)
    resp['Accept-Ranges'] = 'bytes'
    return resp


def test(request):
    return render(request, "test.html")
