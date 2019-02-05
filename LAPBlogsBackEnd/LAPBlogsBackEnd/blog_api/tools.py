from django.http import JsonResponse
from bson import json_util
import json

#工具

#json转字符串
def jsonStr(parameter):
    return json.dumps(parameter, ensure_ascii = False,default = json_util.default)
