from django.shortcuts import render
from django.http import HttpResponse

def main(request):
    return HttpResponse("Main")

def chat(request):
    message = request.GET.get('message')

    response = "django 챗봇 답변"  # 챗봇 답변 메시지

    return HttpResponse(response, safe=False)