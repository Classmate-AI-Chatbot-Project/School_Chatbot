import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Cookies, useCookies } from "react-cookie";
import "./ProfileEdit.css";
import SchoolSearchModal from "../SignupInputInformation/SchoolSearchModal";
import { School } from "../SignupInputInformation/SchoolSearchModal";
import BorderLine from "../../component/BorderLine/BorderLine";
import { ReactComponent as CloseIcon } from "../../assets/back.svg";
import { ReactComponent as CamerIcon } from "../../assets/profile-edit-camera.svg";
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'
import { API_BASE_URL } from '../config';

export interface ProfileUserData {
  userData: {
    username?: string,
    email?: string,
    school?: string,
    profilePhoto?: string,
  }
}

function ProfileEdit() {
  const cookies = new Cookies();
  const csrftoken = cookies.get("csrftoken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileUserData>({
    userData: {
      username: '',
      email: '',
      school: '',
      profilePhoto: '',
    }
  });
  const [currentWidth, setCurrentWidth] = useState<number>(0);
  const [nickname, setNickname] = useState<string>(formData.userData.username || '');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  useEffect(() => {
    console.log()
    axios.get(
      `${API_BASE_URL}:8000/account/decode/`,
      {
        headers: {
            "Content-type": "application/json",
        },
        withCredentials: true,
    }
  ).then((res: any) => {
    console.log(res.data)
    const data = res.data.student;

    setFormData({
      userData: {
        username: data.username,
        email: data.email,
        school: data.school,
        profilePhoto: `${API_BASE_URL}:8000${data.profile_photo}`,
      // job: data.job === 0 ? 'Teacher' : 'Student',
      }
    });

    const fullboxDiv = document.getElementById('fullbox-div');
    if (fullboxDiv) {
      const divWidth = fullboxDiv.clientWidth;
      setCurrentWidth(divWidth);
    }    
  })
  }, []);

  
  const goBack = ()=> { //이전페이지로 이동
    navigate(-1)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
  };

  const onProfilePhotoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const checkNicknameAvailability = () => {
    const currentNickname = nickname;
  
    axios
      .post(`${API_BASE_URL}:8000/account/check-nickname-availability/`, {
        nickname: currentNickname,
      })
      .then((response) => {
        const { available } = response.data;
  
        if (available) {
          setIsNicknameAvailable(true);
        } else {
          setIsNicknameAvailable(false);
        }
      })
      .catch((error) => {
        console.error('서버 요청 중 오류:', error);
      });
  };
  

  const handleSaveProfile = () => {
    const updatedUserData = {
      username: nickname || formData.userData.username,
      email: formData.userData.email,
      school: selectedSchool ? selectedSchool.SCHUL_NM : formData.userData.school,
      profile_photo: uploadedImage || formData.userData.profilePhoto,
    };

    axios
      .put(`${API_BASE_URL}:8000/account/edit/`, updatedUserData, {
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        withCredentials: true,
      })
      .then(() => {
        console.log('프로필이 성공적으로 업데이트되었습니다.');
        navigate('/profile');
      })
      .catch((error) => {
        console.error('프로필 업데이트 중 오류 발생:', error);
      });
  };


  return (
    <div className="ProfileEdit-fullbox" id="fullbox-div">
      {isModalOpen && (
      <div className='ProfileEdit-modalbox'>
        <SchoolSearchModal
          modalWidth={`${currentWidth}px`}
          onSelectSchool={handleSelectSchool}
          onClose={handleCloseModal}
        />
      </div>  
      )}
      {!isModalOpen && (
      <div className="ProfileEdit-topbox">
        <div className="ProfileEdit-topbar">
          <div className="ProfileEdit-topbar-item">
            <CloseIcon onClick={goBack}/>
            <p>프로필 수정하기</p>
          </div>
          <BorderLine width={'100%'} height={'2px'}/>
        </div>
        <div className="ProfileEdit-mainbox">
          <div className="ProfileEdit-photobox">
            { uploadedImage ? (
              <img className="ProfileEdit-profilephoto"
                src={uploadedImage}
              />
            ) : (
              <img className="ProfileEdit-profilephoto"
                src={`${formData.userData.profilePhoto}?${new Date().getTime()}`}
              />
            )}
            <label htmlFor="profilePhoto" className="ProfileEdit-profilephoto-input">
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                onChange={onProfilePhotoChange}
                style={{display: 'none'}}
              />
              <CamerIcon/> 
            </label>

          </div>
          <div className="ProfileEdit-namebox">
            <input
              type="text"
              placeholder={formData.userData.username}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="ProfileEdit-namebtn" onClick={checkNicknameAvailability}>
              중복확인
            </div>
          </div>
          <div>
            {isNicknameAvailable === null && <p></p>}
            {isNicknameAvailable === true && 
              <p className='SignupInform-nickname-success'>사용 가능한 닉네임입니다.</p>
            }
            {isNicknameAvailable === false && 
              <p className='SignupInform-nickname-warning'>이미 사용 중인 닉네임입니다.</p>
            }
   
          </div>

        </div>
      </div>
      )}
      {!isModalOpen && (
      <div className="ProfileEdit-bottombox">
        <div className='SignupInform-contentbox'>
          <div className='SignupInform-emailbox'>
            <p className='SignupInform-textbox'>계정</p>
            <p className='SignupInform-mail'>{formData.userData.email}</p>
            <div className='SignupInform-underline'/>
          </div>
          <div className='SignupInform-schoolbox'>
            <p className='SignupInform-textbox'>학교 및 학급</p>
            <div className='SignupInform-school-search' onClick={handleOpenModal}>
            {selectedSchool ? (
              <p style={{ fontWeight: 400, color: 'black' }}>
                {selectedSchool.SCHUL_NM}
              </p>
            ) : (
              <p>{formData.userData.school}</p>
            )}
              <SearchIcon />
            </div>
          </div>
          <div className='ProfileEdit-confirmbox' onClick={handleSaveProfile}>
            저장하기
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default ProfileEdit;
