from Project.predict import YOLO
from Project.train import vgg16_extract_features
import time

yolo = YOLO()
img_size0 = 60


def recognize(img) -> tuple:
    # img -> PIL.Image
    # 返回识别的动漫头像
    # return: PIL.Image
    global yolo
    res = []

    start = time.time()
    boxes, scores = yolo.detect_image(img)
    for i, box in enumerate(boxes):
        top, left, bottom, right = box
        cropped = img.crop((left, top, right, bottom))
        res.append(cropped)
    end = time.time()
    print("cost {}s".format(end - start))

    return res, end - start


def vgg_annoy_match(img, annoy_index, annoy_dict):
    if img.mode.lower() != "rgb":
        img = img.convert("RGB")
    elif img.size != (img_size0, img_size0):
        img = img.resize((img_size0, img_size0))
    features = vgg16_extract_features(img)
    res = []

    start = time.time()
    for i in annoy_index.get_nns_by_vector(features.flatten().tolist(), 10):
        # print(annoy_dict[i])
        res.append(annoy_dict[i])
    end = time.time()
    print("cost {}s".format(end - start))

    return res, end - start
