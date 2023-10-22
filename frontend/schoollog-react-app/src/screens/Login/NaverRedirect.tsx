import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../config';

function NaverRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();     

  // 컴포넌트가 마운트되면 로그인 로직 실행
  console.log(code)
  // 컴포넌트가 마운트되면 로그인 로직 실행 
  useEffect(() => {


    const data = {
      code: code,
    };

    axios.post(
        `${API_BASE_URL}:8000/account/naver/callback/`,
        data,
      {
          headers: {
              "Content-type": "application/json",
          },
      }
    )
    .then((res) => {
      const token = res.data
      console.log("email token : ", token)
      
      axios.post(
        `${API_BASE_URL}:8000/account/login/`,
        {'token' : token},
        { withCredentials: true }
      )
      .then((res) => {
        if(res.status === 202){
          navigate("/", { replace: true })
          setCookie('isLoggedIn', true, { path: '/' });
        }else if(res.status === 201){
          navigate("/signupType", { replace: true })
        }
      })
    })
    
  }, []
  )
  return <></>;

  
}

export default NaverRedirect;
