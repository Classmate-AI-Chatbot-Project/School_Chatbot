import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import {useDispatch} from 'react-redux'

const KakaoLogin = () => {
    // let grant_type = "authorization_code";
    const KAKAO_CLIENT_ID = "285aaedc61a36463815654c776b8d225";
    const REDIRECT_URI = "http://localhost:3000/kakaoLogin";

    const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return (
    <>
    <a href={KAKAO_URI}>
      <button>kakao login</button>
    </a>
    </>
  )
}

export default KakaoLogin