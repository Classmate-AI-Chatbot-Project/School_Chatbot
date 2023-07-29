import { Action } from 'redux';
import { setLoggedIn } from "../actions";

export interface RootState {
  isLoggedIn: boolean;
  nickname: string;
  email: string;
}

const initialState: RootState = {
  isLoggedIn: false,
  nickname: '',
  email: 'hello@world.com',
};

const rootReducer = (state:RootState = initialState, action: any): RootState => {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
      case 'SET_NICKNAME':
        return {
          ...state,
          nickname: action.payload,
        };
      case 'SET_EMAIL':
        return {
          ...state,
          email: action.payload,
        };   
    default:
      return state;
  }
};

export default rootReducer;