import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import './Login.css'
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import { ReactComponent as DogIllust } from '../../assets/login-drdog.svg'

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="Login-fullbox">
      <div className="Login-illustbox">
        <DogIllust />
      </div>
      <div className="Login-contentbox">
        <p>
          로그인하고 <br />
          상담결과를 받아봐요!
        </p>
        <div className="Login-kakao-login">
          <KakaoLogin />
        </div>
        <div className="Login-google-login">
          <GoogleLogin />
        </div>
        <div className="Login-naver-login">
          <NaverLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;