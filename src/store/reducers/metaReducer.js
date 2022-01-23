import { IS_LOADING, RE_RENDERED, THROW_ERROR, THROW_SUCCESS, ARTICLES_OFFSET } from "../constants";
import { toast } from "react-toastify";

const init = {
  isLoading: false,
  error: '',
  success: '',
  reRendered: false,
  articlesOffset: []
};

const metaReducer = (state = init, { type, payload }) => {
  switch (type) {
    case THROW_ERROR: {
      toast.error(payload);
      return {
        ...state,
        error: payload
      }
    }
    case THROW_SUCCESS: {
      toast.success(payload);
      return {
        ...state,
        success: payload
      }
    }
    case IS_LOADING:
      return {
        ...state,
        isLoading: payload
      };
    case RE_RENDERED:
      return {
        ...state,
        reRendered: payload
      };
    case ARTICLES_OFFSET:
      return {
        ...state,
        articlesOffset: [...state.articlesOffset, payload]
      };
    default:
      return state;
  }
};

export default metaReducer;