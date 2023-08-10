from django.views import View
from django.http import HttpResponse 
from rest_framework import status
from django.core.files.base import ContentFile
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import User
from account.models import User
import requests, jwt
from backend_django.settings  import SECRET_KEY
from django.contrib.auth import authenticate, login, logout

# Create your views here.

#kakao 로그인 하면 email, nickname, photo정보로 임시가입
class kakao_login(APIView):    
    def post(self, request):
        try:
            code = request.data.get("code") # 프론트에서 보내준 code로 token을 구해와야한다 !! 

            data = {
                "grant_type"    :"authorization_code",
                "client_id"     :"2d9ed17578b0549eedac781a79515516",
                "redirect_uri": "http://127.0.0.1:3000/account/kakao/callback",
                "code": code
            }

            kakao_token_api = "https://kauth.kakao.com/oauth/token"
            token_headers = {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
            access_token = requests.post(kakao_token_api, data=data, headers=token_headers).json()["access_token"]

            # 성공 ! 이 token으로 kakao api와 대화 가능
            # 밑에는 기본적인 user data
            user_data = requests.get(
                "https://kapi.kakao.com/v2/user/me",
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            )

            # email, nickname, photo 가져옴
            user_data = user_data.json()
            email = user_data['kakao_account']['email']
            nickname = user_data['properties']['nickname']
            photo = user_data['properties']['profile_image']
            token = jwt.encode({"email": email}, SECRET_KEY) #카톡 token을 자체 jwt token으로 변경해줌

            user = authenticate(request, email=email, password=token)
            if user is None:
                new_user = User.objects.create_user(email=email, username=nickname, password=token)
                user = authenticate(request, email=email, password=token)
                print(user)
                if photo:
                    response = requests.get(photo)
                    if response.status_code == 200:
                        file_name = photo.split('/')[-1]
                        new_user.profile_photo.save(file_name, ContentFile(response.content), save=True)
                new_user.save()
                print("회원없어서 생성/ 학교, 직업 생성해야함.")

            return Response(token)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

# 회원가입
class SignUp(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        nickname = request.data.get('nickname', None)
        school = request.data.get('school', None)
        job = request.data.get('job', None)

        user = request.user

        user.username = nickname
        user.school = school
        user.job = job
        user.save()
        return HttpResponse(status=200)

    
# 로그인
class Login(APIView):
    def post(self, request):
        try:
            user_token = request.data.get('token')
            print(user_token)
            decode_jwt = jwt.decode(user_token, SECRET_KEY, algorithms=['HS256'])
            print(decode_jwt)
            account = User.objects.get(email=decode_jwt.get('email'))
            print(account)

            user = authenticate(request, email=account, password=user_token)
            print(user)

            if user is not None:
                login(request, user)
                print("로그인 완료", user)
                if (user.job==None or user.school==None):
                    print("회원 이미 존재/ 학교, 직업 생성해야함.")
                    return Response(status=status.HTTP_201_CREATED)
                else:
                    return Response(status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        

# 로그아웃
class LogOut(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)

        return Response(status=status.HTTP_200_OK)

# 프론트로 UserSerializer 보낼 때 사용 (유저 정보 보낼 때)
class decode(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)  # User 객체를 직렬화

        print(serializer)
        return Response(serializer.data)
