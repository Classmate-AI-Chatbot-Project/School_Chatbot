import React, { useEffect, useState } from 'react';
import "./Modal.css";
import { ReactComponent as Loading1 } from '../../assets/modal-chat1.svg'
import { ReactComponent as Loading2 } from '../../assets/modal-chat2.svg'
import { ReactComponent as Complete } from '../../assets/modal-chat3.svg'
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams, useNavigate} from 'react-router-dom';
import axios from "axios";
import { TailSpin } from 'react-loader-spinner'

interface ModalProps {
  open: boolean;
  close: () => void;
}

const ChatModal = (props: ModalProps) => {
  const { open, close } = props;
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const { user_id, chatroom_id } = useParams();  
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate(); // useNavigation 훅 사용

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 데이터를 가져오도록 이동
    if (open) {
      postResult();
    }
  }, [open]);

  const postResult = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/chat/result/${user_id}/${chatroom_id}/`,
        {
          headers: {
            "Content-type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        }
      );
      console.log(response);
      setResponseData(response.data);
      setCompleted(true);
    } catch (error) {
      console.error("Error posting result:", error);
    }
  };

  const handleResultButtonClick = () => {
    // completed 상태가 true일 때만 결과 페이지로 이동하도록 함
    if (completed) {
      navigate(`/chat/result/${user_id}/${chatroom_id}/`,
        { state: { data: responseData } }
      );
    }
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="Modal-contentBox">
          {completed ? (
            <div className="Modal-main">
              <Complete className="Modal-completeImg" />
              <button
                className="Modal-gotoResult"
                onClick={handleResultButtonClick}
              >
                상담결과 보러가기
              </button>
            </div>
          ) : (
            <main className="Modal-main">
              <Loading1 className="Modal-img1" />
              <div className="Modal-progressBar">
                <div className="Modal-progress" style={{ animation: 'moveLeftRight 6s linear infinite'}}></div>
              </div>
              <Loading2 className="Modal-img2" />
            </main>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default ChatModal;
