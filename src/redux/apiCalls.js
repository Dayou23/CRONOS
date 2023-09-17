import { loginFailure, loginStart, loginSuccess, logout } from "./userRedux";
import { publicRequest } from "../requestMethods";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "./registerRedux";

import axios from "axios";
import {
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  logoutCart,
} from "./cartRedux";
import Swal from "sweetalert2";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  //console.log("Data", user);
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    //const res = await axios.post("http://localhost:5000/api/auth/register");
    // console.log("apiCalls", res.data);
    Swal.fire(
      "E-posta hesabınıza bir onay mesajı gönderdik. Lütfen e-postanıza gidin ve hesabı onaylayın"
    );
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure(err?.response?.data?.keyValue));
  }
};

export const logOut = (dispatch) => {
  // localStorage.removeItem("Storage");
  // window.localStorage.clear();
  dispatch(logout());
  // dispatch(logoutCart());
  //console.log(localStorage);
  //window.location.reload(false);
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};
