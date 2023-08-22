import React, { useEffect, useState } from 'react';
import "./Modal.css";
import { ReactComponent as Loading1 } from '../../assets/modal-chat1.svg'
import { ReactComponent as Loading2 } from '../../assets/modal-chat2.svg'
import { ReactComponent as Complete } from '../../assets/modal-chat3.svg'
import { Cookies, useCookies } from "react-cookie";
import { Link, useParams, useNavigate} from 'react-router-dom';
import axios from "axios";

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
  const navigate  = useNavigate(); // useNavigation 훅 사용

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 5);
      } else {
        clearInterval(interval);
        handleComplete();
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [progress]);

  const handleComplete = async () => {
    await postResult();
    setCompleted(true);
  };

  const postResult = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/chat/result/b2stlov@nate.com/2/`,
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
    } catch (error) {
      console.error("Error posting result:", error);
    }
  };

  const handleResultButtonClick = () => {
    // navigate 함수를 사용하여 다른 경로로 이동하면서 데이터 전달 (현재 링크는 임의로 설정)
    navigate('/chat/result/admin@duksung.ac.kr/2/',
    { state: {
      data: responseData,
    },
  });
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
                <div className="Modal-progress" style={{ width: `${progress}%`}}></div>
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
