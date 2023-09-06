import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import './ConsultationAll.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: string;
  emotionTemp: number;
}

function ConsultationAll() {
  const navigate = useNavigate();
  const { user_id } = useParams();

  const location = useLocation();
  const consultationList: ResultItem[] = location.state?.consultationList || [];

  axios.get(
    `http://127.0.0.1:8000/teacher/detail/${user_id}`,
    {
      headers: {
          "Content-type": "application/json",
      },
      withCredentials: true,
  }
  ).then((res: any) => {
    // 학생 별명, 이미지, 상담 기록
    console.log(res.data)
  
  })


  const goBack = ()=> { //이전페이지로 이동
    navigate(-1)
  }
  
  function ConsultationResultItemList() {
    return (
      <Fragment>
        {consultationList.map((item, index) => (
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
              {index !== consultationList.length - 1 && (
                <BorderLine width="423px" height="1px" />
              )}
            </Fragment>
        ))}
      </Fragment>
    )
  }

  return(
    <div className="ConsultationAll-fullbox">
      <div className="ConsultationAll-contentbox">
        <div className="ConsultationAll-topbar">
          <BackIcon onClick={goBack}/>
          <p>나의 상담 기록</p>
          <p></p>
        </div>
        <BorderLine width={'423px'} height={'2px'}/>
        <ConsultationResultItemList/>
      </div>
    </div>
  )
}

export default ConsultationAll;