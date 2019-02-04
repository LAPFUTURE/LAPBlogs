from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Users = LAPBlogs['users']

def registe(request):
    user = {}
    if request.POST:
        user['name'] = request.POST['name']
        user['email'] = request.POST['email']
        user['password'] = request.POST['password']
        status = Users.find_one({"email":user['email']})
    obj = {}
    if status:
        obj["status"] = -1
        obj["message"] = "账号已被注册"
        return JsonResponse(obj, safe = False)
    else:
        Users.save(user)
        obj["status"] = 1
        obj["message"] = "注册成功"
        return JsonResponse(obj, safe = False)
    
   