import { DEFAULT, USER_LOGIN, USER_LOGOUT } from "../constants";

export const userLogin = (user) => {
  return {
    type: "USER_LOGIN",
    payload: user,
  };
};

export const userLogout = (user) => {
  return {
    type: "USER_LOGIN",
    payload: user,
  };
};

export const defaultAction = () => dispatch => {
  dispatch({
    type: DEFAULT,
  })
};