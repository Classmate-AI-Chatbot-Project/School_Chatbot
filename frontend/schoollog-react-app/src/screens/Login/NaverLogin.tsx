import React from "react";
import { ReactComponent as NaverIcon } from '../../assets/login-naver-icon.svg'
import { API_BASE_URL } from '../config';

const NaverLogin= () => {
  const CLIENT_ID = 'N2pHYJkFjc2tY4jtGNRE';
  const REDIRECT_URI = `http://schoollog.kro.kr/account/naver/callback`;
  const NAVER_STATE = 'false';

  const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${NAVER_STATE}`;


  return (
    <div className="Naver-button">
      <NaverIcon />
      <a href={NAVER_URI}>
        NAVER로 로그인
      </a>
    </div>    
  )
}

export default NaverLogin
