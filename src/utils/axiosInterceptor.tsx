import React from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../states/userInfo";

const createInstance = (): AxiosInstance => {
  const headers = {};
  return axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers,
  });
};

const axiosInstance = createInstance();

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(loginState); // useRecoilValue로 변경
  console.log("user: ", user);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config: any) => {
        if (user.isLoggedIn) {
          config.headers["Authorization"] = `Bearer ${user.accessToken}`;
        }
        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return <>{children}</>;
};

export { AxiosInterceptor, axiosInstance };
