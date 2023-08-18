import React, { useEffect, useState } from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import {
  Toolbar,
  Button,
  ButtonGroup,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import MyInfoCard from "../../components/myinfo/MyInfoCard";
import CustomDivider from "../../components/shared/CustomDivider";
import { styled } from "styled-components";
import { styled as muiStyled } from "@mui/material";
import { useRecoilState } from "recoil";
import { loginState } from "../../states/userInfo";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";

import classes from "./MyInfo.module.css";

const UserInfo = {
  name: "코알라",
  userId: 1,
  profile: "",
};

//가격 변환 함수
function formatForPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const LinkButton = muiStyled(Button)(({ theme }) => ({
  padding: "15px",
  color: "#fff",
  width: "160px",
  fontSize: "1rem",
  fontWeight: "600",
  borderRadius: "12px",
  margin: "12px 12px 30px 12px",
  backgroundColor: "#a394ff",
  "&:hover": {
    backgroundColor: "#a394ff",
  },
  "&:active": {
    backgroundColor: "#a394ff",
  },
  "&:focus": {
    backgroundColor: "#a394ff",
  },
}));

const GridButton = styled.button`
  border-radius: 0;
  border: 2px solid #f0f0f0;
  color: #3a3a3a;
  background-color: transparent;
  padding: 18px 10px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(240, 240, 240, 0.25);
  }
`;

const RowButton = styled.button`
  text-align: left;
  border-radius: 0;
  border: 1.5px solid #d9d9d9;
  color: #3a3a3a;
  background-color: transparent;
  padding: 14px 31px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(240, 240, 240, 0.25);
  }
`;

const MainDiv = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyInfo = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [userInfo, setUserInfo] = useState({
    name: "",
    userId: 0,
    profile: "",
    balance: 0,
  });
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();

  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: "", accessToken: "" });
    removeCookie("refreshToken");
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setOpenDialog(false);
  };

  const goToChargePage = () => {
    navigate("/charge");
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}users/userinfo/`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log("getUserInfo inside :", error);
        return {
          name: "",
          userId: 0,
          profile: "",
          balance: 0,
        };
      }
    }
    try {
      getUserInfo().then((returnData) => {
        setUserInfo({
          name: returnData.nickname,
          userId: returnData.id,
          profile: returnData.profile_image,
          balance: returnData.balance,
        });
      });
    } catch (error) {
      console.log("run getUserInfo :", error);
    }
  }, []);
  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "100px" }} />
        <AppBarWithDrawer />
        <MainDiv>
          <MyInfoCard userInfo={userInfo} />
          <br />
          <CustomDivider width="calc(100% - 26px)" color="#F0F0F0" />
          <div className={classes["money-status"]}>
            <span className={classes["just-text"]}>지갑 잔액 :</span>
            <span className={classes["money-text"]}>
              {formatForPrice(userInfo.balance)} 원
            </span>
          </div>
          <CustomDivider width="calc(100% - 26px)" color="#F0F0F0" />
          <div style={{ display: "flex" }}>
            <LinkButton onClick={goToChargePage} variant="contained">
              충전하기
            </LinkButton>
            <LinkButton href="/club/myClubs" variant="contained">
              나의 모임 바로가기
            </LinkButton>
          </div>

          <ButtonGroup
            aria-label="button group"
            variant="text"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0px",
              width: "100%",
              boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.25)",
              borderTop: "1px solid #f0f0f0",
              borderRadius: "0",
              marginBottom: "10px",
            }}
          >
            <GridButton>구매현황</GridButton>
            <GridButton>배송조회</GridButton>
            <GridButton>쿠폰관리</GridButton>
            <GridButton>주문내역</GridButton>
            <GridButton>정보수정</GridButton>
            <GridButton>문의하기</GridButton>
          </ButtonGroup>
          <br />
          <ButtonGroup
            orientation="vertical"
            sx={{
              width: "100%",
              border: "1px solid #f0f0f0",
              borderRadius: "0",
              marginBottom: "40px",
            }}
          >
            <RowButton>자주 묻는 질문</RowButton>
            <RowButton onClick={handleLogoutClick}>로그아웃</RowButton>
            <RowButton>회원탈퇴</RowButton>
          </ButtonGroup>
        </MainDiv>
        <BottomTabBar currentPage="myinfo" />
      </DefaultContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog} sx={{}}>
        <DialogTitle>로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 로그아웃 하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmLogout} color="primary">
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyInfo;
