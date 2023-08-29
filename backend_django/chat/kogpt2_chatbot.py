# chat/kogpt2_chatbot.py

from transformers import GPT2LMHeadModel, PreTrainedTokenizerFast
import torch, os

# 학습된 모델 로드
current_directory = os.path.dirname(__file__)
model_path = os.path.join(current_directory, 'kogpt2_model', '2nd last update model')
model = GPT2LMHeadModel.from_pretrained(model_path)

# 챗봇 대화를 위한 특수 토큰들 설정
U_TKN = '<usr>'
S_TKN = '<sys>'
EOS = '</s>'
MASK = '<unused0>'
PAD = '<pad>'
SENT = '<unused1>'

# 토크나이저 초기화
tokenizer = PreTrainedTokenizerFast.from_pretrained("skt/kogpt2-base-v2",
            eos_token=EOS, unk_token='<unk>',
            pad_token=PAD, mask_token=MASK)

# KoGPT2 챗봇 응답 생성
def kogpt2_answer(user_input, user):
    with torch.no_grad():
        qs = []                     # 사용자 대화 기록 : 이전 대화와 사용자 응답을 함께 모델에 입력
        # 사용자 이름 설정
        if user is None:
            user_name = '사용자' 
        else:
            user_name = user.username 
        qs.append(user_input)       # history 저장

        a = ''
        user = U_TKN + user_input + SENT + a
        encoded = tokenizer.encode(user)
        input_ids = torch.LongTensor(encoded).unsqueeze(dim=0)
        output = model.generate(input_ids, max_length=50,
                                num_beams=10, do_sample=False,
                                top_k=50, no_repeat_ngram_size=2,
                                temperature=0.85)
        a = tokenizer.decode(output[0], skip_special_tokens=True)
        idx = torch.where(output[0] == tokenizer.encode('<sys>')[0])
        chatbot_response = tokenizer.decode(output[0][idx[0].item() + 1:], skip_special_tokens=True)
        chatbot_response = chatbot_response.replace('00', user_name)    # 응답에서 '00'을 사용자 이름으로 대체

        if '답변' in a:     # 응, 아니 등이 input으로 들어왔을 때 ('긍정답변', '부정답변')
            a_new = ''
            user = U_TKN + ''.join(qs[-2:]) + SENT + a_new
            encoded = tokenizer.encode(user)
            input_ids = torch.LongTensor(encoded).unsqueeze(dim=0)
            output = model.generate(input_ids, max_length=50,
                                    num_beams=10, do_sample=False,
                                    top_k=50, no_repeat_ngram_size=2,
                                    temperature=0.85)
            a_new = tokenizer.decode(output[0], skip_special_tokens=True)
            idx = torch.where(output[0] == tokenizer.encode('<sys>')[0])
            chatbot_response = tokenizer.decode(output[0][idx[0].item() + 1:], skip_special_tokens=True)
            chatbot_response = chatbot_response.replace('00', user_name)

            return chatbot_response.strip()

        return chatbot_response.strip()