import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import QuestionMark from "../../assets/icons/QuestionMark.png";
import ParticipateCodeInput from "../../components/club/ParticipateCodeInput";
import xIcon from "../../assets/icons/xIcon.png";
import NaverBandIcon from "../../assets/icons/NaverBandIcon.png";
import KaKaoIcon from "../../assets/icons/KaKaoSquareIcon.png";
import { axiosInstance } from "../../utils/axiosInterceptor";

import classes from "./style/MakeClubRegister.module.css";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.title.md};
  margin: 50px 0;
`;
const FieldTitle = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.md};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
`;
const myComponentStyle = {
  margin: "20px 0 30px 0",
};

const MakeClubRegister = () => {
  const [participateCodeNum, setParticipateCodeNum] = useState("3333");
  const [isClickDesc, setIsClickDesc] = useState(false);
  const [isClickShare, setIsClickShare] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { clubName, clubCode } = location.state || {};

  const handleisClickDesc = (event: React.MouseEvent) => {
    setIsClickDesc((pre) => !pre);
  };

  const handleCopyBtn = () => {
    navigator.clipboard.writeText(participateCodeNum).then(() => {
      alert(`Copied: ${participateCodeNum}`);
    });
  };
  const handleShareBtn = () => {
    setIsClickDesc(false);
    setIsClickShare((prev) => !prev);
  };
  const handleKaKaoBtn = () => {};
  const handleBandBtn = () => {};
  const handleLinkCopyBtn = () => {};

  const getClubCodeFunc = async () => {
    const url = ``;
    const response = await axiosInstance.get(url);
  };

  // 참여코드 가져오는 코드 여기에 함수로 작성해야함
  useEffect(() => {
    console.log(clubName, clubCode);
    setParticipateCodeNum(clubCode);
  }, [clubCode]);

  const handleNext = () => {};

  return (
    <ClubStartBase>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {isClickShare && (
          <div className={classes["share-pop-up-outer-div"]}>
            <div className={classes["share-pop-up-title"]}>
              <img
                src={xIcon}
                alt="xIcon"
                className={classes["share-pop-up-x-icon"]}
                onClick={handleShareBtn}
              />
              공유하기
            </div>
            <div className={classes["sns-wrapper-div"]}>
              <div
                className={classes["sns-wrapper-outer-div "]}
                onClick={handleKaKaoBtn}
              >
                <div className={classes["sns-wrapper-inner-div"]}>
                  <img
                    src={KaKaoIcon}
                    alt="KaKaoIcon"
                    className={classes["sns-icon-img"]}
                  />
                </div>
                <span className={classes["sns-icon-text"]}>카카오톡</span>
              </div>
              <div
                className={classes["sns-wrapper-outer-div "]}
                onClick={handleBandBtn}
              >
                <div className={classes["sns-wrapper-inner-div"]}>
                  <img
                    src={NaverBandIcon}
                    alt="NaverBandIcon"
                    className={classes["sns-icon-img"]}
                  />
                </div>
                <span className={classes["sns-icon-text"]}>밴드</span>
              </div>
            </div>
            <div className={classes["share-pop-up-link-div"]}>
              <span className={classes["share-pop-up-link-span"]}></span>
              <button
                className={classes["share-pop-up-link-btn"]}
                onClick={handleLinkCopyBtn}
              >
                링크복사
              </button>
            </div>
          </div>
        )}
        <div className={classes["sub-title"]}>모임 등록 완료!</div>
        <div className={classes["club-title"]}>{clubName}</div>
        <div className={classes["club-code-ment"]}>참여코드는</div>
        <div onClick={handleisClickDesc} className={classes["info-outer-div"]}>
          <img
            src={QuestionMark}
            alt="물음표-아이콘"
            className={classes["question-mark"]}
          />
          <div className={classes["info-inner-div"]}>참여코드가 뭐에요?</div>
        </div>
        {isClickDesc && (
          <div className={classes.bubble}>
            <span className={classes["bubble-span"]}>
              모임마다 고유한 참여코드가 있어요!
            </span>
            <span className={classes["bubble-span"]}>공유하기 버튼을 눌러</span>
            <span className={classes["bubble-span"]}>
              모임회원들을 초대하고 코드를 알려주면
            </span>
            <span className={classes["bubble-span"]}>
              모임회원들도 참여할 수 있어요!
            </span>
          </div>
        )}
        <ParticipateCodeInput
          clubCode={participateCodeNum}
          onClick={handleCopyBtn}
          style={myComponentStyle}
        />
        <button onClick={handleShareBtn} className={classes["share-btn"]}>
          공유하기
        </button>
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton disabled={false} onClick={handleNext}>
            모여 시작하기!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default MakeClubRegister;
