import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormButton from "../shared/FormButton";
import classes from "./RegisterClubPurpose.module.css";
import QuestionMark from "../../assets/icons/QuestionMark.png";

const RegisterClubPurpose = () => {
  const [isCliced, setIsClicked] = useState(0);
  const [isClickDesc, setIsClickDesc] = useState(false);
  const navigate = useNavigate();

  const handleIsClicked_register = (event: React.MouseEvent) => {
    if (isCliced === 1) {
      return setIsClicked(0);
    }
    return setIsClicked(1);
  };
  const handleIsClicked_participate = (event: React.MouseEvent) => {
    if (isCliced === 2) {
      return setIsClicked(0);
    }
    return setIsClicked(2);
  };

  const handleisClickDesc = (event: React.MouseEvent) => {
    setIsClickDesc((pre) => !pre);
  };

  const handleNext = () => {
    if (isCliced === 1) {
      return navigate("/club/naming");
    }
    if (isCliced === 2) {
      return navigate("/club/naming");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className={classes["sub-title-div"]}>하나를 선택해주세요!</div>
      <div className={classes["select-outer-div"]}>
        <div
          onClick={handleIsClicked_register}
          className={
            isCliced === 1
              ? `${classes["select-inner-div"]} ${classes["clicked"]}`
              : `${classes["select-inner-div"]}`
          }
        >
          모임 등록
        </div>
        <div
          onClick={handleIsClicked_participate}
          className={
            isCliced === 2
              ? `${classes["select-inner-div"]} ${classes["clicked"]}`
              : `${classes["select-inner-div"]}`
          }
        >
          모임 참여
        </div>
      </div>
      <div onClick={handleisClickDesc} className={classes["info-outer-div"]}>
        <img
          src={QuestionMark}
          alt="물음표-아이콘"
          className={classes["question-mark"]}
        />
        <div className={classes["info-inner-div"]}>설명이 필요해요!</div>
      </div>
      {isClickDesc && (
        <div className={classes.bubble}>
          <span className={classes["bubble-span"]}>
            모임을 등록하고 나면 사람들을
          </span>
          <span className={classes["bubble-span"]}>초대할 수 있어요!</span>
          <span className={classes["bubble-span"]}>
            모임 참여를 누르면 등록된 모임에
          </span>
          <span className={classes["bubble-span"]}>들어갈 수 있어요!</span>
        </div>
      )}
      <div style={{ width: "100%", position: "absolute", bottom: "88px" }}>
        <FormButton disabled={isCliced === 0} onClick={handleNext}>
          다 했어요!
        </FormButton>
      </div>
    </div>
  );
};

export default RegisterClubPurpose;
