import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const [popupIsClicked, setPopupIsClicked] = useState(false);
  const [isJoinded, setIsJoinded] = useState(false);
  const [participants, setParticipants] = useState<
    { id: number; nickname: string; profile_image: string }[]
  >([]);
  const [userNickname, setUserNickname] = useState("");
  const [clubListProducts, setClubListProducts] = useState<any[]>([]);
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
  const {
    clubName,
    member_count,
    club_rank,
    club_keywords,
    key_string,
    club_id,
    club_code,
  } = location.state || ({} as LocationState);

  const handlePopupSeeBtn = () => {
    setPopupIsClicked(true);
  };
  const handlePopupClose = () => {
    setPopupIsClicked(false);
  };
  const handleProductMapBtn = () => {
    return navigate("/club/clubMap", { state: { club_rank: club_rank } });
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
        const joinedClubList = response.data.map(
          (item: { id: number }) => item.id
        );
        setIsJoinded(joinedClubList.includes(club_id));
      } catch (error) {
        console.log("function inside error :", error);
      }
    }
    try {
      isJoinedClub();
    } catch (error) {
      console.log("error :", error);
    }
    //   try {
    //     const response = await newAxiosInstance.post(
    //       `${process.env.REACT_APP_API_URL}clubs/join/`,
    //       {
    //         club_code: String(id),
    //       }
    //     );
    //     // 로그인 상태 양호 및 가입 성공!

    //     response.status
    //   } catch (error) {
    //     if (axios.isAxiosError(error)) {
    //       const axiosError = error as AxiosError;
    //       const responseData = axiosError.response; // API 응답 데이터

    //       if (responseData && responseData.status) {
    //         const errorMessage = responseData.status;
    //         console.log("Error Message:", errorMessage);
    //       } else {
    //         console.log("Error with no response data or message");
    //       }
    //     }
    //   }
    // }
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
          `${process.env.REACT_APP_API_URL}clubs/${club_id}`
        );
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
  }, [user.isLoggedIn]);
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
      getClubProductsAndAppendToState(club_id)
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
        <div>
          <ClubSubTitle>모일까</ClubSubTitle>
          <ClubRankInfoBox
            club_code={club_code}
            club_name={clubName}
            member_count={member_count}
            club_rank={club_rank}
            club_keywords={club_keywords}
            key_string={key_string}
            club_id={club_id}
            isClick={false}
          />
        </div>
        <div className={classes["divide-line"]}></div>
        {!user.isLoggedIn ? (
          <ClubIsJoinedPopup isLogedIn={false} club_name={clubName} />
        ) : (
          <>
            {!isJoinded && (
              <ClubIsJoinedPopup isLogedIn={true} club_name={clubName} />
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
              </div>
            )}
            {isJoinded && (
              <div>
                <div className={classes["club-products-title"]}>
                  현재 모임에서 진행중인 함께구매
                </div>
                <div className={classes["club-products-sub-title"]}>
                  현재 모임의 함께 구매 상품을 한눈에 보아요!
                </div>
                {clubListProducts.length === 0 ? (
                  <ClubProductNo />
                ) : (
                  <HorizontalContainer>
                    {clubListProducts.map((product) => {
                      // 여기에 썸네일 넣어야함
                      return (
                        <ClubBuyingCard
                          id={product.id}
                          key={product.id}
                          end_at={product.product.end_at}
                          name={product.product.end_at}
                          thumbnail={temperImage}
                          discountRate={product.discountRate}
                          price={product.product.price}
                          score={product.achievement_rate}
                          participantsNum={product.participant_count}
                          participants={product.seller}
                        />
                      );
                    })}
                  </HorizontalContainer>
                )}
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
