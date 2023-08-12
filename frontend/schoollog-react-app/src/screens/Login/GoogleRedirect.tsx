import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 코드만 추출
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = '491179235526-tj5vfl3giro4rd67dcnncc5afuvmpms5.apps.googleusercontent.com';


  console.log(code)
  // 컴포넌트가 마운트되면 로그인 로직 실행 
  useEffect(() => {


    const data = {
      code: code,
    };

    axios.post(
        `http://127.0.0.1:8000/account/google/callback/`,
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
        `http://127.0.0.1:8000/account/login/`,
        {'token' : token},
        { withCredentials: true }
      )
      .then((res) => {
        if(res.status === 202){
          navigate("/", { replace: true })
          setCookie('isLoggedIn', true, { path: '/' });
        }else if(res.status === 201){
          navigate("/signup", { replace: true })
        }
      })
    })
    
}, []
)
  return <></>;
}

export default GoogleRedirect;