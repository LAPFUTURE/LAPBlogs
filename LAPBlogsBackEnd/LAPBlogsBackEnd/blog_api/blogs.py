from django.http import JsonResponse,HttpResponse
from .tools import jsonStr
from bson.objectid import ObjectId
import datetime
import pymongo

mongo_client = pymongo.MongoClient(host="127.0.0.1",port=27017)
LAPBlogs = mongo_client["lap_blogs"]

Blogs = LAPBlogs['blogs']
Users = LAPBlogs["users"]

def temporarySave(request):
    if request.POST:
        try:
            currentTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            user = Users.find_one(ObjectId(request.POST["belongTo"]))
            condition = {"_id":ObjectId(request.POST["belongTo"])}
            user = Users.find_one(ObjectId(request.POST["belongTo"]))
            user["temporarySave"] = {
                "title":request.POST["title"],
                "content":request.POST["content"],
                "saveTime":currentTime
            }
            result = Users.update_one(condition, {'$set': user})
            obj = {"message":"ok","status":1}
        except BaseException as e:
            print(e)
            obj = {"message":"服务器出错","status":-2}
    else:
        obj = {"message":"请求方式出错","status":-5}
    return JsonResponse(obj,safe = False)

def userBlogs(request):
    if request.POST:
        try:
            userBlogsId = request.POST
            blogArray =[]
            for blogId in userBlogsId:
                blog = Blogs.find_one(ObjectId(userBlogsId[blogId]))
                blogArray.append({
                    "blogId":blogId,
                    "detail":blog
                })
            obj = {"message":"success","status":1,"blogArray":jsonStr(blogArray)}
        except BaseException as e:
            obj = {"message":"服务器出错","status":-2}
    else:
        obj = {"message":"请求方式出错","status":-5}
    return JsonResponse(obj,safe = False)

def requestBlogs(request):
    blogArray = ["Python","JavaScript","NodeJs","Php","Java"]
    BLOGS = {}
    for i in blogArray:
        blogs = Blogs.find({"type":i})
        tempArray = []
        for blog in blogs:
            tempArray.append(blog)
        BLOGS[i] = tempArray
    #BLOGS存储查找到的文章，按照语言类型分类
    BLOGS = jsonStr(BLOGS)
    obj = {
        "message":"success",
        "status":1,
        "blog":BLOGS
    }
    return JsonResponse(obj,safe = False)

def insertBlog(request):
    #用户的_id,用户的name,文章content,文章title,文章type,插入文章
    if request.POST:
        currentTime = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        blog = {
            "belongTo":ObjectId(request.POST["belongTo"]),
            "userName":request.POST["userName"],
            "content":request.POST["content"],
            "title":request.POST["title"],
            "insertTime":currentTime,
            "type":request.POST["type"]
        }
        result = Blogs.insert(blog) #插入blog表返回ObjectId
        user = Users.find_one(ObjectId(request.POST["belongTo"]))
        user["blog"].append(result) #将blog的_id压进user["blog"]
        condition = {"_id":ObjectId(request.POST["belongTo"])}
        Users.update(condition,user) #更新user表
        obj = {
            "message":"插入成功",
            "status":1
        }
    else:
        obj = {"message":"请求方式不是post!","status":-5}
    return JsonResponse(obj,safe = False)
        

