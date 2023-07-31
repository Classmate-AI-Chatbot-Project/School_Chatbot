import React, { useEffect, useState } from 'react';
import "../Chat/Modal.css";
import { ReactComponent as Loading1 } from '../../assets/drawing-load1.svg'
import { ReactComponent as Loading2 } from '../../assets/drawing-load2.svg'
import { ReactComponent as Complete } from '../../assets/drawing-load3.svg'
import { Link } from 'react-router-dom';

interface ModalProps {
  open: boolean;
  close: () => void;
}

const DrawingModal = (props: ModalProps) => {
  const { open, close } = props;
  const [progress, setProgress] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCompleted(true);
  };

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="Modal-contentBox">  
        {completed ? (
            <div className="Modal-main">
              <Complete className="Modal-completeImg" />
              <Link to="/testResult" style={{ textDecoration: 'none' }}>
                <button className="Modal-gotoResult">테스트 결과 보러가기</button>
              </Link>
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
