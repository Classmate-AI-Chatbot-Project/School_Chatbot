import "./Result.css";
import { ReactComponent as ResultHappy } from '../../assets/result-happy.svg'
import { ReactComponent as ResultNormal } from '../../assets/result-normal.svg'
import { ReactComponent as ResultGloom } from '../../assets/result-gloom.svg'
import { ReactComponent as ChartBg } from '../../assets/result-chartbg.svg'
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

function Result() {  
  let emotion = "우울";
  const series1 = [{
    name: '행복',
    data: [15],
    color: '#35BA95',
  }, {
    name: '우울',
    data: [85],
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

  const series2 = [25,25,13,13,13,25]

  const options2: ApexOptions = {
      chart: {
         type: 'pie',
         width: 200,
       },
       labels: ['슬픔', '불안', '피곤', '분노', '후회', '긍정/중립'],
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

  return (
    <div className='Chat-FullBox'>
      <div className='Chat-ContenBox'>
        <div className='Result1-bg'>
          <div className='Result1-clipboard'>
            <div className='Result1-emotion'>
              {emotion === "행복" ? (
                <ResultHappy />
              ) : emotion === "우울" ? (
                <ResultGloom />
              ) : emotion === "평범" ? (
                <ResultNormal />
              ) : null}
            </div>
            <div className="Result1-chart">
              <ChartBg className="R1-ChartBg"/>          
              <ApexChart className="R1-BarChart"
                options={options1}
                series={series1}
                type="bar"
                height={100}
                width={320} />
                <span className="R1-Hp">15%</span><span className="R1-Gp">85%</span>
            </div>
          </div>
        </div>
        <div className='Result2-detail'>
          세부 감정 분석
          <div className='Result2-box'>
            <ApexChart
              options={options2}
              series={series2}
              type="pie"
              height={370} /> 
          </div>
        </div>
        <div className='Result3-keyword'>
          키워드
          <div className='Result3-box'>

          </div>
        </div>
        <div className='Result4-summary'>
          총정리
          <div className='Result4-box'>
            <div className="Result4-box2">
            오늘 매점에서 친구랑 다투는 바람에 속이 많이 상해요.
            먼저 화해 요청을 하고 싶은데, 자존심도 상하고 말이 잘 안나와요. 친구 문제가 연달아 함께 일어나서 마음이 복잡해졌어요. 
            다음에는 이런 일이 일어나지 않기를 바라고 있어요.
            </div>
          </div>
        </div>
        <div className='Result5-viewChat'>
          전체 채팅 보기 {'>'}
        </div>
      </div>
    </div>
  );
};

export default Result;