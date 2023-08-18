import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import ClubRankInfoBox from "../../components/club/ClubRankInfoBox";
import { styled } from "styled-components";
import axios, { AxiosError } from "axios";
import { loginState } from "../../states/userInfo";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import ClubIsJoinedPopup from "../../components/club/ClubIsJoinedPopup";
import { axiosInstance } from "../../utils/axiosInterceptor";
import classes from "./style/ClubDetail.module.css";
import rightArrow from "../../assets/icons/RightArrowPurple.png";
import * as style from "../../components/main/MyBuyingCardComponents";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import PlusIcon from "../../assets/icons/PulsNoBackground.png";
import ClubProductNo from "../../components/club/ClubProductNo";
import HorizontalContainer from "../../components/shared/HorizontalContainer";
import ClubBuyingCard from "../../components/main/ClubBuyingCard";
import temperImage from "../../assets/temperImages/Group 436.png";
import ClubJoinMemberPopup from "../../components/club/ClubJoinMemberPopup";

type LocationState = {
  clubName: string;
  member_count: number;
  club_rank: number;
  club_keywords: string[];
  key_string: string;
  club_id: number;
  club_code: number;
};
type ClubInfoObject = {
  clubName: string;
  member_count: number;
  club_rank: number;
  club_keywords: string[];
  key_string: string;
  club_id: number;
  club_code: number;
};

