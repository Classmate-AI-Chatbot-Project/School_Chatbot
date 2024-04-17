import { Action } from 'redux';

export const setLoggedIn = (isLoggedIn: boolean) => {
  return {
    type: 'SET_LOGGED_IN',
    payload: isLoggedIn,
  };
};

export const setNickname = (nickname: String) => {
  return {
    type: 'SET_NICKNAME',
    payload: nickname,
  };
};

export const setEmail = (email: String) => {
  return {
    type: 'SET_EMAIL',
    payload: email,
  };
};

export const setTeacher = (isTeacher: boolean) => {
  return {
    type: 'SET_TEACHER',
    payload: isTeacher,
  };
};
