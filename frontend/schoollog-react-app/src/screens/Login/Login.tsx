import React from "react";
import {
  Link
} from "react-router-dom";

function Login() {
  return(
    <div className="Login-FullBox">
      <Link to='/signup'>LOGIN</Link>
      <button>google</button>
      <button>naver</button>
    </div>
  )
}

export default Login;