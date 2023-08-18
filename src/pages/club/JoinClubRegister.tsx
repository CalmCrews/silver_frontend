import React, { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { atom, useRecoilState, useRecoilValue } from "recoil";

import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import QuestionMark from "../../assets/icons/QuestionMark.png";
import ParticipateCodeInput from "../../components/club/ParticipateCodeInput";
import xIcon from "../../assets/icons/xIcon.png";
import NaverBandIcon from "../../assets/icons/NaverBandIcon.png";
import KaKaoIcon from "../../assets/icons/KaKaoSquareIcon.png";
import { loginState } from "../../states/userInfo";

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
  const [userNickname, setUserNickname] = useState("");
  const [clubId, setClubId] = useState(0);
  const [participateCodeNum, setParticipateCodeNum] = useState("");
  const [joinClubAnswer, setJoinClubAnswer] = useState(false);
  const [isClickDesc, setIsClickDesc] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  // const { clubName } = location.state || {};

  const user = useRecoilValue(loginState);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const handleisClickDesc = (event: React.MouseEvent) => {
    setIsClickDesc((pre) => !pre);
  };

  const handleParticipateCodeNum = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJoinClubAnswer(false);
    setParticipateCodeNum(event.target.value);
  };
  const clubJoinFunc = async () => {
    try {
      const response = await newAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}clubs/join/`,
        {
          club_code: `${participateCodeNum}`,
        }
      );
      setJoinClubAnswer(false);
      return response.data;
    } catch (error) {
      setJoinClubAnswer(true);
      console.log("clubJoinFunc inside :", error);
      return {};
    }
  };

  const handleNext = () => {
    // 모임등록 코드 구현해야 함
    let club_id;
    let user_nickname;
    let isAleardyJoined;
    try {
      clubJoinFunc().then((returnData) => {
        club_id = returnData.club.id ? returnData.club.id : returnData.club;
        console.log(
          "returnData.club.id ? returnData.club.id : returnData.club",
          returnData.club.id ? returnData.club.id : returnData.club,
          club_id
        );
        if (returnData.message) {
          return navigate(`/club/myClubs/detail/${club_id}`, {
            state: {
              clubName: "",
              description: "",
            },
          });
        } else {
          isAleardyJoined = false;
          user_nickname = returnData.user ? returnData.user.nickname : "";
          setUserNickname(user_nickname);
          setClubId(club_id);

          if (user_nickname === "") {
            return navigate("/club/join/profile");
          }
          // 등록한 이후 해당 모임 정보를 다음으로 보내줘야 한다
          return navigate(`/club/myClubs/detail/${club_id}`);
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
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
        {joinClubAnswer && (
          <div className={classes["wrong-code"]}>잘못된 참여코드입니다</div>
        )}

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
