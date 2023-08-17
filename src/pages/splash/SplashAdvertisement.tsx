import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import FristImage from "../../assets/splash/FirstImage.png";
import SecondImage from "../../assets/splash/SecondImage.png";
import ThirdImage from "../../assets/splash/ThirdImage.png";

import SimpleAppBar from "../../components/shared/SimpleAppBar";

import classes from "./SplashAdvertisement.module.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`;

const explainMentList_first = [
  "저렴한 걸 더 저렴하게 살 수 있는 방법!",
  "모여에서 모임을 등록하고",
  "이젠 고민하지 말고",
];
const explainMentList_second = [
  "살 수 있는 방법!",
  '친구들과 "함께구매"해요!',
  "모여로 모여!",
];
const btnTextList = ["다음", "다음", "시작할래요!"];

const SplashAdvertisement = () => {
  const navigate = useNavigate();
  const [pageNum, setPageNum] = useState(0);

  const handleGoNextPage = () => {
    setPageNum((preNum) => pageNum + 1);
    if (pageNum === 2) {
      return navigate("/");
    }
  };

  return (
    <Container>
      <SimpleAppBar />
      {pageNum === 0 && (
        <img
          className={classes["first-image"]}
          src={FristImage}
          alt="FristImage"
        />
      )}
      {pageNum === 1 && (
        <img
          className={classes["second-image"]}
          src={SecondImage}
          alt="SecondImage"
        />
      )}
      {pageNum === 2 && (
        <img
          className={classes["third-image"]}
          src={ThirdImage}
          alt="ThirdImage"
        />
      )}
      <button className={classes["splash-btn"]} onClick={handleGoNextPage}>
        {btnTextList[pageNum]}
      </button>
    </Container>
  );
};

export default SplashAdvertisement;
