import os

import cv2
from PIL import Image
from predict import YOLO
from progressbar import ProgressBar
import imagehash

path_images = "videoImages/"
yolo = YOLO()


def get_frame(file: str, video_name: str, gap: int):
    # print("reading {}...".format(file))
    i = 0

    cap = cv2.VideoCapture(file)
    while cap.isOpened():
        success, frame = cap.read()
        i += 1

        if not success:
            break
        elif i % gap == 0:
            # 番剧名-集数-帧数.jpg
            cv2.imwrite(path_images + video_name + "-{}.jpg".format(i), frame)


def recog_faces(file: str):
    """
    识别图片中的人脸并保存至faces文件夹中
    """

    # print("recognizing " + file)
    image_full_path = path_images + file
    try:
        image = Image.open(image_full_path)
        boxes, scores = yolo.detect_image(image)
        for i, box in enumerate(boxes):
            top, left, bottom, right = box
            cropped = image.crop((left, top, right, bottom))
            # 番剧名-集数-帧数-序号.jpg
            cropped.save("faces/" + file.split(".")[0] + "-{}.jpg".format(i))

        if len(boxes) == 0:
            os.remove(image_full_path)
        # else:
        #     shutil.move(image_full_path, "oral_frames")
    except IOError:
        print("ERROR: {}".format(image_full_path))
        os.remove(image_full_path)


if __name__ == '__main__':
    root_dir = "../../resources"

    # 遍历根目录下的文件夹
    for dir in os.listdir(root_dir):
        dir_full_path = os.path.join(root_dir, dir)
        # 如果文件是目录
        if os.path.isdir(dir_full_path):
            # 遍历目录下的所有视频资源
            print("reading {}...".format(dir_full_path))

            files = os.listdir(dir_full_path)
            count = 0
            p = ProgressBar()
            for i in p(range(len(files))):
                file = files[count]
                if not file.startswith("."):
                    file_name = file.split(".")[0]
                    file_full_path = os.path.join(dir_full_path, file)
                    get_frame(file_full_path, "{}-{}".format(dir, file_name), 120)
                    # 删除资源文件
                    os.remove(file_full_path)
                count += 1

    # 识别所有帧数里的人脸并保存至faces文件夹
    images = os.listdir(path_images)
    count = 0
    p = ProgressBar()
    for i in p(range(len(images))):
        image = images[count]
        if image.endswith(".jpg"):
            recog_faces(image)
        count += 1

