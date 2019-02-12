from django.http import JsonResponse,HttpResponse
import datetime
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Users = LAPBlogs['users']

def searchUser(request):
    obj = {}
    status = Users.find_one({"email":request.POST['email']})
    if status:
        obj["status"] = 1
        obj["message"] = "合法用户"
    else:
        obj["status"] = -3
        obj["message"] = "非法用户"
    return JsonResponse(obj, safe = False)

def registe(request):
    user = {}
    obj = {}
    if request.POST:
        user['name'] = request.POST['name']
        user['email'] = request.POST['email']
        user['password'] = request.POST['password']
        user['blog'] = [ ]                            #博客的ObjectId
        user['temporarySave'] = ""                    #暂存区
        user['lastLoginTime'] = ""                    #上次登录时间
        user['currentLoginTime'] = ""                 #此次登录时间
        status = Users.find_one({"email":user['email']})
        if status:
            obj["status"] = -1
            obj["message"] = "账号已被注册"
        else:
            Users.insert(user)
            obj["status"] = 1
            obj["message"] = "注册成功"
    else:
        obj["message"] = "请求方式不是post!"
        obj["status"] = -5
    return JsonResponse(obj, safe = False)

def login(request):
    user = {}
    if request.POST:
        status = Users.find_one({"email":request.POST['email']})
        if(status):
            if(status["password"] == request.POST["password"]): #密码正确
                user = {
                        "_id":status["_id"],
                        "name":status["name"],
                        "email":status["email"],
                        "blog":status["blog"],
                        "temporarySave":status["temporarySave"],
                        "lastLoginTime":status["lastLoginTime"]
                        }
                user = jsonStr(user)
                obj = {"message":'登录成功!',"status":1,"user":user}
                #更新上次登录时间
                currentTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                status["lastLoginTime"] = status["currentLoginTime"]
                status["currentLoginTime"] = currentTime
                Users.update({"email":request.POST['email']},status)
            else:
                obj = {"message":'密码错误!',"status":-4}
        else:
            obj = {"message":"没有找到此账号!","status":-3}
    else:
        obj = {"message":"请求方式不是post!","status":-5}
    return JsonResponse(obj,safe = False)
    
   