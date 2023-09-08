import React, { Fragment, useEffect, useState} from "react";
import axios from "axios";
import "./ConsultationList.css"
import { ReactComponent as WarningIcon } from '../../assets/warning-icon.svg'
import BorderLine from "../../component/BorderLine/BorderLine";
import ListItem from "./ListItem";

interface ConsultRoomItem {
  username: string;
  profile_photo: string;
  emotion_temp: number;
  latest_message_content: string;
  latest_message_time: string;
  room_id: number;
  student_id: number;
  is_read: boolean;
}

// 상담 대화방 목록 페이지 /consult/list
// 목록 item 클릭하면 /consult/room/${room_id}/student/${student_id} 로 이동하도록 구현하기
function ConsultationList() {
  const [consultRooms, setConsultRooms] = useState<ConsultRoomItem[]>([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/consult/list`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        // 상담 대화방 목록 item에 표시할 데이터
        const ListData = res.data.consult_rooms
        setConsultRooms(ListData);
        console.log(consultRooms)
      })
      .catch((error) => {
        console.error('Error fetching consult rooms:', error);
      });
  }, []);
  
  function ConsultList() {
    return (
      <div>
        {/* {consultRooms?.map((consultRoom) => (
          <Fragment key={consultRoom.room_id}>
            <ListItem
              nickname={consultRoom.username}
              profile_photo={consultRoom.profile_photo}
              emotion_temp={consultRoom.emotion_temp}
              latest_message_content={consultRoom.latest_message_content}
              latest_message_time={consultRoom.latest_message_time}
              room_id={consultRoom.room_id}
              student_id={consultRoom.student_id}
              is_unread={consultRoom.is_unread}
              // type={consultRoom.emotion_temp >= 50 ? "red" : "green"}
            />
            <BorderLine width="423px" height="1px" />
          </Fragment>
        ))} */}
      </div>
    );
  }
  
  return (
  <div className="Consultationlist-fullbox">
    <div className="Consultationlist-name">
      <p>상담 대화방 목록</p>
      <WarningIcon/>
    </div>
    <BorderLine width="423px" height="1px"/>
    <div className="Consultationlist-scrollable">
        {/* ConsultList and BorderLine moved to the scrollable area */}
        <ConsultList />
        <BorderLine width="423px" height="1px" />
      </div>
  </div>
  )
}

export default ConsultationList;