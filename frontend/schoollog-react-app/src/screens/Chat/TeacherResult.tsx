import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./TeacherResult.css"
import "./ChatResult.css"
import axios from "axios";
import { Cookies } from "react-cookie";
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import BorderLine from '../../component/BorderLine/BorderLine';
import {ReactComponent as Back} from "../../assets/back.svg"
import { ReactComponent as ResultHappy } from '../../assets/result-happy.svg'
import { ReactComponent as ResultNormal } from '../../assets/result-normal.svg'
import { ReactComponent as ResultGloom } from '../../assets/result-gloom.svg'
import { ReactComponent as ChartBg } from '../../assets/result-chartbg.svg'

function TeacherResult() {
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const navigate  = useNavigate();
  const { chatroom_id } = useParams();
  const handleGoBack = () => {
    navigate(-1)
  };
  const handleViewChat = () => {
    navigate(`/chat/history/${chatroom_id}/`);
  };
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    school: "",
    job: "",
    profile_photo: "",
  });
  const [resultData, setResultData] = useState({
    emotion_list: {},
    emotion_temp: 0,
    summary: "",
    wordcloud: "",
    category: "",
    result_time: "",
  });
  const [emotion, setEmotion] = useState("");
  const seriesData: number[] = Object.values(resultData.emotion_list);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/teacher/chat/result/${chatroom_id}`, {
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
    })
    .then(response => {
      const data = response.data;

      // userData에 사용자 데이터 매칭
      setUserData({
        username: data.user_data.username,
        email: data.user_data.email,
        school: data.user_data.school,
        job: data.user_data.job,
        profile_photo: data.user_data.profile_photo,
      });

      // resultData에 결과 데이터 매칭
      setResultData({
        emotion_list: data.result_data.emotion_list,
        emotion_temp: data.result_data.emotion_temp,
        summary: data.result_data.summary,
        wordcloud: data.result_data.keyword, 
        category: data.result_data.category,
        result_time: data.result_data.result_time
      });

      // emotion 변수 설정
      if (data.result_data.emotion_temp >= 0 && data.result_data.emotion_temp < 35) {
        setEmotion("행복");
      } else if (data.result_data.emotion_temp >= 35 && data.result_data.emotion_temp < 65) {
        setEmotion("평범");
      } else if (data.result_data.emotion_temp >= 65 && data.result_data.emotion_temp <= 100) {
        setEmotion("우울");
      } else {
        setEmotion("");
      }

    })
    .catch(error => {
      console.error("Error fetching wordcloud image:", error);
    });
  }, [chatroom_id, csrftoken]);

  const formattedDate = new Date(resultData.result_time).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/(\d{4})-(\d{2})-(\d{2})/, '$1년 $2월 $3일').replace(/\.$/, '');

  const series1 = [{
    name: '행복',
    data: [100-resultData.emotion_temp],
    color: '#35BA95',
  }, {
    name: '우울',
    data: [resultData.emotion_temp],
    color: '#1985C0',
  }]
  
  const options1: ApexOptions = { //행복, 우울 막대 그래프
    chart: {
      type: 'bar', 
      stacked:  true,
      height: 33, width: 239,
      stackType: '100%', 
      toolbar: { show: false}, 
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 40,
        dataLabels: {position: 'center'},
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false
    },
      xaxis: {
         categories: [''],
         labels: {show: false},
         axisBorder: {show: false,},
      },
      yaxis: {
        show: false,
        axisBorder: {show: false,},
        axisTicks: {show: false,},
      }, 
      legend: {show: false,}   
   };

  const options2: ApexOptions = { //감정 pie 차트
      chart: {
         type: 'pie',
         width: 200,
       },
       labels: Object.keys(resultData.emotion_list),
       colors: ['#1985C0', '#EBA1B8', '#9C27B0', '#E37354', '#FFC656', '#35BA95'],
       legend: {
         position: 'bottom',
         horizontalAlign: 'center',
         itemMargin: {horizontal: 18, vertical: 5},
      },
      stroke: {
         show: false
      },
      tooltip: {
         enabled: true,
         fillSeriesColor: true
      },
  };

  return (
    <div className='TR-fullbox'>
      <div className='TR-contentbox'>
        <div className="TR-dateBar">
          <Back onClick={handleGoBack} style={{cursor: "pointer"}}/>
          <div className="TR-date">
            {formattedDate}
          </div>
        </div>
        <BorderLine width={'423px'} height={'1px'}/>
        {userData.username && (
        <div className="TR-title">
          <img  className="TR-title-profile" src={"http://127.0.0.1:8000" + userData.profile_photo} />
          <div className="TR-title-nickname">
            {userData.username}
          </div>
          <div className={`TR-title-circle ${emotion === "행복" ? "happy" : emotion === "우울" ? "sad" : emotion === "평범" ? "normal" : ""}`}>
          </div>
          <div className="TR-title-keywords">
            {resultData.category}
          </div>
        </div>)}
        <div className='Result1-bg'>
          <div className='Result1-clipboard'>
            <div className='Result1-emotion'>
              <> 
                {emotion === "행복" ? (
                  <ResultHappy />
                ) : emotion === "우울" ? (
                  <ResultGloom />
                ) : emotion === "평범" ? (
                  <ResultNormal />
                ) : null}
              </>
            </div>
            <div className="Result1-chart">
              <ChartBg className="R1-ChartBg"/>          
              <ApexChart className="R1-BarChart"
                options={options1}
                series={series1}
                type="bar"
                height={100}
                width={320} />
                <span className="R1-Hp">{Math.round(100-resultData.emotion_temp)}%</span><span className="R1-Gp">{Math.round(resultData.emotion_temp)}%</span>
            </div>
          </div>
        </div>
        <div className='Result2-detail'>
          세부 감정 분석
          <div className='Result2-box'>
            <ApexChart
              options={options2}
              series={seriesData}
              type="pie"
              height={370} /> 
          </div>
        </div>
        <div className='Result3-keyword'>
          키워드
          <div className='Result3-box'>
            {resultData.wordcloud && (
              <img src={"http://127.0.0.1:8000" + resultData.wordcloud} alt="Wordcloud" className="Result3-worldcloud" />
            )}
          </div>
        </div>
        <div className='Result4-summary'>
          총정리
          <div className='Result4-box'>
            <div className="Result4-box2">
              {resultData.summary}
            </div>
          </div>
        </div>
        <div className='TeacherResult-viewChat' onClick={handleViewChat}>
          전체 채팅 보기 {'>'}
        </div>
      </div>
    </div>
  );
};

export default TeacherResult;
