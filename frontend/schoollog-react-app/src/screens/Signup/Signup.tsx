import React from "react";
import { Link } from "react-router-dom";
import './Signup.css'
import { ReactComponent as StudentsIcon } from '../../assets/signup-student.svg'
import { ReactComponent as TeacherIcon } from '../../assets/signup-teacher.svg'
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg'

function Signup() {
  return(
    <div className="Signup-fullbox">
      <Link style={{textDecoration: 'none', color: 'black'}}to='/signupInform'>
        <div className="Signup-button">
          학생으로 가입하기
          <div className="Signup-icons-first">
            <StudentsIcon/>
          </div>
          <div className="Signup-icons-second">
          <NextIcon/>
          </div>
        </div>
      </Link>
      <div className="Signup-button">
        교직원으로 가입하기
      <div className="Signup-teacher-first">
          <TeacherIcon/>
        </div>
        <div className="Signup-teacher-second">
        <NextIcon/>
        </div>
      </div>
    </div>
  )
}

export default Signup;