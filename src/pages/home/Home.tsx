import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";
import { useCookies } from "react-cookie";
import { fontSizeState } from "../../states/userInfo";
import { styled } from "styled-components";
import { Box, CssBaseline, Toolbar, IconButton } from "@mui/material";
import MainCarousel from "../../components/main/MainCarousel";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import MyBuyingCard from "../../components/main/MyBuyingCard";
import CustomDivider from "../../components/shared/CustomDivider";
import { axiosInstance } from "../../utils/axiosInterceptor";
import BottomTabBar from "../../components/shared/BottomTabBar";
import DefaultContainer from "../../components/shared/DefaultContainer";
import ClubBuyingCard from "../../components/main/ClubBuyingCard";
import HorizontalContainer from "../../components/shared/HorizontalContainer";
import RecommendBox from "../../components/main/RecommendBox";
import EmptyDataImg from "../../assets/Images/Empty_Data.png"


const MyBuyingData = [
  {
    id: 1,
    end_at: "2023-08-04 / 20",
    name: "설국열차 팔토시",
    thumbnail: "",
    accomplished: 100,
    participantsNum: 500,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
  {
    id: 2,
    end_at: "2023-08-14 / 14",
    name: "설국열차 팔토시 짱 시원함",
    thumbnail: "",
    accomplished: 20,
    participantsNum: 10,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
  {
    id: 3,
    end_at: "2023-08-15 / 17",
    name: "설국열차 팔토시",
    thumbnail: "",
    accomplished: 40,
    participantsNum: 34,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
];

const ClubBuyingData = [
  {
    id: 1,
    end_at: "2023-08-04 / 20",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 22,
    price: 5000,
    score: 4.7,
    participantsNum: 500,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
  {
    id: 2,
    end_at: "2023-08-14 / 14",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 15,
    price: 2200,
    score: 3,
    participantsNum: 20,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
  {
    id: 3,
    end_at: "2023-08-15 / 17",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 25,
    price: 19900,
    score: 4.2,
    participantsNum: 120,
    participants: [
      {
        name: "코알1",
        profile: "",
      },
      {
        name: "코알2",
        profile: "",
      },
      {
        name: "코알3",
        profile: "",
      },
    ],
  },
];

const RecommendData = [
  {
    id: 1,
    intro: "팔이 얼 것 같은",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 22,
    price: 5000,
    score: 4.7,
  },
  {
    id: 2,
    intro: "팔이 얼 것 같은",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 15,
    price: 2200,
    score: 3,
  },
  {
    id: 3,
    intro: "팔이 얼 것 같은",
    name: "설국열차 팔토시",
    thumbnail: "",
    discountRate: 25,
    price: 19900,
    score: 4.2,
  },
];

const MainDiv = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionBox = styled.div`
  width: 100%;
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyDiv = styled.p`
  color: #909090;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  line-height: 145%;
  margin: 20px 0;
`

const SectionTitle = styled.h2`
  width: 100%;
  margin: 17px 0;
  padding: 10px;
  color: #a394ff;
  font-size: 1.5rem;
  font-weight: 700;
`;

const SubDiv = styled.div`
  width: 100%;
  position: relative;
  top: -10px;
  padding: 0 10px;
  color: #909090;
  font-size: 1rem;
  font-weight: 600;
  text-align: start;
`;

interface FormData {
  name: string;
  intro: string;
}

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: "", accessToken: "" });
    removeCookie("refreshToken");
  };


  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <MainDiv>
          <MainCarousel />
          <SectionBox>
            <SectionTitle>내가 참여 중인 함께구매</SectionTitle>
            {MyBuyingData.length === 0 ? (
              <>
                <img src={EmptyDataImg} alt="empty_data_image" width="110px"/>
                <EmptyDiv>
                  아직 참여 중인 함께구매 상품이 없어요
                  <br/>
                  상품을 구경해 볼까요?
                </EmptyDiv>
              </>
            ) : (
              MyBuyingData.map((product) => (
                <MyBuyingCard key={product.id} {...product} />
              ))
            )}
            <br />
            <CustomDivider color="#F0F0F0" width="100%" />
          </SectionBox>

          <SectionBox>
            <SectionTitle>내 모임에서 진행 중인 함께구매</SectionTitle>
            <HorizontalContainer>
              {ClubBuyingData.map((product) => (
                <ClubBuyingCard key={product.id} {...product} />
              ))}
            </HorizontalContainer>
            <br />
            <CustomDivider color="#F0F0F0" width="100%" />
          </SectionBox>

          <SectionBox>
            <SectionTitle>모임별 맞춤 추천 상품</SectionTitle>
            <SubDiv>나의 모임과 관련된 추천 상품을 둘러보아요!</SubDiv>
            {RecommendData.map((product) => (
              <RecommendBox key={product.id} {...product} />
            ))}
            <br />
            <Button variant="text" sx={{color: "#909090"}}>
              새로고침
            </Button>
          </SectionBox>

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
        </MainDiv>
        <BottomTabBar currentPage="home"/>
      </DefaultContainer>
    </>
  );
};

export default Home;
