from django.http import HttpResponse
from django.http import JsonResponse

def getJwt(request):
    obj = {"message":'Ask successfully!'}
    return JsonResponse(obj)