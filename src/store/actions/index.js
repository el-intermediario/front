import { DEFAULT, USER_LOGIN, USER_LOGOUT, ARTICLES_OFFSET } from "../constants";

export const userLogin = (user) => {
  return {
    type: USER_LOGIN,
    payload: user,
  };
};

export const userLogout = (user) => {
  return {
    type: USER_LOGOUT,
    payload: user,
  };
};

export const defaultAction = () => dispatch => {
  dispatch({
    type: DEFAULT,
  })
};

export const setArticlesOffset = (id) => {
  return {
    type: ARTICLES_OFFSET,
    payload: id,
  };
};