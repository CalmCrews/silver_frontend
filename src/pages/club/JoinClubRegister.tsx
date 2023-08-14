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

import classes from "./style/MakeClubRegister.module.css";
import InputClasses from "../../components/club/ParticipateCodeInput.module.css";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.title.md};
  margin: 50px 0;
  text-align: center;
`;
const FieldTitle = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.md};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
  text-align: center;
  padding-bottom: 20px;
`;

const JoinClubRegister = () => {
  const [participateCodeNum, setParticipateCodeNum] = useState("");
  const [isClickDesc, setIsClickDesc] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { clubName } = location.state || {};

  const handleisClickDesc = (event: React.MouseEvent) => {
    setIsClickDesc((pre) => !pre);
  };

  const handleParticipateCodeNum = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setParticipateCodeNum(event.target.value);
  };

  const handleNext = () => {
    // 모임등록 코드 구현해야 함

    // 등록한 이후 해당 모임 정보를 다음으로 보내줘야 한다
    navigate("/club/join/profile", {
      state: {
        clubName: "",
        description: "",
      },
    });
  };

  return (
    <ClubStartBase>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Title>모임 참여</Title>
        <FieldTitle>
          기존 모임에 참여하시려면
          <br />
          참여코드를 입력해주세요
        </FieldTitle>

        <div className={InputClasses["outer-code-box"]}>
          <div className={InputClasses["inner-code-desc"]}>참여코드</div>
          <input
            className={InputClasses["inner-code-number-input"]}
            onChange={handleParticipateCodeNum}
            value={participateCodeNum}
          />
        </div>

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
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton
            disabled={participateCodeNum.trim().length === 0}
            onClick={handleNext}
          >
            모여 시작하기!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default JoinClubRegister;
