from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
from bson.objectid import ObjectId
import datetime
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]
#访问记录
IPs = LAPBlogs['ips']

#保存暂存区
def ipQuote(request):
    if request.POST:
        try:
            currentTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

            ip = {
                "origin":request.POST["origin"],
                "referer":request.POST["referer"],
                "userAgent":request.POST["user-agent"],
                "refererTime":currentTime
            }
            # print(ip)
            # Users.update(condition,user) #更新user表
            # IPs["quote"].append(ip)
            # result = IPs.find_one({})
            # IPs["quote"] = {"orig"}
            # print(res)
            obj = {"message":"ok","status":1}
        except BaseException as e:
            print(e)
            obj = {"message":"服务器出错","status":-2}
    else:
        obj = {"message":"请求方式出错","status":-5}
    return JsonResponse(obj,safe = False)


