import { USER_LOGIN, USER_LOGOUT } from "../constants";

const init = {
  user: false
};

export default function userReducer(state = init, { type, payload }) {
  switch (type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: payload
      }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        user: payload
      }
    }
    default:
      return state;
  }
};