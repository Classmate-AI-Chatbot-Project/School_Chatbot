# chat/views.py
from rest_framework import status
from django.db.models import Avg
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import json, os
from .kogpt2_chatbot import kogpt2_answer
from .kobert import kobert_result
from .kobart import generate_summary
from .wordcloud import get_wordcloud_data
from django.contrib.auth.decorators import login_required   # 함수형 뷰에만 적용 가능
from .models import ChatRoom, ChatMessage, AllDialogue, ConsultResult   # 모델 임포트
from django.shortcuts import render
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from account.models import User

'''
# 메인 페이지 [상담하러 가기] 버튼, 그림 심리 테스트 [챗봇과 상담하기] 버튼, 
# 선생님 상담 페이지 [챗봇과 상담하기] 버튼, 메뉴바 [챗봇과 상담하기] 버튼

# 로그인 안 한 상태 => '로그인이 필요합니다' 모달창 띄우기
# 로그인 한 상태 => 새로운 채팅방 생성하기 & 로그인한 user.id와 생성한 채팅방 id를 url에 전달하기
'''
@login_required           
def chat_service(request, user_id, chatroom_id):  # URL에 포함된 값을 전달받음 (ex: /chat/1/1/)
    # 현재 로그인한 사용자
    user = request.user                     # user = User.objects.get(user_id=1)
    # 가장 최근에 생성한 대화방 가져오기
    chat_room = ChatRoom.objects.filter(student_id=request.user.id).latest('chat_id')
    # chat_room = ChatRoom.objects.filter(student_id=request.user.id).order_by('-chat_date').first()

    context = { 'user': user.id, 'chat_room': chat_room.chat_id }

    if request.method == 'POST':
        data = json.loads(request.body)
        user_input = data.get('message', '')  # 'message' 키로 데이터를 가져옴

        # 사용자가 '종료하기'를 입력하지 않았을 때만 메시지 저장
        if user_input != '종료하기':
            # 현재 시간 가져오기
            current_time = timezone.now()
            # 사용자 메시지 저장
            ChatMessage.objects.create(     
                chat_id=chat_room,  
                sender='student',
                message_text=user_input,
                sender_user=user,
                message_time=current_time
            )
            # 챗봇 응답 생성 및 저장
            response = kogpt2_answer(user_input, user)    # 사용자 정보 & 발화 입력

            ChatMessage.objects.create(      
                chat_id=chat_room,  
                sender='chatbot',
                message_text=response,
                sender_user=user,
                message_time=current_time
            )

            # POST 요청 => response에 output 챗봇 응답 메시지를 담아서 json 형태로 리턴
            output = {'response': response}  # JSON 응답 생성
            return JsonResponse(output, status=200)
        
    else:
        return render(request, 'chat/index.html', context)

# chat/end/<str:user_id>/<int:chatroom_id>/  
def chat_end(request, user_id, chatroom_id):
    user = request.user
    chat_room = ChatRoom.objects.get(chat_id=chatroom_id)

    all_messages = ChatMessage.objects.filter(chat_id=chat_room).order_by('message_time')
    combined_text = ''

    for message in all_messages:
        combined_text = combined_text + message.sender + ":" + message.message_text + "\n"

    AllDialogue.objects.create(     
        chat_id=chat_room,  
        sender_user=user,
        dialogue_text=combined_text
    )

    response_data = {'message': '대화 종료'}
    return JsonResponse(response_data, status=200)

# chat/history/<str:user_id>/<int:chatroom_id>/     
@api_view(['GET'])
def chat_history(request, user_id, chatroom_id):
    try:
        # Fetch chat history and format it as a list of dictionaries
        chat_messages = ChatMessage.objects.filter(chat_id=chatroom_id)
        history = [{'sender': message.sender,
                    'date': message.message_time.strftime('%Y년 %m월 %d일'),
                    'time': message.message_time.strftime('%H:%M'),
                    'message': message.message_text}
                    for message in chat_messages]
        
        return Response(history)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

# chat/result/<str:user_id>/<int:chatroom_id>/
@login_required               
def chat_result(request, user_id, chatroom_id):
        user = request.user        
        alldialogue = AllDialogue.objects.filter(chat_id=chatroom_id)
        chat_room = ChatRoom.objects.get(chat_id=chatroom_id)
        student_dialogs = []
        combined_text = ''

        if request.method == 'GET':
            lines = alldialogue[0].dialogue_text.strip().split('\n')
            for line in lines:
                role, content = line.split(':', 1)
                role = role.strip()
                combined_text = combined_text + '\n' + content
                content = content.strip()
                if role == 'student':
                     student_dialogs.append(content)
            
            # KoBERT 이용하여 감정, 우울도 json 가져오기
            category_count, emotion_count, depression_count = kobert_result(student_dialogs)
            wordcloud = get_wordcloud_data(student_dialogs)

            # KeyWord로 WordCloud 이미지 저장하기
            media_path = os.path.join('media', 'wordcloud')
            os.makedirs(media_path, exist_ok=True)
            image_path = os.path.join(media_path, f'{chatroom_id}.png')
            wordcloud.to_file(image_path)
            category_text = ', '.join([item[0] for item in category_count])

            # 요약문 생성하기
            summary = generate_summary(combined_text)

            # JSON으로 만들어서 클라이언트에게 전송
            context_data = {
                'emotion_count': emotion_count,
                'depression_count': depression_count,
                'wordcloud':image_path,
                'summary':summary,
                'category' : category_text
            }

            return JsonResponse(context_data)
        
        if request.method == 'POST':
            # Payload 받아오기
            payload = json.loads(request.body.decode('utf-8'))
            data = payload.get('data')
            depression_count = data.get('depression_count')
            emotion_count = data.get('emotion_count')
            summary = data.get('summary')
            wordcloud = data.get('wordcloud')
            img_url = wordcloud.split('\\')[-2] + '/' + wordcloud.split('\\')[-1]
            categories = data.get('category')

            #category_text = ', '.join([item[0] for item in categories])

            # 결과문 생성하기
            ConsultResult.objects.create(     
                member_id=user,
                keyword = img_url,
                emotion_temp = depression_count,
                summary = summary,
                emotion_list = emotion_count,
                want_consult = True,
                chat_id = chat_room,
                category = categories
            )

            consultResult = ConsultResult.objects.filter(member_id=user)
            average_emotion_temp = consultResult.aggregate(Avg('emotion_temp'))['emotion_temp__avg']

            user_instance = User.objects.get(id=user.id)
            user_instance.avg_emotion = average_emotion_temp
            user_instance.save()

            return HttpResponse(status=status.HTTP_200_OK)