import React, {useState} from "react";
import ChatTopBar from "../chat-topbar/ChatTopBar";
import { ReactComponent as SendButton} from '../../assets/send.svg'
function Chatbot(){
  const [message, setMessage] = useState('')
  const handleChange = () => {
    /* 메세지 입력 */
   };
  const handleSubmit = () => { 
    /* 메세지 보내기 */
  };

  return (
    <div className='Full-box'>
        <header className='Content-box'>
          <ChatTopBar/>
          <div className='Border-line'></div>
          <div className='Chat-container'>
            <input 
              className='Chat-input'
              type='text'
              placeholder="학교생활은 어때? :)"
              value={message}
              onChange={handleChange} />
              <button className="Chat-btn" onClick={handleSubmit}>
                <SendButton/>
              </button>
            
          </div>   
        </header>
    </div>
    
  );
}

export default Chatbot;