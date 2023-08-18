import React, { useState, useEffect, useRef } from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import ClubRankInfoBox from "../../components/club/ClubRankInfoBox";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";
import { styled } from "styled-components";
import { axiosInstance } from "../../utils/axiosInterceptor";
import { useNavigate, useLocation } from "react-router-dom";
import DownArrowGrey from "../../assets/icons/DownArrowGrey.png";
import classes from "./style/MyClubs.module.css";
import ClubProductNo from "../../components/club/ClubProductNo";
import HorizontalContainer from "../../components/shared/HorizontalContainer";
import ClubBuyingCard from "../../components/main/ClubBuyingCard";
import temperImage from "../../assets/temperImages/Group 436.png";
import SadFaceImage from "../../assets/faceImage/SadFaceImage.png";

const MyClubs = () => {
  const user = useRecoilValue(loginState);
  const location = useLocation();
  const navigate = useNavigate();
  // const { clubName, clubCode } = location.state || {};
  const [clubList_only_three, setClubList_only_three] = useState<any[]>([]);
  const [clubInfoList, setClubInfoList] = useState<any[]>([]);
  const [clubListThreeProducts, setClubListThreeProducts] = useState<any[]>([]);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const ContentDiv = styled.div`
    width: 100%;
    padding: 8% 8% 0 8%;
  `;
  const ClubSubTitle = styled.div`
    color: #a394ff;
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    padding-bottom: 10px;
  `;

  const handleNext = () => {
    navigate("/club/myClubs/all");
  };
  const handleGoNewClub = () => {
    navigate("/club/naming");
  };
  const handleGoJoinClub = () => {
    navigate("/club/join");
  };

  useEffect(() => {
    async function getMyClub() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}clubs/`
        );
        return response.data;
      } catch (error) {
        console.log("getMyClub inside :", error);
        return [];
      }
    }

    try {
      getMyClub().then((returnData) => {
        setClubInfoList(returnData);
        setClubList_only_three([...returnData].slice(0, 3));
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    async function getClubProductsAndAppendToState(id: number) {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}clubs/${id}/clubProducts`
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    try {
      if (clubList_only_three.length !== 0) {
        const promises = clubList_only_three.map((club) =>
          getClubProductsAndAppendToState(club.id)
        );

        Promise.all(promises).then((responses) => {
          const combinedData = responses.flat(); // Flatten the arrays of responses
          setClubListThreeProducts((prev) => [...prev, ...combinedData]);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [clubList_only_three]);
  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <ContentDiv>
          <ClubSubTitle>나의 모임 리스트</ClubSubTitle>
          {clubList_only_three.map((clubInfo, index) => (
            <ClubRankInfoBox
              club_code={clubInfo.code}
              club_name={clubInfo.name}
              member_count={0}
              club_rank={clubInfo.level}
              club_keywords={clubInfo.tag}
              club_id={clubInfo.id}
              key_string={`index_${index}`}
              key={index}
              isClick={true}
            />
          ))}
          {clubInfoList.length >= 3 && (
            <div className={classes["see-more-div"]} onClick={handleNext}>
              <div className={classes["see-more-text-div"]}>더보기</div>
              <img
                className={classes["see-more-icon-img"]}
                src={DownArrowGrey}
                alt="DownArrowGrey"
              />
            </div>
          )}
          {clubInfoList.length === 0 && (
            <>
              <img
                className={classes["sad-head-img"]}
                src={SadFaceImage}
                alt="SadFaceImage"
              />
              <div className={classes["no-product-text-div"]}>
                <span className={classes["no-product-span"]}>
                  아직 가입한 모임이 없어요
                </span>
                <span className={classes["no-product-span"]}>
                  아래 버튼에서 모임을 만들고 가입해 볼까요?
                </span>
              </div>
            </>
          )}
          <div className={classes["just-for-margin"]}></div>
          <div className={classes["club-products-container"]}>
            <div className={classes["club-products-title-div"]}>
              <div className={classes["club-products-title"]}>
                현재 모임에서 진행중인 함께구매
              </div>
              <div className={classes["club-products-sub-title"]}>
                현재 모임의 함께 구매 상품을 한눈에 보아요!
              </div>
            </div>
            {clubListThreeProducts.length !== 0 ? (
              <HorizontalContainer>
                {clubListThreeProducts.map((product) => {
                  // 여기에 썸네일 넣어야함
                  return (
                    <ClubBuyingCard
                      id={product.id}
                      key={product.id}
                      end_at={product.product.end_at}
                      name={product.product.name}
                      thumbnail={product.product.thumbnail}
                      discountRate={product.discount_rate}
                      price={product.product.price}
                      score={product.achievement_rate}
                      participantsNum={product.participant_count}
                      participants={product.seller}
                    />
                  );
                })}
              </HorizontalContainer>
            ) : (
              <ClubProductNo />
            )}
          </div>
          <div className={classes["club-make-join-btn-div"]}>
            <button
              onClick={handleGoJoinClub}
              className={classes["club-make-join-btn"]}
            >
              새 모임 참여하기
            </button>
            <button
              onClick={handleGoNewClub}
              className={classes["club-make-join-btn"]}
            >
              새 모임 등록하기
            </button>
          </div>
          <div className={classes["bottom-margin"]}></div>
        </ContentDiv>
        <BottomTabBar currentPage="club" />
      </DefaultContainer>
    </>
  );
};

export default MyClubs;
