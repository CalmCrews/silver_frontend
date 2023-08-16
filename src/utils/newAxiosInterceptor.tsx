import React from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../states/userInfo";

const user = useRecoilValue(loginState);

const newAxiosInstance = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};

export default newAxiosInstance;
