from collections import defaultdict
from kobert_transformers import get_tokenizer
import torch, os
import torch.nn as nn
from kobert_transformers import get_kobert_model
from torch.nn import CrossEntropyLoss, MSELoss
from transformers import BertPreTrainedModel, BertConfig
from collections import Counter


kobert_config = {
    'attention_probs_dropout_prob': 0.1,
    'hidden_act': 'gelu',
    'hidden_dropout_prob': 0.1,
    'hidden_size': 768,
    'initializer_range': 0.02,
    'intermediate_size': 3072,
    'max_position_embeddings': 512,
    'num_attention_heads': 12,
    'num_hidden_layers': 12,
    'type_vocab_size': 2,
    'vocab_size': 8002
}

def get_kobert_config():
    return BertConfig.from_dict(kobert_config)

class KoBERTforSequenceClassfication(BertPreTrainedModel):
    def __init__(self,
                 num_labels=359,
                 hidden_size=768,
                 hidden_dropout_prob=0.1,
                 ):
        super().__init__(get_kobert_config())

        self.num_labels = num_labels
        self.kobert = get_kobert_model()
        self.dropout = nn.Dropout(hidden_dropout_prob)
        self.classifier = nn.Linear(hidden_size, num_labels)

        self.init_weights()

    def forward(
            self,
            input_ids=None,
            attention_mask=None,
            token_type_ids=None,
            position_ids=None,
            head_mask=None,
            inputs_embeds=None,
            labels=None,
    ):
        outputs = self.kobert(
            input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            position_ids=position_ids,
            head_mask=head_mask,
            inputs_embeds=inputs_embeds,
        )

        pooled_output = outputs[1]

        pooled_output = self.dropout(pooled_output)
        logits = self.classifier(pooled_output)

        outputs = (logits,) + outputs[2:]  # add hidden states and attention if they are here

        if labels is not None:
            if self.num_labels == 1:
                #  We are doing regression
                loss_fct = MSELoss()
                loss = loss_fct(logits.view(-1), labels.view(-1))
            else:
                loss_fct = CrossEntropyLoss()
                loss = loss_fct(logits.view(-1, self.num_labels), labels.view(-1))
            outputs = (loss,) + outputs

        return outputs  # (loss), logits, (hidden_states), (attentions)
    

def load_wellness_answer():
    current_directory = os.path.dirname(__file__)
    category_path = os.path.join(current_directory, 'data', 'category.txt')
    emotion_path = os.path.join(current_directory, 'data', 'emotion.txt')
    depression_path = os.path.join(current_directory, 'data', 'depression.txt')

    c_f = open(category_path, 'r', encoding='UTF8')
    e_f = open(emotion_path, 'r', encoding='UTF8')
    d_f = open(depression_path, 'r', encoding='UTF8')

    category_lines = c_f.readlines()
    emoiton_lines = e_f.readlines()
    depression_lines = d_f.readlines()

    category = {}
    emotion = {}
    depression = {}

    for line_num, line_data in enumerate(category_lines):
        data = [item.strip() for item in line_data.split('    ')]
        category[data[1]] = data[0]

    for line_num, line_data in enumerate(emoiton_lines):
        data = [item.strip() for item in line_data.split('    ')]
        emotion[data[0]] = data[1]

    for line_num, line_data in enumerate(depression_lines):
        data = [item.strip() for item in line_data.split('	')]
        depression[data[0]] = data[1]

    return category, emotion, depression


def kobert_input(tokenizer, str, device=None, max_seq_len=512):
    index_of_words = tokenizer.encode(str)
    token_type_ids = [0] * len(index_of_words)
    attention_mask = [1] * len(index_of_words)

    # Padding Length
    padding_length = max_seq_len - len(index_of_words)

    # Zero Padding
    index_of_words += [0] * padding_length
    token_type_ids += [0] * padding_length
    attention_mask += [0] * padding_length

    data = {
        'input_ids': torch.tensor([index_of_words]).to(device),
        'token_type_ids': torch.tensor([token_type_ids]).to(device),
        'attention_mask': torch.tensor([attention_mask]).to(device),
    }
    return data

def kobert_result(student_dialogs):
    current_directory = os.path.dirname(__file__)
    save_ckpt_path = os.path.join(current_directory, 'result_model', 'kobert', 'kobert.pth')
    # save_ckpt_path = "./result_model/kobert/kobert.pth"

    # 답변과 카테고리 불러오기
    category, emotion, depression = load_wellness_answer()

    ctx = "cuda" if torch.cuda.is_available() else "cpu"
    device = torch.device(ctx)

    # 저장한 Checkpoint 불러오기
    checkpoint = torch.load(save_ckpt_path, map_location=device)

    model = KoBERTforSequenceClassfication()
    model.load_state_dict(checkpoint['model_state_dict'], strict=False)

    model.to(ctx)
    model.eval()

    tokenizer = get_tokenizer()

    category_count = defaultdict(int)
    emotion_count = defaultdict(int)
    depression_count = defaultdict(int)
    total_count = 0

    emotion_count['슬픔'] = 0
    emotion_count['불안'] = 0
    emotion_count['피곤'] = 0
    emotion_count['분노'] = 0
    emotion_count['후회'] = 0
    emotion_count['중립'] = 0

    for dialogue in student_dialogs:
        data = kobert_input(tokenizer, dialogue, device, 512)
        output = model(**data)

        logit = output[0]
        softmax_logit = torch.softmax(logit, dim=-1)
        softmax_logit = softmax_logit.squeeze()

        max_index = torch.argmax(softmax_logit).item()

        category_list = category[str(max_index)].split('/')[-1]  # 마지막 카테고리 선택
        emotion_list = emotion[str(max_index)]
        depression_list = depression[str(max_index)]

        category_count[category_list] += 1
        emotion_count[emotion_list] += 1
        depression_count[depression_list] += 1
        total_count += 1

    # for category in category_count:
    #     category_percentage = (category_count[category] / total_count) * 100

    # for emotion in emotion_count:
    #     emotion_percentage = (emotion_count[emotion] / total_count) * 100

    category_count = Counter(category_count).most_common(3)
    depression_percentage = (depression_count['우울'] / total_count) * 100


    return category_count, emotion_count, depression_percentage
