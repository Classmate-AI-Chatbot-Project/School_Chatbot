import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../reducers/store/notifications';
import './ConsultationList.css';
import { ReactComponent as WarningIcon } from '../../assets/warning-icon.svg';
import BorderLine from '../../components/BorderLine/BorderLine';
import ListItem from './ListItem';
import { API_BASE_URL } from '../config';
import { formatMonthAndDay } from '../../utils/formatDate';

interface ConsultRoomItem {
  student_id: number;
  room_id: number;
  username: string;
  user_profile: string;
  emotion_temp: number;
  latest_message_content: string;
  latest_message_time: string;
  is_read: boolean;
}

// 상담 대화방 목록 페이지 /consult/list
// 목록 item 클릭하면 /consult/room/${room_id}/student/${student_id} 로 이동하도록 구현하기
function ConsultationList() {
  const [consultRooms, setConsultRooms] = useState<ConsultRoomItem[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}:8000/consult/list`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const ListData: ConsultRoomItem[] = res.data.consult_rooms;

        ListData.sort((a, b) => {
          const dateA = new Date(a.latest_message_time).getTime();
          const dateB = new Date(b.latest_message_time).getTime();
          return dateB - dateA;
        });

        setConsultRooms(ListData);

        console.log(consultRooms);

        const hasUnreadMessages = ListData.some((room) => !room.is_read);
        dispatch(setNotification(hasUnreadMessages));
      })
      .catch((error) => {
        console.error('Error fetching consult rooms:', error);
      });
  }, []);

  function ConsultList() {
    return (
      <Fragment>
        {consultRooms?.map((consultRoom, index) => (
          <Fragment key={index}>
            <Link
              className="ResultItem-link"
              to={`/consult/room/${consultRoom.room_id}/student/${consultRoom.student_id}`}
            >
              <ListItem
                nickname={consultRoom.username}
                profilePhoto={consultRoom.user_profile}
                emotionTemp={consultRoom.emotion_temp}
                latestMessageContent={consultRoom.latest_message_content}
                date={formatMonthAndDay(consultRoom.latest_message_time)}
                room_id={consultRoom.room_id}
                student_id={consultRoom.student_id}
                isRead={consultRoom.is_read}
              />
            </Link>
            <BorderLine width="100%" height="1px" />
          </Fragment>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="Consultationlist-fullbox">
      <div className="Consultationlist-name">
        <p>상담 대화방 목록</p>
      </div>
      <BorderLine width="100%" height="1px" />
      <div className="Consultationlist-scrollable">
        <ConsultList />
        <BorderLine width="100%" height="1px" />
      </div>
    </div>
  );
}

export default ConsultationList;
