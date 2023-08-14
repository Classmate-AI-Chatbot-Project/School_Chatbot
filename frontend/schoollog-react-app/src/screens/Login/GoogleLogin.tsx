import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  const CLIENT_ID = '793203864825-bgnnqpfmg3oseutieg9onr478j3hcroj.apps.googleusercontent.com';
  const REDIRECT_URI = 'http://127.0.0.1:3000/account/google/callback';
  const google_auth_api = "https://accounts.google.com/o/oauth2/v2/auth"
  const scope = "https://www.googleapis.com/auth/userinfo.email " + 
  "https://www.googleapis.com/auth/userinfo.profile"

  const GOOGLE_URI = `${google_auth_api}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${scope}`
  return (
    <>
    <a href={GOOGLE_URI}>
      <button>google login</button>
    </a>
    </>
  )
}

export default GoogleLogin