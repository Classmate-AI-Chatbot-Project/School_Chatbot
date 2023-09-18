import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import "./ChatResult.css"
import axios from "axios";
import { Cookies } from "react-cookie";
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { TailSpin } from  'react-loader-spinner'
import { ReactComponent as ResultHappy } from '../../assets/result-happy.svg'
import { ReactComponent as ResultNormal } from '../../assets/result-normal.svg'
import { ReactComponent as ResultGloom } from '../../assets/result-gloom.svg'
import { ReactComponent as ChartBg } from '../../assets/result-chartbg.svg'

function StudentResult() {  
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const { user_id, chatroom_id } = useParams();
  const location = useLocation();
  const responseData = location.state;
  const navigate  = useNavigate();
  const [depressionCount, setDepressionCount] = useState(Number);
  const [emotionCount, setEmotionCount] = useState([]);
  const [emotion, setEmotion] = useState("");
  const seriesData = Object.values(emotionCount);
  const [summaryText, setSummaryText] = useState(String);
  const [wordcloudImage, setWordcloudImage] = useState(String);
  const correctedImagePath = wordcloudImage.replace(/\\/g, '/');
  const [showTooltip, setShowTooltip] = useState(true);
  const [loading, setLoading] = useState(true);

  
  const handleViewChat = () => {
    navigate(`/chat/history/${chatroom_id}/`);
  };
  const closeTooltip = () => {
    setShowTooltip(false);
  };

  useEffect(() => { //결과 받아오기
    console.log(responseData.data);
    const data = responseData.data;

    

  setEmotionCount(data.emotion_count);
  setDepressionCount(data.depression_count);
  setSummaryText(data.summary);
  setWordcloudImage(data.wordcloud);
  if (data.depression_count >= 0 && data.depression_count < 35) {
    setEmotion("행복");
  } else if (data.depression_count >= 35 && data.depression_count < 65) {
    setEmotion("평범");
  } else if (data.depression_count >= 65 && data.depression_count <= 100) {
    setEmotion("우울");
  } else {
    setEmotion("");
  }
        
    
  }, [user_id, chatroom_id]);
        
        

  const series1 = [{
    name: '행복',
    data: [100-depressionCount],
    color: '#35BA95',
  }, {
    name: '우울',
    data: [depressionCount],
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
       labels: Object.keys(emotionCount),
       colors: ['#1985C0', '#EBA1B8', '#9C27B0', '#E37354', '#FFC656', '#35BA95', '#5DC8AE'],
       legend: {
         position: 'bottom',
         horizontalAlign: 'center',
         itemMargin: {horizontal: 15, vertical: 5},
      },
      stroke: {
         show: false
      },
      tooltip: {
         enabled: true,
         fillSeriesColor: true
      },
  };

   const postResult = () => { //전체 결과 전송
    axios.post(
      `http://127.0.0.1:8000/chat/result/${user_id}/${chatroom_id}/`,
      responseData, 
      {
          headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken, 
          },
          withCredentials: true,
      })
    .then((res: any) => {
        console.log(res)
      })
  }

  const postRequest = () => { //전체 결과 전송
    axios.post(
      `http://127.0.0.1:8000/consult/request_consult/`,
      {},
      {
          headers: {
              "Content-type": "application/json",
              "X-CSRFToken": csrftoken, 
          },
          withCredentials: true,
      })
    .then((res: any) => {
        console.log(res)
      })
  }

  const gotoConsult = () => { 
      axios.get('http://127.0.0.1:8000/consult/redirect_room/',
    {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true,
    }) 
    .then((response) => {
      const consult_room_url = response.data.consult_room_url;
      navigate(`${consult_room_url}`); 
    })
    .catch((error) => {
      navigate('/profile');
    });
  };

  return (
    <div className='Chat-FullBox'>
      <div className='Chat-ContenBox'>
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
                <span className="R1-Hp">{Math.round(100-depressionCount)}%</span><span className="R1-Gp">{Math.round(depressionCount)}%</span>
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
            {wordcloudImage && (
              <img src={"http://127.0.0.1:8000/" + correctedImagePath} alt="Wordcloud" className="Result3-wordcloud"/>
            )}
          </div>
        </div>
        <div className='Result4-summary'>
          총정리
          <div className='Result4-box'>
            <div className="Result4-box2">
              {summaryText}
            </div>
          </div>
        </div>
        <div className='Result5-viewChat' onClick={handleViewChat}>
        전체 채팅 보기 {'>'}
        </div>
        <div className="StudentResult-end">
        {showTooltip && (
          <div className="StudentResult-tooltip">
            <span className="StudentResult-tooltipContent">
              상담 결과를 전송해 선생님과 상담을 할 수 있어요.
            </span>
            <button className="StudentResult-closeBtn" onClick={closeTooltip}>✖</button>
          </div>
        )}
        <Link to="/profile">
        <button className="StudentResult-endBtn" onClick={() => { postResult(); postRequest(); gotoConsult(); }}>상담 신청하기</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default StudentResult;
