import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NaverRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const CLIENT_ID = 'o20GjxDlH8cHP6nVVDTM';
  const CLIENT_SECRET = 'FScKK93Rwd';
  const NAVER_URI = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
        

  // 컴포넌트가 마운트되면 로그인 로직 실행
  useEffect(() => {
    async function NaverLogin() {
      const res = await axios.get(
        // process.env.REACT_APP_API +
        //   `/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
        `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`
      ); // 명세서 보고 변경
      const ACCESS_TOKEN = res.headers["authorization"];
      const REFRESH_TOKEN = res.headers["refresh-token"];
      setCookie("accessToken", ACCESS_TOKEN);
      setCookie("refreshToken", REFRESH_TOKEN);
      console.log('naver login success!');
    };
      // NaverLogin();
      navigate("/signupType", { replace: true })
  }, []);

  return (
  <>
  <a href={NAVER_URI}>
    <button>naver login</button>
  </a>
  </>
  )

  
}

export default NaverRedirect;