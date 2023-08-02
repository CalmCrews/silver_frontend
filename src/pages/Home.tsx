import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginState } from '../states/userInfo';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { fontSizeState } from '../states/userInfo';

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: '', accessToken: ''});
    removeCookie('refreshToken');
  };

  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBodyFontSize(event.target.value);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const token = urlParams.get('token');

    if (token) {
      setLogin({ isLoggedIn: true, userId: 'kakaouser1', accessToken: token });
      navigate('/');
    }
  }, [location, navigate, setLogin]);


  const handleKakaoLogin = () => {
    const kakaoLoginWindow = window.open(`${process.env.REACT_APP_API_URL}/users/kakao/login`, 'kakaoLoginWindow');

    // 메시지 이벤트 리스너를 추가합니다.
    window.addEventListener('message', (event) => {
      // 메시지가 카카오 로그인 창에서 온 것이라면
      if (event.source === kakaoLoginWindow) {
        // 메시지를 받아 처리합니다.
        // 예: 토큰을 추출하여 사용자를 로그인 상태로 만듭니다.
        console.log(event.data);
      }
    });
  };

  return (
    <div>
      {!login.isLoggedIn ? (
        <>
          <Button component={Link} to="/signup/id">회원가입</Button>
          <Button component={Link} to="/signin">로그인</Button>
          <Button onClick={handleKakaoLogin}>카카오 로그인</Button>
        </>
      ) : (
        <>
          <h2>{login.userId}님 안녕하세요</h2>
          <Button onClick={handleLogout}>로그아웃</Button>
        </>
      )}
      <select value={bodyFontSize} onChange={handleFontSizeChange}>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </select>
    </div>
  );
}

export default Home;
