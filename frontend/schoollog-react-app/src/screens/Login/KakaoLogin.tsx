import React from "react";
import './Login.css'
import { ReactComponent as KakaoIcon } from '../../assets/login-kakao-icon.svg'
import { API_BASE_URL } from '../config';

const KakaoLogin = () => {
    // let grant_type = "authorization_code";
    const CLIENT_ID = "2d9ed17578b0549eedac781a79515516";
    const REDIRECT_URI = `http://schoollog.kro.kr/account/kakao/callback`;
    const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return (
    <div className="Kakao-button">
      <KakaoIcon />
      <a href={KAKAO_URI}>
        카톡으로 3초만에 로그인
      </a>
    </div>
  )
}

export default KakaoLogin