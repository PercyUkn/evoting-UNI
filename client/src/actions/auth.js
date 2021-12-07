import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAIL,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

let endpoint="http://localhost:5000"

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(endpoint+"/api/login");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({
  NIK,
  NKK,
  nama,
  tanggalLahir,
  email,
  password
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    NIK,
    NKK,
    nama,
    tanggalLahir,
    email,
    password
  });

  try {
    const res = await axios.post(endpoint+"/api/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = (NIK, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    NIK,
    password
  });

  try {
    const res = await axios.post(endpoint+"/api/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    const nik = JSON.stringify({
      NIK,
    });

    localStorage.setItem('user', nik) // Agregado: Guardadndo al usuario en la Session para obtener su Código UNI en el Dasj
    console.log("Guardado en la sesión")
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const activate = (NIK, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    NIK,
    password
  });

  try {
    const res = await axios.post(endpoint+"/api/activate", body, config);

    dispatch({
      type: ACTIVATE_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: ACTIVATE_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
