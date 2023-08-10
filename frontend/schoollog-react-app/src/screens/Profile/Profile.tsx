import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie";
import { setEmail, setLoggedIn, setNickname } from "../../actions";
import { RootState } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import ApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import "./Profile.css";
import BorderLine from "../../component/BorderLine/BorderLine";
import dummyProfile from '../../assets/dummy-profile-img.png'
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
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
  const [SocialEmail, setSocialEmail] = useState("");
  const [SocialName, setSocialName] = useState("");
  const [Photo, setPhoto] = useState("");
  

  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);
  const navigate = useNavigate();

  // user정보 가져오기
  axios.get(
    `http://127.0.0.1:8000/account/decode/`,
    {
      headers: {
          "Content-type": "application/json",
      },
      withCredentials: true,
  }
)
  .then((res: any) => {
      console.log(res)
      setSocialEmail(res.data['email'])
      setSocialName(res.data['username'])
      setPhoto(res.data['profile_photo'])
    })


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
    navigate('/consultations');
  };


  // 로그아웃
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
    .then((res: any) => {
        console.log(res.data)
        removeCookie('isLoggedIn', {path: '/'});
        navigate('/login');
      })    
  };

  function ConsultationResultItemList() {
    return (
      <div>
        {dummyData.map((item, index) => (
          <Fragment key={item.id}>
            <ConsultResultItem
            keywords={item.keywords}
            date={item.date}
            type={item.type}
            />
            {index !== dummyData.length - 1 && (
              <BorderLine width="423px" height="1px" />
            )}
          </Fragment>
        ))}
      </div>
    )
  }

  return (
    <div className="Profile-fullbox">
      <div className="Profile-firstbox">
        {/* <img src={"http://127.0.0.1:8000"+Photo} alt="profile"/> */}
        <img src={"http://127.0.0.1:8000"+Photo} alt="profile"/>
        <div>
          <p>{SocialName}</p>
          <p>{SocialEmail}</p>
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
            <p>나의 상담 기록</p>
            <p>{dummyNumber.toString()}</p>            
          </div>
          <NextIcon onClick={handleViewConsultations} />
        </div>
        <BorderLine width={'423px'} height={'1px'}/>
        <div>
          <ConsultationResultItemList/>
        </div>
      </div>
      <div className="Profile-forthbox">
        <div className="Profile-forthbox-menu">
          <PowerIcon/>
          <p onClick={handleLogout}>로그아웃</p>
        </div>
        <BorderLine width={'423px'} height={'1px'}/>
        <div className="Profile-forthbox-menu">
          <SignoutIcon/>
          <p>탈퇴하기</p>
        </div>
        <BorderLine width={'423px'} height={'1px'}/>
        <div className="Profile-forthbox-menu">
          <PaperIcon/>
          <p>개인정보취급방침</p>
        </div>
      </div>
    </div>
  )
}

export default Profile;