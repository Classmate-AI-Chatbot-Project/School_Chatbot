import React, {Fragment} from "react";
import './ProfileDetail.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

interface ResultItem {
  chat_id: string;
  keywords: string;
  date: string;
  emotionTemp: number;
} 

function ProfileDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const consultationList: ResultItem[] = location.state?.consultationList || [];

  const goBack = ()=> {
    navigate(-1)
  }
  
  function ConsultationResultItemList() {
    return (
      <div>
        {consultationList.map((item, index) => (
          <Fragment key={item.chat_id}>
            <ConsultResultItem
              keywords={item.keywords}
              date={item.date}
              emotionTemp={item.emotionTemp}
              />

            {index !== consultationList.length - 1 && (
              <BorderLine width="100%" height="1px" />
            )}

          </Fragment>
        ))}
      </div>
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

export default ProfileDetail;