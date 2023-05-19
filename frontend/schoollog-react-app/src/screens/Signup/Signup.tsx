import React from "react";
import './Signup.css'
import { ReactComponent as StudentsIcon } from '../../assets/signup-student.svg'
import { ReactComponent as TeacherIcon } from '../../assets/signup-teacher.svg'
import { ReactComponent as NextIcon } from '../../assets/arrow-next.svg'

function Signup() {
  return(
    <div className="Signup-fullbox">
      <div className="Signup-button">학생으로 가입하기
        <div className="Signup-icons">
          <StudentsIcon/>
        </div>
        <div>
        <NextIcon/>
        </div>
      </div>
      <div className="Signup-button">교직원으로 가입하기
        <div className="Signup-icons">
        <TeacherIcon/>
        </div>
        <div>
        <NextIcon/>
        </div>
      </div>
    </div>
  )
}

export default Signup;