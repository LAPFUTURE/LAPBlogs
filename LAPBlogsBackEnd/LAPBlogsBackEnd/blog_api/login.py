from django.http import HttpResponse
from django.http import JsonResponse

def getJwt(request):
    # response = HttpResponse(...)
    # response["Access-Control-Allow-Origin"] = "*"
    # response["Access-Control-Allow-Credentials"] = "true"
    # response["Access-Control-Allow-Methods"] = "GET,POST"
    # response["Access-Control-Allow-Headers"] = "Origin,Content-Type,Cookie,Accept,Token"
    obj = {"message":'Ask successfully!'}
    return JsonResponse(obj)
    # return response
    # response = HttpResponse(...)
    # response["Access-Control-Allow-Origin"] = "*" 
    # response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS" 
    # response["Access-Control-Max-Age"] = "1000" 
    # response["Access-Control-Allow-Headers"] = "*" 
    # return response