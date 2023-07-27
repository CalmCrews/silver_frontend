import React from 'react';
import { atom, useRecoilState } from 'recoil';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { loginState } from '../states/userInfo';

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: '', accessToken: ''});

  };

  return (
    <div>
      {!login.isLoggedIn ? (
        <>
          <Button component={Link} to="/signup">회원가입</Button>
          <Button component={Link} to="/signin">로그인</Button>
          <Button component={Link} to="/signin">카카오 로그인</Button>
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
