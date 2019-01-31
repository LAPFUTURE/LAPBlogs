from django.http import JsonResponse
from bson import json_util
import json

def jsonStr(parameter):
    return json.dumps(parameter, ensure_ascii = False,default = json_util.default)
