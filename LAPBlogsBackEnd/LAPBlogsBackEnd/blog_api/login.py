from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Users = LAPBlogs['users']

def login(request):
    obj = {"message":'123'}
    user = {}
    print(request.POST)
    if request.POST:
        user['name'] = request.POST['name']
        user['email'] = request.POST['email']
        user['password'] = request.POST['password']
        status = Users.find_one({"count":user['email']})
        if(status):
            print(status)
            obj = {"message":'insert success!',"user":user}
        else:
            print(status)
            obj = {"message":"insert fail!"}
    # obj = {"msg" : "nochange"}
    return JsonResponse(obj)
