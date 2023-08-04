import React, { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginState } from '../states/userInfo';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { fontSizeState } from '../states/userInfo';
import { styled } from 'styled-components';
import HomeAppBar from '../components/shared/HomeAppBar';
import { Box, CssBaseline, Toolbar } from "@mui/material"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`


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
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", padding: "20px 45px", alignItems: "center"}}>
      <CssBaseline/>
      <Toolbar sx={{ height: "60px" }}/>
      <HomeAppBar>
        <>
          <Box>
          </Box>
        </>
      </HomeAppBar>
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
    </Box>
  );
}

export default Home;
