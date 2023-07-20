import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import './Login.css'
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";

function Login() {
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useState(false);
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("isLoggedIn");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  return(
    <div className="Login-FullBox">
      <Link to='/signup'>LOGIN</Link>
      <KakaoLogin />
      <GoogleLogin />
      <NaverLogin/>
    </div>
  )
}

export default Login;