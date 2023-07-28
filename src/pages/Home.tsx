import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginState } from '../states/userInfo';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: '', accessToken: ''});
    removeCookie('refreshToken');
  };

  function LoginSuccess() {
    const location = useLocation();
  
    useEffect(() => {
      console.log(location.pathname);
  
      // if (token) {
      //   setLogin({ isLoggedIn: true, userId: 'kakaouser1', accessToken: token });
      //   navigate('/');
      // }
    }, [location]);
  }

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/kakao/login`;
  };

  return (
    <div>
      {!login.isLoggedIn ? (
        <>
          <Button component={Link} to="/signup">회원가입</Button>
          <Button component={Link} to="/signin">로그인</Button>
          <Button onClick={handleKakaoLogin}>카카오 로그인</Button>
        </>
      ) : (
        <>
          <h2>{login.userId}님 안녕하세요</h2>
          <Button onClick={handleLogout}>로그아웃</Button>
        </>
      )}
    </div>
  );
}

export default Home;
