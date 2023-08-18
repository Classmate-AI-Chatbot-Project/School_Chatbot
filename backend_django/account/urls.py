from django.urls import path

from . import views

urlpatterns = [
    path('kakao/callback/', views.kakao_login.as_view(), name='kakao-login'),
    path('google/callback/', views.google_login.as_view(), name='kakao-login'),
    path('google/callback/', views.google_login.as_view(), name='google-login'),
    path('naver/callback/', views.naver_login.as_view(), name='naver-login'),
    path('login/', views.Login.as_view()),
    path('logout/', views.LogOut.as_view()),
    path('signup/', views.SignUp.as_view()),
    path('decode/', views.decode.as_view()),
]