import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import {useDispatch} from 'react-redux'

const KakaoLogin = () => {
    // let grant_type = "authorization_code";
    const CLIENT_ID = "2d9ed17578b0549eedac781a79515516";
    const REDIRECT_URI = "http://127.0.0.1:3000/account/kakao/callback";
    const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return (
    <>
    <a href={KAKAO_URI}>
      <button>kakao login</button>
    </a>
    </>
  )
}

export default KakaoLogin