import React, {Fragment} from "react";
import './StudentList.css'
import BorderLine from "../../component/BorderLine/BorderLine";
import StudentItem from "./StudentItem";
import { ReactComponent as DownIcon } from '../../assets/down-icon.svg'

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
  function StudentsList() {
    return (
    <div>
      {/* Map through the mockChatData array and render ListItem components */}
      {mockChatData.map((item, index) => (
        <Fragment key={item.id}>
          <StudentItem
            nickname={item.nickname}
            degree={item.degree}
          />
          {/* Render BorderLine except for the last ListItem */}
          {index !== mockChatData.length - 1 && (
            <BorderLine width="423px" height="1px" />
          )}
        </Fragment>
      ))}
    </div>
    );
  }
  return(


    <div className="StudentList-fullbox">
    <div className="StudentList-name">
      <p>상담 학생 리스트</p>
      <p>최신순<DownIcon/></p>
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