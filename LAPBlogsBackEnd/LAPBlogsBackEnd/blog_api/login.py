from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Users = LAPBlogs['users']

def login(request):
    user = {}
    if request.POST:
        user['email'] = request.POST['email']
        user['password'] = request.POST['password']
        status = Users.find_one({"email":user['email']})
        if(status):
            del status["password"]
            user = jsonStr(status)
            obj = {"message":'Login successfully!',"status":"1","user":user}
        else:
            obj = {"message":"Login fail! email or password is false!","status":"2"}
    return JsonResponse(obj)
