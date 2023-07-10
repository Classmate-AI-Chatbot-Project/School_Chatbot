import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuthLogin = () => {
  const clientId = '482020010464-hlec7ddjqfkooju4pfi5j5dkepousruq.apps.googleusercontent.com';

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onError={() => {
            console.log("Login 실패");
          }}
          width={"300px"}
          useOneTap
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default GoogleAuthLogin