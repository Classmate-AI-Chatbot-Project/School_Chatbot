import React from "react";
import { ReactComponent as GoogleIcon } from '../../assets/login-google-icon.svg'
import { API_BASE_URL } from '../config';

const GoogleLogin = () => {
  const CLIENT_ID = '793203864825-bgnnqpfmg3oseutieg9onr478j3hcroj.apps.googleusercontent.com';
  const REDIRECT_URI = `http://schoollog.kro.kr/account/google/callback`;
  const google_auth_api = "https://accounts.google.com/o/oauth2/v2/auth"
  const scope = "https://www.googleapis.com/auth/userinfo.email " + 
  "https://www.googleapis.com/auth/userinfo.profile"

  const GOOGLE_URI = `${google_auth_api}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`
  
  return (
    <div className="Google-button">
      <GoogleIcon />
      <a href={GOOGLE_URI}>
        Google로 로그인
      </a>
    </div>
  )
}

export default GoogleLogin
