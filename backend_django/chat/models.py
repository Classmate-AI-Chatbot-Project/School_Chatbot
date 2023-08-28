# chat/models.py
from django.db import models
from account.models import User

class ChatRoom(models.Model):
    chat_id = models.AutoField(primary_key=True, unique=True)
    student_id = models.ForeignKey(User, on_delete=models.CASCADE)
    chat_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'ChatRoom[{self.chat_id}] {self.student_id}'

class ChatMessage(models.Model):
    message_id = models.AutoField(primary_key=True)
    chat_id = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    sender = models.CharField(max_length=30, choices=(('student', '학생'), ('chatbot', '챗봇')))
    sender_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    message_text = models.TextField()
    message_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'ChatMessage[{self.message_id}] {self.sender}'

class AllDialogue(models.Model):
    dialogue_id = models.AutoField(primary_key=True)
    chat_id = models.OneToOneField(ChatRoom, on_delete=models.CASCADE)
    sender_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    dialogue_text = models.TextField()

    def __str__(self):
        return f'AllDialogue[{self.dialogue_id}] {self.chat_id}'

class ConsultResult(models.Model):    # 상담 결과
    member_id = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    result_time = models.DateTimeField(auto_now_add=True)
    keyword = models.ImageField(null=True)
    category = models.TextField(null=True)

    emotion_temp = models.FloatField()
    summary = models.TextField()
    emotion_list = models.JSONField()
    want_consult = models.BooleanField()
    chat_id = models.OneToOneField(ChatRoom, on_delete=models.CASCADE, primary_key=True)