from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Users = LAPBlogs['users']

def login(request):
    user = {}
    if request.POST:
        status = Users.find_one({"email":request.POST['email']})
        if(status):
            if(status["password"] == request.POST["password"]): #密码正确
                print(status["password"])
                del status["password"]   #删除password属性
                user = jsonStr(status)
                obj = {"message":'登录成功!',"status":1,"user":user}
            else:
                obj = {"message":'密码错误!',"status":-4}
        else:
            obj = {"message":"没有找到此账号!","status":-3}
    return JsonResponse(obj)
