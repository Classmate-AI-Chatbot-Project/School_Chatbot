import React, {useState} from 'react';
import './SignupInputInform.css';
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from "react-cookie";
import { setLoggedIn, setNickname } from '../../actions';
import { RootState } from '../../reducers';

function SignupInputInformTeacher() {
  const [email, setEmail] = useState('hello@world.com');
  const [nickname, setNickname] = useState('조다은 선생님');

  const isFormValid = email !== '' && nickname !== '';

  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['isLoggedIn']); // isLoggedIn 쿠키를 사용


  const handleSignup = () => {
    if (isFormValid) {
      // Redux 상태 업데이트
      setNickname('조다은 선생님');
      dispatch(setLoggedIn(true));

      // 쿠키에 저장
      setCookie('isLoggedIn', true, { path: '/' });
    }
  };

  return (
    <div className='SignupInputInform-fullbox'>
      <div className='SignupInputInform-itembox'>
        <p className='SignupInputInform-textbox'>계정</p>
        <p className='SignupInputInform-mail'>{email}</p>
        <div className='SignupInputInform-underline'/>
      </div>
      <div className='SignupInputInform-itembox'>
        <p className='SignupInputInform-textbox'>학교 및 학급</p>
        <div className='SignupInputInform-school-search'>
          <p>학교를 찾아주세요</p>
          <SearchIcon />
        </div>
      </div>
      <div 
        className={isFormValid ? 'SignupInputInform-confirmbox-active' : 'SignupInputInform-confirmbox-inactive'}>
        <Link to='/' style={{textDecoration:'none'}}>
          <p onClick={handleSignup}>
            가입하기
          </p>      
        </Link>

      </div>
    </div>  
  )
}

export default SignupInputInformTeacher;