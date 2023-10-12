import React, { useState, useEffect, useRef } from 'react';
import './SignupInputInform.css';
import axios from "axios";
import SchoolSearchModal from './SchoolSearchModal';
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Cookies, useCookies } from "react-cookie";
// import { setLoggedIn, setNickname } from '../../actions';
import { School } from './SchoolSearchModal';

interface UserData {
  username: string;
  email: string;
  school?: string;
  profilePhoto?: string
  job?: number;
}

function SignupInputInformStudent() {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    school: '',
    job: 1,
  });

  const [log, setCookie] = useCookies(['isLoggedIn']);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  const [nickname, setNickname] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const [isDuplicated, setIsDuplicated] = useState(false);
  const isSchoolSelected = selectedSchool !== null;
  const isFormValid = !isDuplicated && isSchoolSelected;

  useEffect(() => {
    // 초기 로드 시 email과 username을 가져오기
    axios.get(
      `http://127.0.0.1:8000/account/decode/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    ).then((res: any) => {
      console.log(res.data);
      const data = res.data.student;

      setUserData({
        username: data.username,
        email: data.email,
      });
    });

    const fullboxDiv = document.getElementById('fullbox-div');
    if (fullboxDiv) {
      const divWidth = fullboxDiv.clientWidth;
      setCurrentWidth(divWidth);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
  };

  const handleAccountExist = () => {
    const data = {
      nickname: nickname
    };
    axios.post(
      `http://127.0.0.1:8000/account/account_exist/`,
      data,
      {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      }
    ).then((res: any) => {
      console.log(res.status);

      const guideTextDiv = document.querySelector('.SignupInform-nickname-guide');
      if (guideTextDiv instanceof HTMLElement) {
        if (res.status === 200) {
          setIsDuplicated(true);
          guideTextDiv.style.display = 'block';
        } else if (res.status === 201) {
          setIsDuplicated(false);
          console.log(isDuplicated)
          guideTextDiv.style.display = 'block';
        }
      }
    })
  };
  
  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNickname(value);
  };    

  const handleSignup = () => {
    if (isFormValid) {
      // Redux 상태 업데이트
      // dispatch(setLoggedIn(true));

      const data = {
        school: selectedSchool?.SCHUL_NM,
        school_code: selectedSchool?.SD_SCHUL_CODE,
        nickname: nickname,
        job: 1,  
      };

      axios.put(
        `http://127.0.0.1:8000/account/signup/`,
        data,
      {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
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
    <div className='SignupInform-fullbox' id='fullbox-div'>

      {isModalOpen && (
      <div className='SignupInform-modalbox'>
        <SchoolSearchModal
          modalWidth={`${currentWidth}px`}
          onSelectSchool={handleSelectSchool}
          onClose={handleCloseModal}
        />
      </div>  
      )}        

      {!isModalOpen && (
      <div className='SignupInform-contentbox'>
      <div className='SignupInform-emailbox'>
        <p className='SignupInform-textbox'>계정</p>
        <p className='SignupInform-mail'>{userData.email}</p>
        <div className='SignupInform-underline'/>
      </div>
      <div className='SignupInform-nicknamebox'>
        <p className='SignupInform-textbox'>닉네임</p>
        <div className='SignupInform-inputbox'>
          <input className='SignupInform-input'
            value={nickname}
            onChange={handleNicknameChange}        
          ></input>
          <div className='SignupInform-nicknamebtn'
            onClick={handleAccountExist}   
          >
            중복확인
          </div>
        </div>
        <div className='SignupInform-underline-nickname'/>
        <div className='SignupInform-nickname-guide'>
        {isDuplicated ? (
            <p className='SignupInform-nickname-warning'>이미 사용중인 닉네임입니다.</p>
          ) : (
            <p className='SignupInform-nickname-success'>사용 가능한 닉네임입니다.</p>
          )}
        </div>        
      </div>
      <div className='SignupInform-schoolbox'>
        <p className='SignupInform-textbox'>학교 및 학급</p>
        <div className='SignupInform-school-search' onClick={handleOpenModal}>
        {selectedSchool ? (
          <p style={{ fontWeight: 400, color: 'black' }}>
            {selectedSchool.SCHUL_NM}
          </p>
        ) : (
          <p>학교를 찾아주세요</p>
        )}
            <SearchIcon />
        </div>
      </div>
      <div 
        className={isFormValid ? 'SignupInform-confirmbox-active' : 'SignupInform-confirmbox-inactive'}>
        <Link to='/' style={{textDecoration:'none'}}>
          <p onClick={handleSignup}>
            가입하기
          </p>      
        </Link>
      </div>
      </div>
      )}
    </div>  
  )
}

export default SignupInputInformStudent;