import React, {Fragment} from "react";
import './ConsultationAll.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import ConsultResultItem from "../../component/ConsultResultItem/ConsultResultItem";
import { ReactComponent as BackIcon } from '../../assets/back.svg'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface ResultItem {
  id: string;
  keywords: string;
  date: string;
  type: string
}



function ConsultationAll() {
  const navigate = useNavigate();
  const { user_id } = useParams();

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

  const dummyData: ResultItem[] = [
    {
      'id': '1001',
      'keywords': '키워드1, 키워드2',
      'date': '2023년 5월 4일',
      'type': 'red'
    },
    {
      'id': '1002',
      'keywords': '키워드3, 키워드4',
      'date': '2023년 3월 4일',
      'type': 'green'
    },
    {
      'id': '1003',
      'keywords': '키워드5, 키워드6',
      'date': '2023년 1월 4일',
      'type': 'yellow'
    },
    {
      'id': '1004',
      'keywords': '키워드7, 키워드8',
      'date': '2022년 12월 1일',
      'type': 'yellow'
    },
    {
      'id': '1005',
      'keywords': '키워드9, 키워드10',
      'date': '2022년 10월 15일',
      'type': 'red'
    },
    {
      'id': '1006',
      'keywords': '키워드11, 키워드12',
      'date': '2022년 9월 20일',
      'type': 'green'
    },
    {
      'id': '1007',
      'keywords': '키워드13, 키워드14',
      'date': '2022년 8월 5일',
      'type': 'yellow'
    },
    {
      'id': '1008',
      'keywords': '키워드15, 키워드16',
      'date': '2022년 7월 30일',
      'type': 'green'
    },
    {
      'id': '1009',
      'keywords': '키워드17, 키워드18',
      'date': '2022년 6월 25일',
      'type': 'red'
    },
    {
      'id': '1010',
      'keywords': '키워드19, 키워드20',
      'date': '2022년 5월 15일',
      'type': 'green'
    },
  ];

  const goBack = ()=> { //이전페이지로 이동
    navigate(-1)
  }
  
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