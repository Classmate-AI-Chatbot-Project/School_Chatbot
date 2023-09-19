// src/store/user.js

// 새로운 액션 타입 정의
const SET_LOGGED_IN = 'user/SET_LOGGED_IN';

export interface SetLoggedIn {
  type: typeof SET_LOGGED_IN;
  payload: boolean;
}
// 새로운 액션 생성자 정의
export function setLoggedIn(isLoggedIn: boolean): SetLoggedIn {
  return {
    type: SET_LOGGED_IN,
    payload: isLoggedIn,
  };
}

export interface UserState {
  isLoggedIn: boolean;
}

const initialState: UserState = {
  isLoggedIn: false, // 로그인 상태 초기값
};

// 리듀서
export default function userReducer(
  state = initialState,
  action: SetLoggedIn
): UserState {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
}