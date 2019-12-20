from django.http import HttpResponse
from django.shortcuts import render

def index(request):#主页
    return render(request, 'index.html')

def open(request):#打开图片
    return render(request, 'open.html')
