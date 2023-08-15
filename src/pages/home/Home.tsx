import React, { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
]


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
]

const MainDiv = styled.div`
  width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`
const SectionBox = styled.div`
  width: 100%;
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SectionTitle = styled.h2`
  width: 100%;
  margin: 17px 0;
  padding: 10px;
  color: #A394FF;
  font-size: 1.5rem;
  font-weight: 700;
`
interface FormData {
  name: string;
  intro: string;
}

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: "", accessToken: "" });
    removeCookie("refreshToken");
  };



  const [formData, setFormData] = useState<FormData>({
    name: '',
    intro: ''
  });


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}clubs/`;
      const response = await axiosInstance.post(apiUrl, formData);
      console.log('POST 요청 성공:', response.data);
    } catch (error) {
      console.error('POST 요청 실패:', error);
    }
  };

  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer/>
        <MainDiv>
          <MainCarousel/>
          <SectionBox>
            <SectionTitle>내가 참여 중인 함께구매</SectionTitle>
            {MyBuyingData.map(product => (
              <MyBuyingCard key={product.id} {...product}/>
            ))}
            <br/>
            <CustomDivider color="#F0F0F0" width="100%"/>
          </SectionBox>

          <SectionBox>
            <SectionTitle>내 모임에서 진행 중인 함께구매</SectionTitle>
            <HorizontalContainer>
              {ClubBuyingData.map(product => (
                <ClubBuyingCard key={product.id} {...product}/>
              ))}
            </HorizontalContainer>
            <br/>
            <CustomDivider color="#F0F0F0" width="100%"/>
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
