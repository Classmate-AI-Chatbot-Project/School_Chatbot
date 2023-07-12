import React from "react";
import { Link } from "react-router-dom";
import './Login.css'
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";

function Login() {
  return(
    <div className="Login-FullBox">
      <Link to='/signup'>LOGIN</Link>
      <Link to='/profile'>PROFILE</Link>
      <KakaoLogin />
      <GoogleLogin />
      <NaverLogin/>
    </div>
  )
}

export default Login;