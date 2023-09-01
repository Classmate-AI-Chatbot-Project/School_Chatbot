import React, { useEffect, useState } from 'react';
import "./Result.css";
import { ReactComponent as ResultHappy } from '../../assets/result-happy.svg'
import { ReactComponent as ResultNormal } from '../../assets/result-normal.svg'
import { ReactComponent as ResultGloom } from '../../assets/result-gloom.svg'
import { ReactComponent as ChartBg } from '../../assets/result-chartbg.svg'
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { Cookies } from "react-cookie";
import { useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import {TailSpin } from  'react-loader-spinner'

function Result() {  
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const { user_id, chatroom_id } = useParams();
  const navigate  = useNavigate();
  const [wordcloudImage, setWordcloudImage] = useState(String);
  const [summaryText, setSummaryText] = useState(String);
  const [emotionCount, setEmotionCount] = useState([]);
  const [depressionCount, setDepressionCount] = useState(Number);
  const [emotion, setEmotion] = useState("");
  const correctedImagePath = wordcloudImage.replace(/\\/g, '/');
  const seriesData = Object.values(emotionCount);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/chat/result/${user_id}/${chatroom_id}/`,
    {
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
    })
      .then(response => {
        const responseData = response.data;
        // responseData에서 필요한 데이터 추출
        const { summary, wordcloud, emotion_count, depression_count } = responseData;
        
        setEmotionCount(emotion_count);
        setDepressionCount(depression_count);
        setSummaryText(summary);
        setWordcloudImage(wordcloud);
        console.log(responseData)

        if (depression_count >= 0 && depression_count < 35) {
          setEmotion("행복");
        } else if (depression_count >= 35 && depression_count < 65) {
          setEmotion("평범");
        } else if (depression_count >= 65 && depression_count <= 100) {
          setEmotion("우울");
        } else {
          setEmotion("");
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching wordcloud image:", error);
      });
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

  const options1: ApexOptions = {
    chart: {
      type: 'bar',
      stacked:  true,
      height: 33,
      width: 239,
      stackType: '100%',
      toolbar: {
        show: false
      }, 
      
    },
    plotOptions: {
        bar: {
          horizontal: true,
          barHeight: 40,
          dataLabels: {
            position: 'center'
          }
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
         labels: {
           show: false
         },
         axisBorder: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      }, 
      legend: {
        show: false,
      }   
   };

  const options2: ApexOptions = {
      chart: {
         type: 'pie',
         width: 200,
       },
       labels: Object.keys(emotionCount),
       colors: ['#1985C0', '#EBA1B8', '#9C27B0', '#E37354', '#FFC656', '#35BA95'],
       legend: {
         position: 'bottom',
         horizontalAlign: 'center',
         itemMargin: {
           horizontal: 18,
           vertical: 5
         },
      },
      stroke: {
         show: false
      },
      tooltip: {
         enabled: true,
         fillSeriesColor: true
      },

  };

  const handleViewChat = () => {
    navigate(`/chat/history/${user_id}/${chatroom_id}/`);
  };

  return (
    <div className='Chat-FullBox'>
      <div className='Chat-ContenBox'>
        <div className='Result1-bg'>
          <div className='Result1-clipboard'>
            <div className='Result1-emotion'>
            {loading ? ( 
              <div className="Result1-loading-animation">
                <TailSpin
                  height="90"
                  width="90"
                  color="#969696"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </div>
            ) : ( 
            <>
              {emotion === "행복" ? (
                <ResultHappy />
              ) : emotion === "우울" ? (
                <ResultGloom />
              ) : emotion === "평범" ? (
                <ResultNormal />
              ) : null}
            </>
            )}
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
          <div className='Result3-box'>
            {wordcloudImage && (
              <img src={"http://127.0.0.1:8000/" + correctedImagePath} alt="Wordcloud" />
            )}
          </div>
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
      </div>
    </div>
  );
};

export default Result;