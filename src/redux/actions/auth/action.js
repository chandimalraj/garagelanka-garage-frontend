import jwtDecode from "jwt-decode";
import { userLogin } from "../../../services/authService";
import * as types from "../types";
import { showToasts } from "../../../components/toast";
import { Navigate, useNavigate } from "react-router-dom";

export const loginSuccess = (decoded, token) => ({
  type: types.LOGIN_SUCCESS,
  auth: decoded && token ? { decoded, token } : null,
});

export const loginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const redirectUser = (link) => ({
  type: types.REDIRECT,
  payload: link,
});

export const logOutUser = ()=>({
  type:types.LOGOUT_USER,
  payload:{}
})

export const loginUser = (credentials) => {
  return async (dispatch) => {
    console.log("login user action triggered");

    try {
      const response = await userLogin(credentials);
      console.log(response);
      if (response.status == 200) {
        const { token } = response.data;
        const decoded = jwtDecode(token);
        localStorage.setItem("jwtToken", token);
        dispatch(loginSuccess(decoded, token));

        const user = decoded.user;

        if (user.redirect) {
          dispatch(redirectUser("/garages"));
        } else {
          dispatch(redirectUser("/app"));
        }
        showToasts("SUCCESS", "successfully login");
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      showToasts("ERROR", "login unsuccessfull");
    }
  };
};
