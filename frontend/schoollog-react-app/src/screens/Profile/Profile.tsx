import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import ApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import './Profile.css';
import '../Chat/Modal.css';
import { API_BASE_URL } from '../config';
import BorderLine from '../../components/BorderLine/BorderLine';
import ConsultResultItem from '../../components/ConsultResultItem/ConsultResultItem';
import { ReactComponent as ProfileDetailIcon } from '../../assets/profile-detail.svg';
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg';
import { ReactComponent as PowerIcon } from '../../assets/power-icon.svg';
import { ReactComponent as SignoutIcon } from '../../assets/signout-icon.svg';
import { ReactComponent as PaperIcon } from '../../assets/paper-icon.svg';

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: Date;
  emotionTemp: number;
}

interface ModalProps {
  open: boolean;
  close: () => void;
}

function Profile() {
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    school: string;
    profilePhoto: string;
    job: string;
    consultationList: ResultItem[];
  }>({
    username: '',
    email: '',
    school: '',
    profilePhoto: '',
    job: '',
    consultationList: [],
  });
  const [graphData, setGraphData] = useState<{
    series: { name: string; data: number[] }[];
    xaxis: { categories: string[] };
  }>({
    series: [{ name: 'Series 1', data: [] }],
    xaxis: { categories: [] },
  });

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8000/account/decode/`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        console.log(res.data);
        const data = res.data.student;

        if (res.data.student.job === 0) {
          setUserData({
            username: data.username,
            email: data.email,
            school: data.school,
            profilePhoto: `${API_BASE_URL}:8000${data.profile_photo}`,
            job: 'Teacher',
            consultationList: [],
          });
        } else if (res.data.student.job === 1) {
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

          setUserData({
            username: data.username,
            email: data.email,
            school: data.school,
            profilePhoto: `${API_BASE_URL}:8000${data.profile_photo}`,
            job: data.job === 0 ? 'Teacher' : 'Student',
            consultationList: consultationList,
          });

          setGraphData({
            series: graphSeries,
            xaxis: graphXAxis,
          });
        }
      });
  }, []);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month.replace(/^0/, '')}월 ${day.replace(/^0/, '')}일`;
  }

  function formatGraphDate(date: Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
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

  const handleViewConsultations = () => {
    navigate('/profile/consultlist', {
      state: {
        consultationList: userData.consultationList,
        pageType: 'myPage',
      },
    });
  };

  const handleProfileEditClick = (email: string) => {
    navigate(`/profile/edit/${email}`, { state: { email } });
  };

  const handleLogout = () => {
    axios.get(`${API_BASE_URL}:8000/account/logout/`, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });

    // Redux 상태 업데이트
    // dispatch(setLoggedIn(false));

    // 쿠키 삭제
    removeCookie('isLoggedIn', { path: '/' });

    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleLeave = () => {
    axios.get(`${API_BASE_URL}:8000/account/leave/`, {
      headers: {
        'Content-type': 'application/json',
      },
      withCredentials: true,
    });
    // Redux 상태 업데이트
    // dispatch(setLoggedIn(false));
    // 쿠키 삭제
    removeCookie('isLoggedIn', { path: '/' });

    // 로그인 페이지로 이동
    navigate('/login');
  };

  const initialConsultations = userData.consultationList.slice(0, 3);
  function ConsultationResultItemList() {
    return (
      <Fragment>
        {initialConsultations.map((item, index) => (
          <div key={index} className="Profile-consult-item">
            <Link className="ResultItem-link" to={`/teacher/chat/result/${item.chat_id}`}>
              <ConsultResultItem
                keywords={item.keywords}
                date={formatDate(item.date)}
                emotionTemp={item.emotionTemp}
              />
            </Link>
            {index !== initialConsultations.length - 1 && <BorderLine width={'100%'} height={'1px'} />}
          </div>
        ))}
      </Fragment>
    );
  }

  //탈퇴하기 모달창
  const SignOutModal: React.FC<ModalProps> = (props) => {
    const { open, close } = props;
    const closeBtn = () => {
      close();
    };
    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        <section className="Modal-SiginOut-contentBox">
          <div className="Modal-main">
            <div className="Modal-SiginOut-title">탈퇴하기</div>
            <div className="Modal-SiginOut-content">
              회원 탈퇴 시, 계정 정보 및 이용 내역은 {<br />}
              모두 삭제되며 복구되지 않습니다.{<br />}
              {<br />}
              정말 탈퇴하겠습니까?
            </div>
            <div className="Modal-SignOut-button">
              <button className="Modal-SiginOut-cancel" onClick={closeBtn}>
                취소
              </button>
              <button className="Modal-SiginOut-leave" onClick={handleLeave}>
                탈퇴
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="Profile-fullbox">
      <div className="Profile-firstbox">
        <img src={`${userData.profilePhoto}?${new Date().getTime()}`} alt="Profile" />
        <div className="Profile-firstbox-text">
          {userData.job === 'Student' && <p>{userData.username}</p>}
          {userData.job === 'Teacher' && <p>{userData.username} 선생님</p>}
          <p>{userData.email}</p>
        </div>
        <div className="Profile-firstbox-editbtn" onClick={() => handleProfileEditClick(userData.email)}>
          <ProfileDetailIcon />
        </div>
      </div>
      {userData.job === 'Student' && (
        <div className="Profile-secondbox">
          <p>나의 우울도</p>
          <ApexChart
            options={graphOptions}
            series={graphData.series}
            type="line"
            className="Profile-secondbox-graph"
          />
        </div>
      )}
      {userData.job === 'Student' && (
        <div className="Profile-thirdbox">
          <div className="Profile-thirdbox-title">
            <div>
              <p>나의 상담 기록</p>
              <p>{userData.consultationList.length.toString()}</p>
            </div>
            <NextIcon onClick={handleViewConsultations} />
          </div>
          <BorderLine width={'100%'} height={'1px'} />
          <ConsultationResultItemList />
        </div>
      )}
      <div className="Profile-forthbox">
        <div className="Profile-forthbox-menu">
          <PowerIcon />
          <p onClick={handleLogout}>로그아웃</p>
        </div>
        <BorderLine width={'100%'} height={'1px'} />
        <div className="Profile-forthbox-menu">
          <SignoutIcon />
          <p onClick={openModal}>탈퇴하기</p>
        </div>
        <SignOutModal open={isModalOpen} close={closeModal} />
        <BorderLine width={'100%'} height={'1px'} />
        <div className="Profile-forthbox-menu">
          <PaperIcon />
          <p>개인정보취급방침</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
