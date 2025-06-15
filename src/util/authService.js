// src/recoil/authService.js
let setLoginState;

export const setLoginStateSetter = (setter) => {
  setLoginState = setter;
};

export const updateLoginState = (value) => {
  if (setLoginState) {
    setLoginState(value);
  } else {
    console.error("LoginState setter is not set.");
  }
};
