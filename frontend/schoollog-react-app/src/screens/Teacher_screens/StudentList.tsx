import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';
import axios from 'axios';
import BorderLine from '../../components/BorderLine/BorderLine';
import StudentItem from './StudentItem';
import { Student } from './StudentItem';
import { ReactComponent as DownIcon } from '../../assets/down-icon.svg';
import { API_BASE_URL } from '../config';

function StudentList() {
  const mockChatData = [
    {
      id: 1,
      nickname: '사용자1',
      degree: '58%',
    },
    {
      id: 2,
      nickname: '사용자2',
      degree: '58%',
    },
    {
      id: 3,
      nickname: '사용자3',
      degree: '58%',
    },
    {
      id: 4,
      nickname: '사용자4',
      degree: '58%',
    },
    {
      id: 5,
      nickname: '사용자5',
      degree: '58%',
    },
    {
      id: 6,
      nickname: '사용자6',
      degree: '18%',
    },
  ];

  const navigate = useNavigate();

  const [studentData, setStudentData] = useState<Student[]>([]);
  const [originalData, setOriginalData] = useState<Student[]>([]); // 원본 데이터를 유지
  const sortingOptions = ['최신순', '오래된순', '오름차순', '내림차순'];
  const [sortingOption, setSortingOption] = useState<string>('최신순');

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8000/teacher/studentlist`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        console.log(res.data.student_data);

        const studentData = res.data.student_data;
        setOriginalData(studentData); // 원본 데이터 설정
        setStudentData(studentData);
      });
  }, []);

  const sortStudents = (option: string) => {
    const sortedData = [...studentData];
    switch (option) {
      case '내림차순':
        sortedData.sort((a, b) => b.avg_emotion - a.avg_emotion);
        break;
      case '오름차순':
        sortedData.sort((a, b) => a.avg_emotion - b.avg_emotion);
        break;
      case '최신순':
        setStudentData(originalData);
        break;
      case '오래된순':
        setStudentData([...originalData].reverse());
        break;
      default:
        sortedData.sort((a, b) => b.avg_emotion - a.avg_emotion);
        break;
    }
    setSortingOption(option);
    if (option !== '최신순' && option !== '오래된순') {
      setStudentData(sortedData);
    }
  };

  const handleStudentItemClick = (studentID: string | undefined) => {
    navigate(`/teacher/detail/${studentID}`, { state: { studentID } });
  };

  function StudentItemList() {
    return (
      <Fragment>
        {studentData.map((item, index) => (
          <div
            key={index}
            className="Profile-consult-item"
            onClick={() => handleStudentItemClick(item.email)}
          >
            <StudentItem
              username={item.username}
              profile_photo={item.profile_photo}
              avg_emotion={item.avg_emotion}
            />
            {index !== studentData.length - 1 && <BorderLine width="100%" height="1px" />}
          </div>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="StudentList-fullbox">
      <div className="StudentList-name">
        <p>상담 학생 리스트</p>
        <div>
          <select
            className="StudentList-select"
            value={sortingOption}
            onChange={(e) => sortStudents(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
            <option value="오름차순">우울도 낮은순</option>
            <option value="내림차순">우울도 높은순</option>
          </select>
          <DownIcon />
        </div>
      </div>
      <BorderLine width="100%" height="1px" />
      <div className="StudentList-scrollable">
        <StudentItemList />
        <BorderLine width="100%" height="1px" />
      </div>
    </div>
  );
}

export default StudentList;
