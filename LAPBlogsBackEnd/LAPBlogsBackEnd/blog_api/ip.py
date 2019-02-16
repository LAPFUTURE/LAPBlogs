from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
from bson.objectid import ObjectId
import datetime
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]
#访问记录
IPs = LAPBlogs['ips']
#表结构
# quote = {"type":"quote","access":[],"accessTime":0}
# schema = {"type":"schema","access":[],"accessTime":0}
# vue = {"type":"vue","access":[],"accessTime":0}
# nginx = {"type":"nginx","access":[],"accessTime":0}
# nodejs = {"type":"nodejs","access":[],"accessTime":0}
# python = {"type":"python","access":[],"accessTime":0}
# mongodb = {"type":"mongodb","access":[],"accessTime":0}
# IPs.insert(quote)
# IPs.insert(schema)
# IPs.insert(vue)
# IPs.insert(nginx)
# IPs.insert(nodejs)
# IPs.insert(python)
# IPs.insert(mongodb)

#保存暂存区
def ipAccess(request):
    if request.POST:
        try:
            currentTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            ip = {
                "origin":request.POST["origin"],
                "referer":request.POST["referer"],
                "userAgent":request.POST["user-agent"],
                "refererTime":currentTime
            }
            type = request.POST["type"]
            if(type == "quote"):
                result = IPs.find_one({"type":"quote"})
            elif(type == "schema"):
                result = IPs.find_one({"type":"schema"})
            elif(type == "vue"):
                result = IPs.find_one({"type":"vue"})
            elif(type == "nginx"):
                result = IPs.find_one({"type":"nginx"})
            elif(type == "nodejs"):
                result = IPs.find_one({"type":"nodejs"})
            elif(type == "python"):
                result = IPs.find_one({"type":"python"})
            elif(type == "mongodb"):
                result = IPs.find_one({"type":"mongodb"})

            #更新访问细节
            access = result["access"]
            access.append(ip)
            result["access"] = access
            #更新访问次数
            accessTime = result["accessTime"] + 1
            result["accessTime"] = accessTime
            IPs.update_one({"type":type},{"$set":result})
            obj = {"message":"ok","status":1,"accessTime":accessTime}
        except BaseException as e:
            print(e)
            obj = {"message":"服务器出错","status":-2}
    else:
        obj = {"message":"请求方式出错","status":-5}
    return JsonResponse(obj,safe = False)


