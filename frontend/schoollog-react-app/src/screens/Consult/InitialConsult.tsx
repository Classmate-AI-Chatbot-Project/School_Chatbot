import React from "react";
import { Link } from 'react-router-dom';
import "./Consult.css"
import { ReactComponent as MesBegin } from '../../assets/mes-begin.svg'


function InitialConsult() {
  return (
    <div className="Chat-Fullbox">
      <header className="Chat-Contentbox">
        <div className="Chat-Output">
            <div className="Consult-InitialScreen">
               <Link to="/login">
                  <button className="Consult-InitialScreenBtn"></button>
               </Link>
               <MesBegin className= "Consult-InitialScreenIcon" />
            </div>
        </div>
        <div className="Chat-Input">
          <span className="InitialConsult-InputBox">
            <input 
              className="InitialConsult-InputMessage"
              type="text"
              placeholder="메시지 보내기"
              disabled
            />
          </span>
          <button className="Chat-Send-btn" disabled></button>
        </div> 
      </header>
    </div>
  );
}

export default InitialConsult;
