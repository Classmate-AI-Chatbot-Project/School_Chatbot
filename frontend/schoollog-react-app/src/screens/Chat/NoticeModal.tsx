import React, { useEffect, useState } from 'react';
import "./Modal.css";


interface ModalProps {
  open: boolean;
  close: () => void;
}

const NoticeModal = (props: ModalProps) => {
  const { open, close } = props;

  const handleCloseButtonClick = () => {
   close();
 };

  return (
   <div className={open ? 'openModal modal' : 'modal'}>
      <section className="Modal-contentBox">  
      <button onClick={handleCloseButtonClick}>⊗</button>
         <div className="Modal-main">

         </div>

      </section>
   </div>
  );
};

export default NoticeModal;
