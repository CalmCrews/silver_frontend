import { atom } from "recoil";
const storedLoginState = localStorage.getItem("loginState");

export const loginState = atom({
  key: "loginState",
  default: storedLoginState
    ? JSON.parse(storedLoginState)
    : { isLoggedIn: false, userId: "", accessToken: "", user_id: "" },
});

export const fontSizeState = atom({
  key: "fontSizeState",
  default: localStorage.getItem("bodyFontSize") || "16px",
});
