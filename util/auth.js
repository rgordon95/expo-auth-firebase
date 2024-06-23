import axios from "axios";
const API_KEY = "AIzaSyBprMQmlI2e3i7DetBlhE7MLKYnSl40NT4";

export const createUser = (email, password) => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};

export const signIn = (email, password) => {
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  );
};
