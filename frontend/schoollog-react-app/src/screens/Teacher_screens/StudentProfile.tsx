import React, { Fragment, useEffect, useState } from 'react';
import BorderLine from '../../components/BorderLine/BorderLine';
import ConsultResultItem from '../../components/ConsultResultItem/ConsultResultItem';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './StudentProfile.css';
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg';
import { ReactComponent as BackIcon } from '../../assets/back.svg';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: Date;
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
    consultationList: [],
  });
  const [graphData, setGraphData] = useState<{
    series: { name: string; data: number[] }[];
    xaxis: { categories: string[] };
  }>({
    series: [{ name: 'Series 1', data: [] }],
    xaxis: { categories: [] },
  });

  useEffect(() => {
    console.log(studentID);
    axios
      .get(`${API_BASE_URL}:8000/teacher/detail/${studentID}`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        // 학생 별명, 이미지, 상담 기록
        console.log(typeof new Date(res.data.consult_result[0].result_time));
        const consultationList = res.data.consult_result.map((item: any) => ({
          chat_id: item.chat_id.toString(),
          keywords: item.category,
          date: new Date(item.result_time),
          emotionTemp: item.emotion_temp,
        }));

        const graphSeries = [
          {
            name: 'Series 1',
            data: consultationList.map((item: ResultItem) => item.emotionTemp),
          },
        ];
        const graphXAxis = {
          categories: consultationList.map((item: ResultItem) => formatGraphDate(item.date)),
        };

        consultationList.sort((a: ResultItem, b: ResultItem) => {
          const dateA = a.date.getTime();
          const dateB = b.date.getTime();
          return dateB - dateA;
        });

        setStudentData({
          nickname: res.data.nickname,
          studentID: res.data.student_id,
          profilePhoto: `${API_BASE_URL}:8000${res.data.profile}`,
          consultationList: consultationList,
        });

        setGraphData({
          series: graphSeries,
          xaxis: graphXAxis,
        });

        // console.log(userData)
        console.log(graphData);
        console.log(res.data);
        console.log(studentData);
      });
  }, [studentID]);

  const handleViewConsultations = () => {
    navigate(`/teacher/detail/consultlist/${studentID}`, {
      state: {
        consultationList: studentData.consultationList,
        pageType: 'teacherPage',
      },
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const goConsultRoom = () => {
    axios
      .get(`${API_BASE_URL}:8000/consult/start_consult/${studentID}/`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((response) => {
        const consult_room_url = response.data.consult_room_url;
        navigate(`${consult_room_url}`);
      });
  };

  function formatDate(date: Date) {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    return `${year}년 ${month.replace(/^0/, '')}월 ${day.replace(/^0/, '')}일`;
  }

  function formatGraphDate(date: Date) {
    const newDate = new Date(date);
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    return month + day;
  }

  const graphOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: 50,
        dataLabels: {
          position: 'left',
        },
      },
    },
    xaxis: graphData.xaxis,
    yaxis: {
      max: 100,
      min: 0,
      tickAmount: 2,
      labels: {
        formatter: (value) => String(Math.floor(value)),
      },
    },
    colors: ['#E37354'],
    stroke: {
      width: 2,
    },
    markers: {
      size: 6,
      strokeWidth: 2,
    },
    tooltip: {
      enabled: false, // 마우스 호버 효과 비활성화
    },
  };

  const initialConsultations = studentData.consultationList.slice(0, 3);
  const lastChatId =
    studentData.consultationList.length > 0 ? studentData.consultationList[0].chat_id : 'defaultChatId';

  function ConsultationResultItemList() {
    return (
      <Fragment>
        {initialConsultations.map((item, index) => (
          <Fragment key={item.chat_id}>
            <Link className="StudentProfile-link" to={`/teacher/chat/result/${item.chat_id}`}>
              <ConsultResultItem
                keywords={item.keywords}
                date={formatDate(item.date)}
                emotionTemp={item.emotionTemp}
              />
            </Link>

            {index !== initialConsultations.length - 1 && <BorderLine width="100%" height="1px" />}
          </Fragment>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="StudentProfile-fullbox">
      <div className="ConsultationAll-topbar">
        <BackIcon onClick={goBack} />
        <p>학생 프로필</p>
        <p></p>
      </div>
      <BorderLine width={'100%'} height={'2px'} />
      <div className="StudentProfile-firstbox">
        <img src={studentData.profilePhoto} />
        <p>{studentData.nickname}</p>
        <div className="StudentProfile-button" onClick={goConsultRoom}>
          상담하기
        </div>
      </div>
      <div className="Profile-secondbox">
        <div>
          <p>우울도</p>
          <ApexChart
            options={graphOptions}
            series={graphData.series}
            type="line"
            className="Profile-secondbox-graph"
          />
        </div>
      </div>
      <div className="Profile-thirdbox">
        <div className="Profile-thirdbox-title">
          <div>
            <p>상담 기록</p>
            <p>{studentData.consultationList.length.toString()}</p>
          </div>
          <NextIcon onClick={handleViewConsultations} />
        </div>
        <BorderLine width={'100%'} height={'1px'} />

        <ConsultationResultItemList />
      </div>
    </div>
  );
}

export default StudentProfile;
