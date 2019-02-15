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
            # quote = {"type":"quote","access":[]}
            # schema = {"type":"schema","access":[]}
            # vue = {"type":"schema","access":[]}
            # nginx = {"type":"schema","access":[]}
            # nodejs = {"type":"schema","access":[]}
            # python = {"type":"schema","access":[]}
            # mongodb = {"type":"schema","access":[]}
            # IPs.insert(quote)
            # IPs.insert(schema)
            # IPs.insert(vue)
            # IPs.insert(nginx)
            # IPs.insert(nodejs)
            # IPs.insert(python)
            # IPs.insert(mongodb)
            result = IPs.find_one({"type":"quote"})
            res = result["access"]
            res.append(ip)
            print(res)
            result = IPs.find_one({"type":"quote"})
            print(result)
            obj = {"message":"ok","status":1}
        except BaseException as e:
            print(e)
            obj = {"message":"服务器出错","status":-2}
    else:
        obj = {"message":"请求方式出错","status":-5}
    return JsonResponse(obj,safe = False)


