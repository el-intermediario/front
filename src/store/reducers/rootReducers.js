import {combineReducers} from 'redux'
import metaReducer from "./metaReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    meta: metaReducer,
    user: userReducer
});
export default rootReducer