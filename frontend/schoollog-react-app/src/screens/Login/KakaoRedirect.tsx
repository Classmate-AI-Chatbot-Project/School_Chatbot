import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


function KakaoRedirect() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['isLoggedIn']);

  useEffect(() => {
    const params= new URL(document.location.toString()).searchParams;
    const code = params.get('code');

    const data = {
      code: code,
    };

    axios.post(
        `http://127.0.0.1:8000/account/kakao/callback/`,
        data,
      {
          headers: {
              "Content-type": "application/json",
          },
      }
    )
    .then((res) => {
      const token = res.data
      console.log(token)
      
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


export default KakaoRedirect;