import React, {useState} from 'react';
import './SignupInputInform.css';
import axios from "axios";
import { useEffect } from "react";
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies, useCookies } from "react-cookie";
import { setLoggedIn, setNickname } from '../../actions';
import { RootState } from '../../reducers';

function SignupInputInformStudent() {
  const [SocialEmail, setSocialEmail] = useState("");
  const [SocialName, setSocialName] = useState("");
  const [log, setCookie] = useCookies(['isLoggedIn']);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");

  

  // backend에서 계정, 닉네임 받아오기
  axios.get(
    `http://127.0.0.1:8000/account/decode/`,
    {
      headers: {
          "Content-type": "application/json",
      },
      withCredentials: true,
  }
)
  .then((res: any) => {
      console.log(res.data)
      setSocialEmail(res.data['email']);
      setSocialName(res.data['username']);

      // console.log(res);
      // console.log('닉네임', SocialName);
      // console.log('이메일', SocialEmail);
    })


  const nickname = useSelector((state: RootState) => state.nickname);
  const email = useSelector((state: RootState) => SocialEmail);

  const [isDuplicated, setIsDuplicated] = useState(false);
  const isFormValid = SocialEmail !== '' && nickname !== '';



  
  const handleNicknameChange = (event: any) => {
    const { value } = event.target;
    dispatch(setNickname(value));
    setIsDuplicated(value === '조다은'); 
  };

  const handleSignup = () => {
    if (isFormValid) {
      // Redux 상태 업데이트
      dispatch(setLoggedIn(true));
      const data = {
          school:"kakao-school",
          nickname:nickname,
          job:"0",  
      };
      // 입력한 정보로 회원가입하기
      axios.put(
        `http://127.0.0.1:8000/account/signup/`,
        data, // 전송할 데이터
        {
            headers: {
                "Content-type": "application/json",
                "X-CSRFToken": csrftoken, // CSRF 토큰을 적절하게 가져와서 헤더에 추가
            },
            withCredentials: true,
        }
    )
      .then((res: any) => {
          console.log(res)
          setCookie('isLoggedIn', true, { path: '/' });
        })
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


export default SignupInputInformStudent;