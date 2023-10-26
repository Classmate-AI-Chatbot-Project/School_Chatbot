import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { setTeacher } from '../../actions';
import './SignupType.css'
import { ReactComponent as TeacherCharacter } from '../../assets/signup-teacher-character.svg'
import { ReactComponent as StudentCharacter } from '../../assets/signup-student-chracter.svg'
import { API_BASE_URL } from '../config';

function SignupType(props: any) {
  const dispatch = useDispatch();

  const handleTeacherBoxClick = () => {
    dispatch(setTeacher(true));
  };

  return(
    <div className="Signuptype-fullbox">
      <div className="Signuptype-title">
        회원가입
      </div>
      <div className="Signuptype-selectbox">
        <Link style={{textDecorationLine: 'none'}} to='/signupInform/teacher'>
          <div className="Signuptype-teacherbox" onClick={handleTeacherBoxClick}>
            <div>
              <p>
                <b>교직원</b>으로<br/>
                가입하기
              </p>
              <div className="Signuptype-teacherbtn">
                GO
              </div>
            </div>
            <TeacherCharacter/>
          </div>
        </Link>
        <Link style={{textDecorationLine: 'none'}} to='/signupInform/student'>
          <div className="Signuptype-studentbox">
            <div>
              <p>
                학생으로<br/>
                가입하기
              </p>
              <div className="Signuptype-studentbtn">
                GO
              </div>
            </div>
            <StudentCharacter/>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SignupType;