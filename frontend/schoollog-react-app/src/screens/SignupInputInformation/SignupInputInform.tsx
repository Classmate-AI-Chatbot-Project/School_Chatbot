import React, {useState} from 'react';
import './SignupInputInform.css';
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'

function SignupInputInform() {
  const [isDuplicated, setIsDuplicated] = useState(false);
  return (
    <div className='SignupInputInform-fullbox'>
      <div className='SignupInputInform-itembox'>
        <p className='SignupInputInform-textbox'>계정</p>
        <input className='SignupInputInform-inputbox'></input>
      </div>
      <div className='SignupInputInform-itembox'>
        <p className='SignupInputInform-textbox'>닉네임</p>
        <input className='SignupInputInform-inputbox'></input>
        <p>이미 사용중인 닉네임입니다.</p>
      </div>
      <div className='SignupInputInform-itembox'>
        <p className='SignupInputInform-textbox'>학교 및 학급</p>
        <div className='SignupInputInform-school-search'>
          <p>학교를 찾아주세요</p>
          <SearchIcon />
        </div>
      </div>
    </div>  
  )
}

export default SignupInputInform;