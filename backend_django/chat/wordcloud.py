from konlpy.tag import Komoran
from wordcloud import WordCloud
from sklearn.feature_extraction.text import TfidfVectorizer
import os
from konlpy import utils
import numpy as np

def color_func(word, font_size, position,orientation,random_state=None, **kwargs):
    return("hsl({:d},{:d}%, {:d}%)".format(np.random.randint(120,200),np.random.randint(60,100),np.random.randint(50,80)))


def get_wordcloud_data(student_dialogs):
    current_directory = os.path.dirname(__file__)
    font_path = os.path.join(current_directory, 'data', 'NanumBarunGothic.ttf')
    combined_string = ' '.join(student_dialogs)

    ''' 자바 관련 오류가 발생하면 주석을 풀고 print 문을 참고하세요. 경로에 한글이 포함되어있으면 오류가 발생합니다.
    javadir = '%s%sjava' % (utils.installpath, os.sep)
    args = [javadir, os.sep]
    folder_suffix = ['{0}{1}open-korean-text-2.1.0.jar']
    classpath = [f.format(*args) for f in folder_suffix]

    print('javadir  : {}'.format(javadir))
    print('os.sep   : {}'.format(os.sep))
    print('classpath: {}'.format(classpath[0]))
    '''
    
    komoran = Komoran()
    nouns = komoran.nouns(combined_string)
    
    nouns_text = ' '.join(nouns)

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([nouns_text])

    word_dict = {v: k for k, v in vectorizer.vocabulary_.items()}
    
    top_keywords = []
    top_indices = tfidf.toarray().argsort()[0][::-1][:6]
    for index in top_indices:
        top_keywords.append(word_dict[index])

    keywords_text = ' '.join(top_keywords)

    wordcloud = WordCloud(font_path=font_path,  background_color='white', color_func = color_func, width=800, height=800).generate(keywords_text)
    return wordcloud
