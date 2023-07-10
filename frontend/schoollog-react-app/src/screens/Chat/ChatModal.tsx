import React, { ReactNode } from 'react';
import "./ChatModal.css";

interface ModalProps {
  open: boolean;
  close: () => void;
  header: string;
  children: ReactNode;
}

const ChatModal = (props: ModalProps) => {
  const { open, close, header } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
        </section>
      ) : null}
    </div>
  );
};

export default ChatModal;
