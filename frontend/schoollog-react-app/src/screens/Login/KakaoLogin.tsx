import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import {useDispatch} from 'react-redux'

const KakaoLogin = () => {
  useEffect(() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let grant_type = "authorization_code";
    let client_id = "285aaedc61a36463815654c776b8d225";
    const REDIRECT_URI = "http://localhost:3000/auth";

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`
          , {
      headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
        console.log(res)
        // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
    })
  }, [])
  return <Link to='/'>카카오 로그인 성공</Link>
}

export default KakaoLogin