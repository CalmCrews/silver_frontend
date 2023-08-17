import React, { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import classes from "./ClubIsJoinedPopup.module.css";

interface PopupProps {
  isLogedIn: boolean;
  club_name: string;
}

const ClubIsJoinedPopup: React.FC<PopupProps> = ({ isLogedIn, club_name }) => {
  const [clubCode, setClubCode] = useState("");
  const [joinClubAnswer, setJoinClubAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useRecoilValue(loginState);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  const handleOnChange = () => {
    setJoinClubAnswer(false);
    if (inputRef.current && inputRef.current.value.length < 5) {
      setClubCode(inputRef.current.value);
    }
  };
  const clubJoinFunc = async () => {
    try {
      const response = await newAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}clubs/join/`,
        {
          club_code: `${clubCode}`,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      setJoinClubAnswer(true);
      console.log("clubJoinFunc inside :", error);
      return {};
    }
  };

  const handleOnClickFinishBtn = () => {
    if (clubCode.trim() === "") {
      return;
    }
    try {
      clubJoinFunc().then();
    } catch (error) {
      console.log("clubJoinFunc run error :", error);
    }
  };
  return (
    <div className={classes["popup-outer-div"]}>
      <div className={classes["popup-title-div"]}>
        <span>{`"${club_name}"`}</span>
        <span>모임에 초대되셨나요?</span>
        <span>
          {isLogedIn
            ? "참여코드를 입력해주세요!"
            : "로그인 후 모임에 참여해보세요!"}
        </span>
      </div>
      {isLogedIn ? (
        <>
          <div className={classes["input-outer-div"]}>
            <input
              className={classes["code-input"]}
              type="text"
              value={clubCode}
              ref={inputRef}
              onChange={handleOnChange}
            />
            <span className={classes["code-parti-text"]}>참여코드</span>
          </div>
          {joinClubAnswer && (
            <div className={classes["wrong-code"]}>잘못된 참여코드입니다</div>
          )}
          <button
            className={classes["button-div"]}
            onClick={handleOnClickFinishBtn}
          >
            입력완료
          </button>
        </>
      ) : (
        <button className={classes["popup-login-btn"]}>로그인 하러가기</button>
      )}
    </div>
  );
};

export default ClubIsJoinedPopup;
