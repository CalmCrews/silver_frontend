import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { loginState } from '../states/userInfo';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {

  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

	const navigate = useNavigate();

  useEffect(() => {
    // URL에서 code를 추출합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log(code);
      handleNaverCallback(code);
    }
    else {
      navigate('/');
    }
  }, []);

  const handleNaverCallback = async (code: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}users/naver/callback/?code=${code}`
      );
      console.log(response.data);
      const { user, token } = response.data;

      // 로그인 성공 시 사용자 정보와 토큰을 처리합니다.
      console.log('Logged in user:', user);
      console.log('Access Token:', token.access);
      console.log('Refresh Token:', token.refresh);

      setLogin({ isLoggedIn: true, userId: user.naverId, accessToken: token.access });
      setCookie('refreshToken', token.refresh, { path: '/' });
      navigate('/');
      console.log("navigate!")
    } catch (error) {
      console.error('Naver callback error:', error);
    }
  };


  // useEffect(() => {
  //   if (code) {
  //     console.log(`${process.env.REACT_APP_API_URL}users/Naver/callback/?code=${code}/`);
  //     axios.get(`${process.env.REACT_APP_API_URL}users/Naver/callback/?code=${code}`)
  //     .then(res => {
  //       console.log("res:", res);
  //       if (res.data.message === "로그인 성공") {
  //         setLogin({ isLoggedIn: true, userId: res.data.user.username, accessToken: res.data.accessToken });
  //         setCookie('refreshToken', res.data.refreshToken, { path: '/' });
  //         navigate('/');
  //       }
  //     })
  //     .catch(err => {
  //       console.error("err:", err);
  //     });
  //   }
  // }, [])
  
  return (
    <div>
      hi
    </div>
  );
}

export default NaverLogin;