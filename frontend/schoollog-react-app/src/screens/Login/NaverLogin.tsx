import React from "react";

const NaverLogin= () => {

  const NAVER_CLIENT_ID = 'o20GjxDlH8cHP6nVVDTM';
  const REDIRECT_URI = 'http://localhost:3000/naverLogin';
  const NAVER_STATE = 'false';

  const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${NAVER_STATE}`;


  return (
    <>
    <a href={NAVER_URI}>
      <button>naver login</button>
    </a>
    </>
  )
}

export default NaverLogin