from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch, os

def load_model():
    # 모델 디렉토리 경로
    current_directory = os.path.dirname(__file__)
    model_directory = os.path.join(current_directory, 'result_model', 'kobart')

    # BartForConditionalGeneration 모델 초기화
    model = AutoModelForSeq2SeqLM.from_pretrained(model_directory)
    tokenizer = AutoTokenizer.from_pretrained(model_directory)

    # 학습한 모델을 로드
    state_dict = torch.load(model_directory + "/pytorch_model.bin", map_location=torch.device('cpu'))
    state_dict = {k: v for k, v in state_dict.items() if k in model.state_dict()}   # 상태 사전에서 불필요한 키 제거
    model.load_state_dict(state_dict)   # 모델에 가중치 로드
    model.eval()

    return model, tokenizer

model, tokenizer = load_model()

# parameter 없는 요약문 생성
def summary_no_para(text):
    inputs = tokenizer(text, truncation=True, padding="longest", return_tensors="pt")
    input_ids = inputs["input_ids"]
    attention_mask = inputs["attention_mask"]

    summary_ids = model.generate(input_ids, num_beams=5, attention_mask=attention_mask)
    summary_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary_text


# parameter 있는 요약문 생성
def summary_para(text):
    inputs = tokenizer(
        text,
        padding="max_length",
        truncation=True,
        max_length= 64,
        return_tensors="pt",
    )
    input_ids = inputs.input_ids.to(model.device)

    attention_mask = inputs.attention_mask.to(model.device)
    outputs = model.generate(input_ids, num_beams=5, no_repeat_ngram_size=2,
                            attention_mask=attention_mask,
                            pad_token_id=tokenizer.pad_token_id,
                            bos_token_id=tokenizer.bos_token_id,
                            eos_token_id=tokenizer.eos_token_id,)
    output_str = tokenizer.batch_decode(outputs, skip_special_tokens=True)
    return output_str[0]

# 요약문 생성
def generate_summary(text):
    sentences = text.split("\n")  # 입력 텍스트를 문장으로 분리
    batch_size = 5  # 5문장씩 처리할 배치 크기
    batched_sentences = [sentences[i:i + batch_size] for i in range(0, len(sentences), batch_size)]

    summary_texts = ''

    for batch in batched_sentences:
        batch_input = ". ".join(batch)  # 배치 내의 문장들을 다시 합쳐서 입력으로 사용
        summary1 = summary_para(batch_input)
        summary2 = summary_no_para(batch_input)
        if len(summary1) > len(summary2):
            output = summary1
        else:
            output = summary2

        # 긴 문장을 선택하여 요약문에 붙임
        summary_texts = summary_texts + output + '\n'

    return summary_texts