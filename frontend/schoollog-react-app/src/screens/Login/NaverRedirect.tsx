import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function NaverRedirect() {
  const code = new URL(window.location.href).searchParams.get("code"); // 현재 URL에서 코드만 추출
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const NAVER_CLIENT_ID = 'o20GjxDlH8cHP6nVVDTM';


  // 컴포넌트가 마운트되면 로그인 로직 실행 
  useEffect(() => {
    async function NaverLogin() {
      // const res = await axios.get(
      //   process.env.REACT_APP_API +
      //     `/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
      // ); // 명세서 보고 변경
      // const ACCESS_TOKEN = res.headers["authorization"];
      // const REFRESH_TOKEN = res.headers["refresh-token"];
      // setCookie("accessToken", ACCESS_TOKEN);
      // setCookie("refreshToken", REFRESH_TOKEN);
      console.log('naver login success!');
    };
      NaverLogin();
      navigate("/", { replace: true })
  }, []);

  return <></>;
}

export default NaverRedirect;