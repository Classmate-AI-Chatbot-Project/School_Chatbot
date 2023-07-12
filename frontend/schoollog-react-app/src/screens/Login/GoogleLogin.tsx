import React, { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleLogin } from "@react-oauth/google";

const GoogleLogin = () => {
  const GOOGLE_CLIENT_ID = '482020010464-hlec7ddjqfkooju4pfi5j5dkepousruq.apps.googleusercontent.com';
  const REDIRECT_URI = 'http://localhost:3000/googleLogin';

  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${GOOGLE_CLIENT_ID}`
  return (
    <>
    <a href={GOOGLE_URI}>
      <button>google login</button>
    </a>
    </>
  )
}

export default GoogleLogin