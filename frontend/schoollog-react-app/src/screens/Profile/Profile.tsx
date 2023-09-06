import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { setLoggedIn } from "../../actions";
import { Link, useNavigate } from 'react-router-dom';
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import "./Profile.css";
import ProfileEdit from "./ProfileEdit";
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { ReactComponent as ProfileDetailIcon } from '../../assets/profile-detail.svg'
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg'
import { ReactComponent as PowerIcon } from '../../assets/power-icon.svg'
import { ReactComponent as SignoutIcon } from '../../assets/signout-icon.svg'
import { ReactComponent as PaperIcon } from '../../assets/paper-icon.svg'

interface ResultItem {
  id: string;
  keywords: string;
  date: string;
  type: string
}

function Profile() {
  const dummyNumber:Number = 17;
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    school: '',
    profilePhoto: '',
    job: '',
  });

  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(
      `http://127.0.0.1:8000/account/decode/`,
      {
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true,
    }
  ).then((res: any) => {
    console.log(res.data)
    const data = res.data.student;
    const consult = res.data.consult;

    setUserData({
      username: data.username,
      email: data.email,
      school: data.school,
      profilePhoto: `http://127.0.0.1:8000${data.profile_photo}`,
      job: data.job === 0 ? 'Teacher' : 'Student',
    });

    console.log(userData.profilePhoto)
  })
  }, []);

  const dummyData: ResultItem[] = [
    {
      'id' : '1001',
      'keywords' : '친구, 매점',
      'date' : '2023년 5월 4일',
      'type' : 'red'
    },
    {
      'id' : '1002',
      'keywords' : '농구, 연습',
      'date' : '2023년 3월 4일',
      'type' : 'green'
    },
    {
      'id' : '1003',
      'keywords' : '방학, 공부',
      'date' : '2023년 1월 4일',
      'type' : 'yellow'
    },
  ]

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

  const handleViewConsultations = () => {
    navigate('/profile/consultlist');
  };

  const handleProfileEditClick = (email: string) => {
    navigate(`/profile/edit/${email}`, { state: { email } });
  };

  const handleLogout = () => {
    axios.get(
      `http://127.0.0.1:8000/account/logout/`,
      {
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true,
    }
  )

  
    // Redux 상태 업데이트
    dispatch(setLoggedIn(false));

    // 쿠키 삭제
    removeCookie('isLoggedIn', { path: '/' });

    // 로그인 페이지로 이동
    navigate('/login');
  };

  const handleLeave = () => {
    axios.get(
      `http://127.0.0.1:8000/account/leave/`,
      {
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true,
    }
  )  
    // Redux 상태 업데이트
    dispatch(setLoggedIn(false));
    // 쿠키 삭제
    removeCookie('isLoggedIn', { path: '/' });

    // 로그인 페이지로 이동
    navigate('/login');
  };
  
  
  function ConsultationResultItemList() {
    return (
      <div
      style={{
        width: '100%',
      }}      
      >
        {dummyData.map((item, index) => (
          <Fragment key={item.id}>
            <ConsultResultItem
            keywords={item.keywords}
            date={item.date}
            type={item.type}
            />
            {index !== dummyData.length - 1 && (
          <BorderLine width={'100%'} height={'1px'}/>
        )}
          </Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="Profile-fullbox">
      <div className="Profile-firstbox">
        <img src={userData.profilePhoto}/>
        <div className="Profile-firstbox-text">
          <p>{userData.username}</p>
          <p>{userData.email}</p>
        </div>
        <div className="Profile-firstbox-editbtn" 
          onClick={() => handleProfileEditClick(userData.email)}>
          <ProfileDetailIcon/>
        </div>
      </div>
      {userData.job === 'Student' &&
      <div className="Profile-secondbox">
          <p>나의 우울도</p>
          <ApexChart 
            options={options1} 
            series={lineGraphData.series} 
            type="line" 
            className="Profile-secondbox-graph"
          />
      </div>   
      }
      {userData.job === 'Student' && 
      <div className="Profile-thirdbox">
        <div className="Profile-thirdbox-title">
          <div>
            <p>나의 상담 기록</p>
            <p>{dummyNumber.toString()}</p>            
          </div>
          <NextIcon onClick={handleViewConsultations} />
        </div>
        <BorderLine width={'100%'} height={'1px'}/>
        <ConsultationResultItemList/>
      </div>      
      }
      <div className="Profile-forthbox">
        <div className="Profile-forthbox-menu">
          <PowerIcon/>
          <p onClick={handleLogout}>로그아웃</p>
        </div>
        <BorderLine width={'100%'} height={'1px'}/>
        <div className="Profile-forthbox-menu">
          <SignoutIcon/>
          <p onClick={handleLeave}>탈퇴하기</p>
        </div>
        <BorderLine width={'100%'} height={'1px'}/>
        <div className="Profile-forthbox-menu">
          <PaperIcon/>
          <p>개인정보취급방침</p>
        </div>
      </div> 
    </div>
  )
}

export default Profile;
