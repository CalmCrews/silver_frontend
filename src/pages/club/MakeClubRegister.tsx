import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import QuestionMark from "../../assets/icons/QuestionMark.png";
import ParticipateCodeInput from "../../components/club/ParticipateCodeInput";

import classes from "./MakeClubRegister.module.css";

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

const MakeClubRegister = () => {
  const [] = useState();
  const [isClickDesc, setIsClickDesc] = useState(false);
  const handleisClickDesc = (event: React.MouseEvent) => {
    setIsClickDesc((pre) => !pre);
  };

  const handleCopyBtn = () => {};
  const handleShareBtn = () => {};

  return (
    <ClubStartBase>
      <div>모임 등록 완료!</div>
      <div>{}</div>
      <div>참여코드는</div>
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
      <ParticipateCodeInput clubCode={""} onClick={handleCopyBtn} />
      <button onClick={handleShareBtn}>공유하기</button>
      <button>모여 시작하기!</button>
    </ClubStartBase>
  );
};

export default MakeClubRegister;
