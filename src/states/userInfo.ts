import { atom } from "recoil";

export const loginState = atom({
  key: 'loginState', 
  default: { isLoggedIn: false, userId: '', accessToken: '' }, 
});

export const fontSizeState = atom({
  key: 'fontSizeState', 
  default: localStorage.getItem('bodyFontSize') || '16px', 
});