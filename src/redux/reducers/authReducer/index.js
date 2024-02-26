import * as types from "../../actions/types";

import { initialState } from "../initialState";

export default function authReducer(
  state = initialState.authentication,
  action
) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !!action.auth,
        user: action.auth ? action.auth.decoded : null,
        authToken: action.auth ? action.auth.token : null,
        loading: false,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    case types.REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case types.LOGOUT_USER:
      return {
        ...state,
        user: null,
        authToken: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        redirect: null,
      };
    // case types.CLEAR_LOGIN_ERROR:
    //   return {
    //     ...state,
    //     error: null,
    //     loading: false,
    //   };
    // case types.LOGIN_LOADING:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    default:
      return state;
  }
}
