import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import './ConsultationAll.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from '../config';

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: Date;
  emotionTemp: number;
}

function ConsultationAll() {
  const navigate = useNavigate();
  const location = useLocation();
  const pageType: string = location.state?.pageType || '';
  const consultationList: ResultItem[] = location.state?.consultationList || [];

  const goBack = ()=> {
    navigate(-1)
  }

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}년 ${month.replace(/^0/, '')}월 ${day.replace(/^0/, '')}일`;
  }
  
  function ConsultationResultItemList() {
    return (
      <Fragment>
        {consultationList.map((item, index) => (
          <Fragment key={item.chat_id}>
            { pageType === 'myPage' ? (
              <Link 
              className="ResultItem-link"
              to={`/student/chat/result/${item.chat_id}`}>
              <ConsultResultItem
                keywords={item.keywords}
                date={formatDate(item.date)}
                emotionTemp={item.emotionTemp}
              />            
            </Link>                  
            ) : pageType === 'teacherPage' ? (
              <Link 
              className="ResultItem-link"
              to={`/teacher/chat/result/${item.chat_id}`}>
              <ConsultResultItem
                keywords={item.keywords}
                date={formatDate(item.date)}
                emotionTemp={item.emotionTemp}
              />            
            </Link>                  
            ): null}

            {index !== consultationList.length - 1 && (
              <BorderLine width="100%" height="1px" />
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
          { pageType === 'myPage' ? (
            <p>나의 상담 기록</p>
          ) : pageType === 'teacherPage' ? (
            <p>상담 기록</p>
          ): null}
          <p></p>
        </div>
        <BorderLine width={'100%'} height={'2px'}/>
        <ConsultationResultItemList/>
      </div>
    </div>
  )
}

export default ConsultationAll;