import React, { Fragment, useState } from "react";
import './StudentList.css'
import axios from "axios";
import BorderLine from "../../component/BorderLine/BorderLine";
import StudentItem from "./StudentItem";
import { ReactComponent as DownIcon } from '../../assets/down-icon.svg'
import { useParams } from 'react-router-dom';

interface Student {
  id: number;
  nickname: string;
  degree: string;
}

function StudentList() {
  const mockChatData = [
    {
      id: 1,
      nickname: "사용자1",
      degree: "58%"
    },
    {
      id: 2,
      nickname: "사용자2",
      degree: "58%"

    },
    {
      id: 3,
      nickname: "사용자3",
      degree: "58%"
    },
    {
      id: 4,
      nickname: "사용자4",
      degree: "58%"

    },
    {
      id: 5,
      nickname: "사용자5",
      degree: "58%"
    },
    {
      id: 6,
      nickname: "사용자6",
      degree: "18%"
    },
  ];

  axios.get(
    `http://127.0.0.1:8000/teacher/studentlist`,
    {
      headers: {
          "Content-type": "application/json",
      },
      withCredentials: true,
  }
  ).then((res: any) => {
    console.log(res.data)
    
    // 계정, 닉네임, photo 직렬화 데이터로 프로필에 출력하기
  })

  function StudentsList() {
    return (
      <div>
        {sortedChatData.map((item, index) => (
          <Fragment key={item.id}>
            <StudentItem
              nickname={item.nickname}
              degree={item.degree}
            />
            {index !== sortedChatData.length - 1 && (
              <BorderLine width="423px" height="1px" />
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  const [sortingOption, setSortingOption] = useState<string>('최신순'); // 기본 정렬 옵션 설정

  const sortFunctions: Record<string, (a: Student, b: Student) => number> = {
    '최신순': (a, b) => b.id - a.id,
    '오래된순': (a, b) => a.id - b.id,
    '오름차순': (a, b) => parseFloat(a.degree) - parseFloat(b.degree),
    '내림차순': (a, b) => parseFloat(b.degree) - parseFloat(a.degree),
  };

  const sortedChatData = mockChatData.slice().sort(sortFunctions[sortingOption]);

  return(
    <div className="StudentList-fullbox">
      <div className="StudentList-name">
        <p>상담 학생 리스트</p>
        <div>
          <select
            className="StudentList-select"
            value={sortingOption}
            onChange={(e) => setSortingOption(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
            <option value="오름차순">우울도 낮은순</option>
            <option value="내림차순">우울도 높은순</option>
          </select>
          <DownIcon />
        </div>
      </div>
      <BorderLine width="423px" height="1px"/>
      <div className="StudentList-scrollable">
        <StudentsList />
        <BorderLine width="423px" height="1px" />
      </div>
    </div>
  )
}

export default StudentList;