const ClubSubTitle = styled.div`
  color: #a394ff;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  padding-bottom: 10px;
  text-align: center;
  margin: 30px 0 10px 0;
`;
const ContentDiv = styled.div`
  width: 100%;
  padding: 8% 8% 0 8%;
`;
const fixedParticipants = [
  {
    name: "코알1",
    profile_image: "",
  },
  {
    name: "코알2",
    profile_image: "",
  },
  {
    name: "코알3",
    profile_image: "",
  },
];
const ClubDetail = () => {
  const { id } = useParams();
  const [popupIsClicked, setPopupIsClicked] = useState(false);
  const [isJoinded, setIsJoinded] = useState(false);
  const [participants, setParticipants] = useState<
    { id: number; nickname: string; profile_image: string }[]
  >([]);
  const [clubInfo, setClubInfo] = useState<ClubInfoObject>({
    clubName: "",
    member_count: 0,
    club_rank: 0,
    club_keywords: [],
    key_string: "",
    club_id: 0,
    club_code: 0,
  });
  const [userNickname, setUserNickname] = useState("");
  const [clubListProducts, setClubListProducts] = useState<any>([]);
  const [login, setLogin] = useRecoilState(loginState);
  const location = useLocation();
  const navigate = useNavigate();
  const [] = useState("");
  const user = useRecoilValue(loginState);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  const handlePopupSeeBtn = () => {
    setPopupIsClicked(true);
  };
  const handlePopupClose = () => {
    setPopupIsClicked(false);
  };
  const handleProductMapBtn = () => {
    return navigate("/club/clubMap", {
      state: { club_rank: clubInfo.club_rank },
    });
  };

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }
    async function isJoinedClub() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}clubs/`
        );
        return response.data.map((item: { id: number }) => item.id);
      } catch (error) {
        console.log("function inside error :", error);
      }
    }
    try {
      isJoinedClub().then((returnData) => {
        setIsJoinded(returnData.includes(Number(id)));
      });
    } catch (error) {
      console.log("error :", error);
    }
  }, [login]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }
    async function userDetailInfo() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}users/${user.user_id}/charge`
        );
        setUserNickname(response.data.nickname);
      } catch (error) {
        console.log("function inside error :", error);
      }
    }
    async function thisClubDetailInfo() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}clubs/${id}`
        );
        console.log("response.data :", response.data);
        setClubInfo({
          clubName: response.data.club.name,
          member_count: response.data.club.number_of_members,
          club_rank: response.data.club.level,
          club_keywords: response.data.club.tag,
          key_string: Math.random().toString(),
          club_id: response.data.club.id,
          club_code: response.data.club.code,
        });
        setParticipants(response.data.club.members);
      } catch (error) {
        console.log("function inside error :", error);
      }
    }
    try {
      userDetailInfo();
      thisClubDetailInfo();
    } catch (error) {
      console.log("error :", error);
    }
  }, [user.isLoggedIn, id]);
  useEffect(() => {
    async function getClubProductsAndAppendToState(id: number) {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}clubs/${id}/clubProducts`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    try {
      // const productList = getClubProductsAndAppendToState(club_id)
      // setClubListProducts(productList)
      getClubProductsAndAppendToState(Number(id))
        .then((productList) => {
          setClubListProducts(productList);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <div className={classes["div-outside"]}>
          <ClubSubTitle>모일까</ClubSubTitle>
          {clubInfo.clubName !== "" && (
            <ClubRankInfoBox
              club_code={clubInfo.club_code}
              club_name={clubInfo.clubName}
              member_count={clubInfo.member_count}
              club_rank={clubInfo.club_rank}
              club_keywords={clubInfo.club_keywords}
              key_string={clubInfo.key_string}
              club_id={clubInfo.club_id}
              isClick={false}
            />
          )}
        </div>
        <div className={classes["divide-line"]}></div>
        {user.isLoggedIn === false ? (
          <ClubIsJoinedPopup isLogedIn={false} club_name={clubInfo.clubName} />
        ) : (
          <>
            {!isJoinded && (
              <ClubIsJoinedPopup
                isLogedIn={true}
                club_name={clubInfo.clubName}
              />
            )}
            {isJoinded && (
              <div className={classes["club-info-contianer"]}>
                {popupIsClicked && (
                  <ClubJoinMemberPopup
                    members={participants}
                    onClick={handlePopupClose}
                  />
                )}
                <div className={classes["club-info-box-1"]}>
                  <div className={classes["my-activity-profile-div"]}>
                    <style.RargeNoneProfile index={1}>
                      <Person2RoundedIcon
                        sx={{
                          color: "#fff",
                          width: "45px",
                        }}
                      />
                    </style.RargeNoneProfile>
                  </div>
                  <div>
                    <span className={classes["nickname-span"]}>
                      나의 활동 별명:
                    </span>
                    <span className={classes["nickname-span-real"]}>
                      {userNickname}
                    </span>
                  </div>
                </div>
                <div
                  className={classes["club-info-box-2"]}
                  onClick={handleProductMapBtn}
                >
                  <span className={classes["nickname-span"]}>
                    모임등급 현황 이미지로 보기
                  </span>
                  <img
                    className={classes["arrow-right-img"]}
                    src={rightArrow}
                    alt="rightArrow"
                  />
                </div>
                <div className={classes["club-info-box-3"]}>
                  <div className={classes["nickname-span"]}>전체 모인멤버</div>
                  <div className={classes["last-outer-box"]}>
                    {participants.length > 3
                      ? participants.map((participant, index) =>
                          participant.profile_image &&
                          participant.profile_image !== "null" ? (
                            <style.RargeProfile
                              src={participant.profile_image}
                              alt={participant.profile_image}
                              index={index}
                            />
                          ) : (
                            <style.RargeNoneProfile index={index}>
                              <Person2RoundedIcon
                                sx={{
                                  color: "#fff",
                                  width: "45px",
                                }}
                              />
                            </style.RargeNoneProfile>
                          )
                        )
                      : fixedParticipants.map((participant, index) => (
                          <style.RargeNoneProfile index={index}>
                            <Person2RoundedIcon
                              sx={{
                                color: "#fff",
                                width: "45px",
                              }}
                            />
                          </style.RargeNoneProfile>
                        ))}
                    <div className={classes["human-div"]}>
                      <img
                        className={classes["plus-icon"]}
                        src={PlusIcon}
                        alt="PlusIcon"
                      />
                      <span className={classes["human"]}>
                        {participants.length} 명
                      </span>
                    </div>
                    <div
                      className={classes["see-more-member-div"]}
                      onClick={handlePopupSeeBtn}
                    >
                      <span className={classes["see-more-member-text"]}>
                        멤버 더보기
                      </span>
                      <img
                        className={classes["arrow-right-img"]}
                        src={rightArrow}
                        alt="rightArrow"
                      />
                    </div>
                  </div>
                </div>
                <div className={classes["divide-line-2"]}></div>
                <div className={classes["margin-div"]}>
                  <div className={classes["club-products-title"]}>
                    현재 모임에서 진행중인 함께구매
                  </div>
                  <div className={classes["club-products-sub-title"]}>
                    현재 모임의 함께 구매 상품을 한눈에 보아요!
                  </div>
                  {clubListProducts.length === 0 ? (
                    <ClubProductNo />
                  ) : (
                    <ContentDiv>
                      <HorizontalContainer>
                        {clubListProducts.map((product: any) => {
                          // 여기에 썸네일 넣어야함
                          return (
                            <ClubBuyingCard
                              id={product.id}
                              key={product.id}
                              end_at={product.product.end_at}
                              name={product.product.end_at}
                              thumbnail={product.product.thumbnail}
                              discountRate={product.discountRate}
                              price={product.product.price}
                              score={product.achievement_rate}
                              participantsNum={product.participant_count}
                              participants={product.seller}
                            />
                          );
                        })}
                      </HorizontalContainer>
                    </ContentDiv>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        <BottomTabBar currentPage="club" />
      </DefaultContainer>
    </>
  );
};

export default ClubDetail;
