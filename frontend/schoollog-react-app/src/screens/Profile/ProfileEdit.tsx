import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./ProfileEdit.css";
import SchoolSearchModal from "../SignupInputInformation/SchoolSearchModal";
import { School } from "../SignupInputInformation/SchoolSearchModal";
import BorderLine from "../../component/BorderLine/BorderLine";
import { ReactComponent as CloseIcon } from "../../assets/back.svg";
import { ReactComponent as CamerIcon } from "../../assets/profile-edit-camera.svg";
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg'

export interface ProfileUserData {
  userData: {
    username?: string,
    email?: string,
    school?: string,
    profilePhoto?: string,
  }
}

function ProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileUserData>({
    userData: {
      username: '',
      email: '',
      school: '',
      profilePhoto: '',
    }
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const imgRef = useRef();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);


  useEffect(() => {
    console.log()
    axios.get(
      `http://127.0.0.1:8000/account/decode/`,
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
        profilePhoto: `http://127.0.0.1:8000${data.profile_photo}`,
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

  const onProfilePhotoChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }


  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
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
                src={formData.userData.profilePhoto}
              />
            )}
            {/* use CamerIcon as ProfilePhoto Input button */}
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

            {/* <CamerIcon/> */}
          </div>
          <div className="ProfileEdit-namebox">
            <input
              type="text"
              placeholder={formData.userData.username}
              value={formData.userData.username}
            />
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
          <div className='ProfileEdit-confirmbox'>
            저장하기
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default ProfileEdit;
