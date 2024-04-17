import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileEdit.css';
import SchoolSearchModal from '../SignupInputInformation/SchoolSearchModal';
import { School } from '../SignupInputInformation/SchoolSearchModal';
import BorderLine from '../../components/BorderLine/BorderLine';
import { ReactComponent as CloseIcon } from '../../assets/back.svg';
import { ReactComponent as CamerIcon } from '../../assets/profile-edit-camera.svg';
import { ReactComponent as SearchIcon } from '../../assets/signup-input-search.svg';
import { Cookies, useCookies } from 'react-cookie';
import { API_BASE_URL } from '../config';

export interface ProfileUserData {
  userData: {
    username?: string;
    email?: string;
    school?: string;
    job?: number;
    profile_photo?: string;
  };
}

function ProfileEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileUserData>({
    userData: {
      username: '',
      email: '',
      school: '',
      job: 1,
      profile_photo: '',
    },
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const imgRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [currentWidth, setCurrentWidth] = useState<number>(0);

  useEffect(() => {
    console.log();
    axios
      .get(`${API_BASE_URL}:8000/account/decode/`, {
        headers: {
          'Content-type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        const data = res.data;
        console.log(res.data);

        setFormData({
          userData: {
            username: data.username,
            email: data.email,
            school: data.school,
            profile_photo: `${API_BASE_URL}:8000${data.profile_photo}`,
            // job: data.job === 0 ? 'Teacher' : 'Student',
          },
        });

        const fullboxDiv = document.getElementById('fullbox-div');
        if (fullboxDiv) {
          const divWidth = fullboxDiv.clientWidth;
          setCurrentWidth(divWidth);
        }
      });
  }, []);

  const goBack = () => {
    //이전페이지로 이동
    navigate(-1);
  };

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

      const formData = new FormData();
      formData.append('profile_photo', e.target.files[0]);

      axios
        .post(`${API_BASE_URL}:8000/account/upload-profile-photo/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log('프로필 사진이 성공적으로 업로드되었습니다.');
          // 업로드 성공 시 적절한 처리를 수행하세요.
        })
        .catch((error) => {
          console.error('프로필 사진 업로드 중 오류 발생:', error);
        });
    }
  };
  const handleSelectSchool = (school: School) => {
    setSelectedSchool(school);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      userData: {
        ...formData.userData,
        username: e.target.value,
      },
    });
  };

  const cookies = new Cookies();
  const csrftoken = cookies.get('csrftoken');
  // 저장 버튼을 클릭했을 때 호출되는 함수
  const handleSaveProfile = () => {
    const updatedUserData = {
      ...formData.userData,
      school: selectedSchool ? selectedSchool.SCHUL_NM : formData.userData.school,
      profile_photo: uploadedImage || formData.userData.profile_photo,
    };

    console.log(updatedUserData);

    axios
      .put(`${API_BASE_URL}:8000/account/edit/`, updatedUserData, {
        headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      })
      .then(() => {
        console.log('프로필이 성공적으로 업데이트되었습니다.');
        // 저장 후 이동할 경로로 이동
        navigate('/profile/');
      })
      .catch((error) => {
        console.error('프로필 업데이트 중 오류 발생:', error);
      });
  };

  const [nicknameAvailability, setNicknameAvailability] = useState<{
    available: boolean;
  } | null>(null); // 닉네임 가용성 상태

  useEffect(() => {
    // 이 부분에서 서버에 닉네임 가용성 확인 요청을 보냅니다
    axios
      .post(`${API_BASE_URL}:8000/account/check-nickname-availability/`, {
        nickname: formData.userData.username,
      })
      .then((response) => {
        // 서버에서 응답을 받은 후 실행할 코드
        const { available } = response.data;
        setNicknameAvailability({ available });
      })
      .catch((error) => {
        // 오류 처리
        console.error('서버 요청 중 오류:', error);
      });
  }, [formData.userData.username]);

  return (
    <div className="ProfileEdit-fullbox" id="fullbox-div">
      {isModalOpen && (
        <div className="ProfileEdit-modalbox">
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
              <CloseIcon onClick={goBack} />
              <p>프로필 수정하기</p>
            </div>
            <BorderLine width={'100%'} height={'2px'} />
          </div>
          <div className="ProfileEdit-mainbox">
            <div className="ProfileEdit-photobox">
              {uploadedImage ? (
                <img className="ProfileEdit-profilephoto" src={uploadedImage} />
              ) : (
                <img className="ProfileEdit-profilephoto" src={formData.userData.profile_photo} />
              )}
              <label htmlFor="profilePhoto" className="ProfileEdit-profilephoto-input">
                <input
                  id="profilePhoto"
                  type="file"
                  accept="image/*"
                  onChange={onProfilePhotoChange}
                  style={{ display: 'none' }}
                />
                <CamerIcon />
              </label>
            </div>
            <div className="ProfileEdit-namebox">
              <input
                type="text"
                placeholder="닉네임을 입력하세요" // Placeholder text for nickname input
                value={formData.userData.username}
                onChange={handleNicknameChange} // Handle nickname changes
              />

              {nicknameAvailability !== null && (
                <p
                  style={{
                    color: nicknameAvailability.available ? 'blue' : 'red',
                  }}
                >
                  {nicknameAvailability.available
                    ? '사용 가능한 닉네임입니다.'
                    : '이미 사용 중인 닉네임입니다.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {!isModalOpen && (
        <div className="ProfileEdit-bottombox">
          <div className="SignupInform-contentbox">
            <div className="SignupInform-emailbox">
              <p className="SignupInform-textbox">계정</p>
              <p className="SignupInform-mail">{formData.userData.email}</p>
              <div className="SignupInform-underline" />
            </div>
            <div className="SignupInform-schoolbox">
              <p className="SignupInform-textbox">학교 및 학급</p>
              <div className="SignupInform-school-search" onClick={handleOpenModal}>
                {selectedSchool ? (
                  <p style={{ fontWeight: 400, color: 'black' }}>{selectedSchool.SCHUL_NM}</p>
                ) : (
                  <p>{formData.userData.school}</p>
                )}
                <SearchIcon />
              </div>
            </div>
            <div
              className="ProfileEdit-confirmbox"
              onClick={handleSaveProfile}
              //disabled={isSaveButtonDisabled}
            >
              저장하기
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
