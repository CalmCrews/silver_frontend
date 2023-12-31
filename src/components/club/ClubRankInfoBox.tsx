import React, { useState, useReducer, useEffect } from "react";
import { styled, keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./ClubRankInfoBox.module.css";

import mountain_1 from "../../assets/clubRankImage/1_dong_mountain.png";
import mountain_2 from "../../assets/clubRankImage/2_cheonggye_mountain.png";
import mountain_3 from "../../assets/clubRankImage/3_seolak_mountain.png";
import mountain_4 from "../../assets/clubRankImage/4_jiri_mountain.png";
import mountain_5 from "../../assets/clubRankImage/5_halla_mountain.png";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const StyledDiv = styled.div`
  animation: ${fadeInAnimation} 0.5s ease-in-out;
`

interface MyComponentProps {
  club_name: string;
  member_count: number;
  club_rank: number;
  club_keywords: string[];
  key_string: string;
  club_id: number;
  isClick: boolean;
  club_code: number;
}
const Title = styled.div`
  color: #3a3a3a;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 15px;
`;
type ClubKeywords = {
  [key: string]: string;
};
const keywordData: ClubKeywords = {
  gathering: "친목/또래모임",
  daily: "일상",
  economic: "경제",
  biology: "동식물",
  culture: "문화/예술",
  study: "교육/공부",
  life: "생활정보",
  sports: "스포츠",
  religion: "종교",
  health: "건강",
  etc: "기타",
};

const ClubRankInfoBox: React.FC<MyComponentProps> = ({
  club_name,
  member_count,
  club_rank,
  club_keywords,
  key_string,
  club_id,
  isClick,
  club_code,
}) => {
  const [keywordList, setKeywordList] = useState<string[]>(club_keywords);
  const navigate = useNavigate();
  let clubMountainRank_korean;
  let clubMountainRank_image;

  const handleOnClick = () => {
    if (!isClick) {
      return;
    }
    return navigate(`/club/myClubs/detail/${club_id}`, {
      state: {
        clubName: club_name,
        member_count: member_count,
        club_rank: club_rank,
        club_keywords: club_keywords,
        key_string: key_string,
        club_id: club_id,
        club_code: club_code,
      },
    });
  };

  switch (club_rank) {
    case 0:
      clubMountainRank_korean = "멤버가 3인 이상부터 등급이 부여됩니다";
      clubMountainRank_image = mountain_1;
      break;
    case 1:
      clubMountainRank_korean = "동산";
      clubMountainRank_image = mountain_1;
      break;
    case 2:
      clubMountainRank_korean = "청계산";
      clubMountainRank_image = mountain_2;
      break;
    case 3:
      clubMountainRank_korean = "설악산";
      clubMountainRank_image = mountain_3;
      break;
    case 4:
      clubMountainRank_korean = "지리산";
      clubMountainRank_image = mountain_4;
      break;
    case 5:
      clubMountainRank_korean = "한라산";
      clubMountainRank_image = mountain_5;
      break;
  }
  useEffect(() => {
    setKeywordList((preList) => {
      return preList.map((keyword) => keywordData[`${keyword}`]);
    });
  }, []);

  return (
    <StyledDiv
      className={
        isClick
          ? classes["club-box"]
          : `${classes["club-box"]} ${classes["click-false"]}`
      }
      key={key_string}
      onClick={handleOnClick}
    >
      <Title>{club_name}</Title>
      <div className={classes["content-div"]}>
        <div className={classes["content-div-text-div"]}>
          <div>
            <span>현재 인원 : </span>
            <span>{member_count}</span>
          </div>
          <div>
            {club_rank !== 0
              ? `${clubMountainRank_korean} 등급`
              : clubMountainRank_korean}
          </div>
        </div>
        <img
          className={
            club_rank !== 0
              ? `${classes["mountain-image-img"]}`
              : `${classes["mountain-image-img"]} ${classes["is-club-less-than-three"]}`
          }
          src={clubMountainRank_image}
          alt="클럽 랭크 이미지"
        />
      </div>
      <div className={`${classes["keywords-div"]} scroll`}>
        {keywordList.map((keyword: string, index: number) => (
          <div className={classes["keyword-item-div"]} key={index}>
            {keyword}
          </div>
        ))}
      </div>
    </StyledDiv>
  );
};

export default ClubRankInfoBox;
