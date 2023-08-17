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

const MyClubsAll = () => {
  const getClubsBtn = useRef<HTMLButtonElement | null>(null);
  const user = useRecoilValue(loginState);
  const [clubInfoList, setClubInfoList] = useState<any[]>([]);
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
      });
    } catch (error) {
      console.log("getMyClub run :", error);
    }
  }, []);
  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <ContentDiv>
          <ClubSubTitle>나의 모임 리스트</ClubSubTitle>
          {clubInfoList.length !== 0 &&
            clubInfoList.map((clubInfo, index) => (
              <ClubRankInfoBox
                club_code={clubInfo.code}
                club_id={clubInfo.id}
                club_name={clubInfo.name}
                member_count={0}
                club_rank={clubInfo.level}
                club_keywords={clubInfo.tag}
                key_string={`index_${index}`}
                key={index}
                isClick={true}
              />
            ))}
        </ContentDiv>
        <BottomTabBar currentPage="club" />
      </DefaultContainer>
    </>
  );
};

export default MyClubsAll;
