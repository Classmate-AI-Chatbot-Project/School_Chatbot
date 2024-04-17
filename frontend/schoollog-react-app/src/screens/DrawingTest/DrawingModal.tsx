import React, { useState } from 'react';
import '../Chat/Modal.css';
import { ReactComponent as Loading1 } from '../../assets/drawing-load1.svg';
import { ReactComponent as Loading2 } from '../../assets/drawing-load2.svg';
import { ReactComponent as Complete } from '../../assets/drawing-load3.svg';

interface ModalProps {
  open: boolean;
  close: () => void;
}

const DrawingModal = (props: ModalProps) => {
  const { open, close } = props;
  const [completed, setCompleted] = useState<boolean>(false);

  // const [Data, setData] = useState({
  //   image: '',
  //   branch: '',
  //   flower: '',
  //   leaf: '',
  //   root: '',
  //   fruit: '',
  // });

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section className="Modal-contentBox">
          {completed ? (
            <div className="Modal-main">
              <Complete className="Modal-completeImg" />
            </div>
          ) : (
            <main className="Modal-main">
              <Loading1 className="Modal-img1" />
              <div className="Modal-progressBar">
                <div
                  className="Modal-progress"
                  style={{ animation: 'moveLeftRight 6s linear infinite' }}
                ></div>
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
