import {USER_LOGIN, USER_LOGOUT} from "../constants";

const init = {
    user: false
};

const userReducer = (state = init, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            return {
                ...state,
                user: action.payload
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                user: false
            }
        }
        default:
            return state;
    }
};

export default userReducer;