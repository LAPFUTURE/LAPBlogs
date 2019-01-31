from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

def registe(request):
    users  = list(LAPBlogs.users.find())
    return JsonResponse(jsonStr(users), safe = False)