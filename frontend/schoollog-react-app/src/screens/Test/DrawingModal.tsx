import React, { useEffect, useState } from 'react';
import "../Chat/Modal.css";
import { ReactComponent as Loading1 } from '../../assets/drawing-load1.svg'
import { ReactComponent as Loading2 } from '../../assets/drawing-load2.svg'
import { ReactComponent as Complete } from '../../assets/drawing-load3.svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ModalProps {
  open: boolean;
  close: () => void;
}

const DrawingModal = (props: ModalProps) => {
  const { open, close } = props;
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const navigate = useNavigate();

  const [Data, setData] = useState({
    image: '',
    branch : '',
    flower : '',
    leaf : '',
    root : '',
    fruit : ''
  });

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
    axios.get(
      `http://34.22.65.41:8000/teacher/test/result`
    ).then((res: any) => {
      console.log(res);
      const data = res.data;
  
      setData({
        image: `http://34.22.65.41:8000${res.data.img}`,
        branch : data.result.branch,
        flower : data.result.flower,
        leaf : data.result.leaf,
        root : data.result.root,
        fruit : data.result.fruit
      });
      setCompleted(true);
    })
  };

  const handleResultButtonClick = () => {
    // completed 상태가 true일 때만 결과 페이지로 이동하도록 함
    if (completed) {
      navigate(`/testResult`,
        { state: { data: Data } }
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
                <button className="Modal-gotoResult" onClick={handleResultButtonClick}>테스트 결과 보러가기</button>
            </div>
          ) : (
            <main className="Modal-main">
              <Loading1 className="Modal-img1" />
              <div className="Modal-progressBar">
                <div className="DrawingModal-progress" style={{ width: `${progress}%`}}></div>
              </div>
              <Loading2 className="Modal-img2" />
            </main>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default DrawingModal;