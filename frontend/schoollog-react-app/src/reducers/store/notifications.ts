// src/store/notifications.js

// 액션 타입 정의
const SET_NOTIFICATION = 'notifications/SET_NOTIFICATION';

// 액션 생성자
export interface SetNotificationAction {
  type: typeof SET_NOTIFICATION;
  payload: boolean;
}

export function setNotification(isRead: boolean): SetNotificationAction {
  return {
    type: SET_NOTIFICATION,
    payload: isRead,
  };
}

// 초기 상태
export interface NotificationsState {
  isRead: boolean;
}

const initialState: NotificationsState = {
  isRead: false,
};

// 리듀서
export default function notificationsReducer(
  state = initialState,
  action: SetNotificationAction
): NotificationsState {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        isRead: action.payload,
      };
    default:
      return state;
  }
}
