import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginState } from "../states/userInfo";
import axios from "axios";
import { useCookies } from "react-cookie";
import { fontSizeState } from "../states/userInfo";
import { styled } from "styled-components";
import { Box, CssBaseline, Toolbar, IconButton } from "@mui/material";
import MainDrawer from "../components/drawer/MainDrawer";
import MainCarousel from "../components/main/MainCarousel";
import AppBarWithDrawer from "../components/shared/AppBarWithDrawer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`;

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: "", accessToken: "" });
    removeCookie("refreshToken");
  };

  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setBodyFontSize(event.target.value);
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          padding: "20px 0",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer/>
        <MainCarousel/>
        {!login.isLoggedIn ? (
          <>
            <Button component={Link} to="/login">
              로그인
            </Button>
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
    </>
  );
};

export default Home;
