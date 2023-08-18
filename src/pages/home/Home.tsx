import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";
import { useCookies } from "react-cookie";
import { fontSizeState } from "../../states/userInfo";
import { styled } from "styled-components";
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
} from "@mui/material";
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
import EmptyDataImg from "../../assets/Images/Empty_Data.png";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
`;

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

interface RecommendDataItem {
  category: string;
  end_at: string;
  id: number;
  name: string;
  price: number;
  seller: string;
  thumbnail: string | null;
  review_score: number | null;
}

const Home = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const user = useRecoilValue(loginState);

  const handleLogout = () => {
    setLogin({ isLoggedIn: false, userId: "", accessToken: "" });
    removeCookie("refreshToken");
  };
  //내가 참여중인 데이터
  const [myBuyingData, setMyBuyingData] = useState<any | null>(null);

  //모임에서 참여중인 데이터
  const [clubBuyingData, setClubBuyingData] = useState<any | null>(null);

  //추천 데이터
  const [selectedClub, setSelectedClub] = React.useState("");
  const [selectedClubId, setSelectedClubId] = React.useState(0);
  const [clubListData, setClubListData] = useState<any | null>(null);
  const [recommendData, setRecommendData] = useState<any | null>(null);

  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const getMyBuyingData = async () => {
    try {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}clubs/userClubProducts/`
      );
      console.log(response.data);
      setMyBuyingData(response.data);
    } catch (error) {
      setMyBuyingData(null);
      console.error("Error: ", error);
    }
  };

  const getClubBuyingData = async () => {
    try {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}clubs/allClubProducts/`
      );
      //console.log(response.data);
      setClubBuyingData(response.data);
    } catch (error) {
      setClubBuyingData(null);
      console.error("Error: ", error);
    }
  };

  const getRecommendData = async () => {
    try {
      if (selectedClubId === 0) {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}products/recommand/`
        );
        //console.log(response.data);
        setClubListData(response.data.clubs);
        //console.log(response.data.product);
        setRecommendData(response.data.product);
      } else {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}products/recommand/?clubs=${selectedClubId}`
        );
        //console.log(response.data);
        setClubListData(response.data.clubs);
        //console.log(response.data.product);
        setRecommendData(response.data.product);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getMyBuyingData();
    getClubBuyingData();
    getRecommendData();
  }, []);

  useEffect(() => {
    getRecommendData();
  }, [selectedClubId]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedName = event.target.value as string;
    const club = clubListData.find(
      (item: { id: number; name: string }) => item.name === selectedName
    );
    const selectedId = club ? club.id : 0;
    setSelectedClub(selectedName);
    setSelectedClubId(selectedId);
  };

  const handleRefresh = () => {
    getRecommendData();
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
            {myBuyingData === null || myBuyingData.length === 0 ? (
              <>
                <img src={EmptyDataImg} alt="empty_data_image" width="110px" />
                <EmptyDiv>
                  아직 참여 중인 함께구매 상품이 없어요
                  <br />
                  상품을 구경해 볼까요?
                </EmptyDiv>
              </>
            ) : (
              myBuyingData &&
              myBuyingData.map((item: any, index: number) => (
                <MyBuyingCard
                  key={index}
                  id={item.id}
                  end_at={item.product.end_at}
                  name={item.product.name}
                  thumbnail={item.product.thumbnail}
                  accomplished={item.product.achievement_rate}
                  participantsNum={item.participants.length}
                  participants={item.participants}
                />
              ))
            )}
            <br />
            <CustomDivider color="#F0F0F0" width="100%" />
          </SectionBox>

          <SectionBox>
            <SectionTitle>내 모임에서 진행 중인 함께구매</SectionTitle>
            <HorizontalContainer>
              {clubBuyingData &&
                clubBuyingData.map((item: any, index: number) => (
                  <ClubBuyingCard
                    key={index}
                    id={item.id}
                    end_at={item.product.end_at}
                    name={item.product.name}
                    thumbnail={item.product.thumbnail}
                    discountRate={item.product.discount_rate}
                    price={item.product.price}
                    score={0}
                    participantsNum={item.participants.length}
                    participants={item.participants}
                  />
                ))}
            </HorizontalContainer>
            <br />
            <CustomDivider color="#F0F0F0" width="100%" />
          </SectionBox>

          <SectionBox>
            <SectionTitle>모임별 맞춤 추천 상품</SectionTitle>
            <SubDiv>나의 모임과 관련된 추천 상품을 둘러보아요!</SubDiv>
            <div style={{ width: "100%", padding: "10px 20px" }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel htmlFor="club-select">
                  모임을 선택해주세요
                </InputLabel>
                <Select
                  id="club-select"
                  value={selectedClub}
                  onChange={handleChange}
                  sx={{
                    "&.MuiInputBase-root": {
                      width: "100%",
                      borderRadius: "100px",
                      border: "2px solid #a394ff",
                    },
                  }}
                >
                  {clubListData &&
                    clubListData.map(
                      (item: { id: number; name: string }, index: number) => (
                        <MenuItem key={index} value={item.name}>
                          {item.name}
                        </MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </div>

            {recommendData &&
              recommendData.map((product: RecommendDataItem, index: number) => (
                <RecommendBox
                  key={index}
                  id={product.id}
                  name={product.name}
                  thumbnail={product.thumbnail || ""}
                  price={product.price}
                  score={0}
                />
              ))}
            <br />
            <Button
              variant="text"
              sx={{ color: "#909090" }}
              onClick={handleRefresh}
            >
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
        <BottomTabBar currentPage="home" />
      </DefaultContainer>
    </>
  );
};

export default Home;
