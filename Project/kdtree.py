import numpy as np
import numpy as np
import os
import time
from sklearn.neighbors import KDTree
from sklearn.neighbors import KDTree


def average_hash(image, hash_size=6):
    if hash_size < 2:
        raise ValueError("Hash size must be greater than or equal to 2")
    image = image.convert("L").resize((hash_size, hash_size), Image.ANTIALIAS)

    pixels = np.asarray(image)
    avg = pixels.mean()
    diff = pixels > avg
    flatten = []
    for i in diff:
        for j in i:
            flatten.append(j)
    return flatten


pathfile = []
for file in os.listdir("D:/YOLO/faces"):
    pathfile.append("D:/YOLO/faces/" + str(file))
fhashlist = []
for i in pathfile:
    fhashlist.append(average_hash(Image.open(i), 6))

start = time.clock()

test = [average_hash(Image.open("D:/YOLO/faces_test/LL-01-7560-1.jpg"), hash_size=6)]
X = np.array(fhashlist)
tree = KDTree(X)
start = time.clock()
dist, ind = tree.query(test, k=10)
end = time.clock()
print(dist)
print(ind)
print(X[ind])
print ("read: %f s" % (end - start))