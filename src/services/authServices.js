import jwtDecode from "jwt-decode";
import http from "./httpServices";

const tokenKey = "token";

const getJwt = () => localStorage.getItem(tokenKey);

http.setJwt(getJwt());

const setJwtToLocalStorage = async (jwt) => {
  await localStorage.setItem(tokenKey, jwt);
};

const authRegister = async (data) => {
  const res = await http.post("/auth/register", data);
  return res.data;
};

const authLogin = async (data) => {
  const res = await http.post("/auth/login", data);
  await setJwtToLocalStorage(res.data.data.token);
  await http.setJwt(getJwt());
  return res.data;
};

const authLogout = async () => {
  const res = await http.post("/auth/logout");
  await setJwtToLocalStorage(null);
  return res.data;
};

const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

const passWordReset = async (data) => {
  const res = await http.post("/auth/reset", data);
  return res;
};

const passwordChange = async (data, token) => {
  const res = await http.put(`/auth/reset/${token}`, data);
  return res;
};

export {
  getCurrentUser,
  setJwtToLocalStorage,
  getJwt,
  authRegister,
  authLogin,
  authLogout,
  passWordReset,
  passwordChange,
};
