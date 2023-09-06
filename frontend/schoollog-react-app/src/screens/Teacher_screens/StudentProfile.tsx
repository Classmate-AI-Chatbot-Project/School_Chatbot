import React, { Fragment, useEffect, useState } from "react";
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import "./StudentProfile.css";
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg'
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import axios from "axios";

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: string;
  emotionTemp: number;
}

function StudentProfile() {
  const location = useLocation();

  const navigate = useNavigate();
  const studentID = location.state?.studentID || '';

  const [studentData, setStudentData] = useState<{
    nickname: string;
    studentID: string;
    profilePhoto: string;
    consultationList: ResultItem[];
  }>({
    nickname: '',
    studentID: '',
    profilePhoto: '',
    consultationList: []
  });


  useEffect(() => {
    console.log(studentID)
    axios.get(
      `http://127.0.0.1:8000/teacher/detail/${studentID}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
    }
    ).then((res: any) => {
      // 학생 별명, 이미지, 상담 기록
      console.log(res.data)  

      const consultationList = res.data.consult_result.map((item: any) => ({
        chat_id: item.chat_id.toString(),
        keywords: item.category,
        date: formatDate(item.result_time),
        emotionTemp: item.emotion_temp
    }));

      setStudentData({
        nickname: res.data.nickname,
        studentID: res.data.studentID,
        profilePhoto: `http://127.0.0.1:8000${res.data.profile}`,
        consultationList: consultationList,
      })
      console.log(studentData.consultationList)
    })
  } ,[studentID]);

  const handleViewConsultations = () => {
    navigate(`/teacher/detail/consultlist/${studentID}`, {
      state: { consultationList: studentData.consultationList },
    });
  };

  const options1: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }, 
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 10,
        dataLabels: {
          position: 'left'
        }
      },
    },
      xaxis: {
        categories: [''],
        labels: {
          //  show: false
        },
        axisBorder: {
          // show: false,
        },
      },
  };
  const lineGraphData = {
    series: [
      {
        name: "Series 1",
        data: [30, 40, 35, 50], // Replace this with your data points
      },
    ],
    options: {
      chart: {
        id: "line-chart",
      },
      xaxis: {
        categories: ['0202', '0302', '0321', '0411'], // Replace this with your categories
      },
      colors: ['#E37354'],
    },
    markers: {
      size: 10
    }
  };

  const initialConsultations = studentData.consultationList.slice(0, 3);
  function ConsultationResultItemList() {
    return (
      <Fragment>
        {initialConsultations.map((item, index) => (
          <Fragment key={item.chat_id}>
            <Link 
              className="ResultItem-link"
              to={`/teacher/chat/result/${item.chat_id}`}>
              <ConsultResultItem
                keywords={item.keywords}
                date={item.date}
                emotionTemp={item.emotionTemp}
              />
            </Link>

            {index !== initialConsultations.length - 1 && (
              <BorderLine width="423px" height="1px" />
            )}

          </Fragment>
        ))}
      </Fragment>
    )
  }

  const goBack = ()=> { 
    navigate(-1)
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month.replace(/^0/, '')}월 ${day.replace(/^0/, '')}일`;
  }

  return(
    <div className="StudentProfile-fullbox">
        <div className="ConsultationAll-topbar">
          <BackIcon onClick={goBack}/>
          <p>학생 프로필</p>
          <p></p>
        </div>
        <BorderLine width={'100%'} height={'2px'}/>      
      <div className="StudentProfile-firstbox">
        <img src={studentData.profilePhoto}/>
        <p>{studentData.nickname}</p>
        <div className="StudentProfile-button">
          상담하기
        </div>
      </div>
      <div className="Profile-secondbox">
        <div>
          <p>나의 우울도</p>
          <ApexChart 
            options={options1} 
            series={lineGraphData.series} 
            type="line" 
            width={370} 
            height={200}
          />
        </div>
      </div>   
      <div className="Profile-thirdbox">
        <div className="Profile-thirdbox-title">
          <div>
            <p>상담 기록</p>
            <p>{studentData.consultationList.length}</p>            
          </div>
          <NextIcon onClick={handleViewConsultations} />
        </div>
        <BorderLine width={'100%'} height={'1px'}/>

        <ConsultationResultItemList/>

      </div>
    </div>
  )
}

export default StudentProfile;