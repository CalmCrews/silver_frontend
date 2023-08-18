import React, { useEffect, useState } from "react";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInterceptor";

import DefaultContainer from "../../components/shared/DefaultContainer";
import SimpleAppBar from "../../components/shared/SimpleAppBar";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { fontSizeState } from "../../states/userInfo";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ColoredDiv = styled.div`
  color: #a394ff;
  font-size: 24px;
  font-weight: 600;
  margin: 55px 0 10px 0;
  line-height: normal;
`;

const BlackDiv = styled.div`
  color: #3a3a3a;
  font-size: 16px;
`;

const ShowingDiv = styled.div`
  width: 350px;
  height: 100px;
  border-radius: 15px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin: 45px 0;
`;

const SelectContainer = styled.div`
  width: 100%;
  padding: 0 32px;
`;

const StyledButton = styled(Button)({
  "&.MuiButton-root": {
    width: "100%",
    fontSize: "20px",
    fontWeight: "700",
    color: "#3a3a3a",
    marginBottom: "18px",
    border: "2px solid #a394ff",
  },
  "&.MuiButton-root:hover": {
    border: "2px solid #a394ff",
    backgroundColor: "#EBE4FF",
  },
  "&.MuiButton-contained": {
    width: "100%",
    fontSize: "20px",
    fontWeight: "600",
    color: "#3a3a3a",
    marginBottom: "18px",
    border: "2px solid #a394ff",
    backgroundColor: "#EBE4FF",
  },
});

const ButtonContainer = styled.div`
  width: 100%;
  padding: 70px 45px;
`;

const EndButton = styled.button`
  width: 100%;
  height: 60px;
  border-radius: 30px;
  border: none;
  font-size: 24px;
  color: #fff;
  background-color: #a394ff;
  cursor: pointer;
`;

const FontSetting = () => {
  const [login, setLogin] = useRecoilState(loginState);
  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);
  const [selectedButton, setSelectedButton] = React.useState("");
  const [userNickname, setUserNickname] = useState("");
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const changeFontSize = (size: string) => {
    setBodyFontSize(size);
    setSelectedButton(size);
  };

  useEffect(() => {
    async function getUserNikckname() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}users/userinfo`
        );
        return response.data;
      } catch (error) {
        console.log("getUserNikckname inside :", error);
        return { nickname: "" };
      }
    }
    getUserNikckname().then((returnData) => {
      // console.log(returnData.nickname);
      setUserNickname(returnData.nickname);
    });
  }, []);

  const handleGoNext = () => {
    if (userNickname === "" || !userNickname) {
      return navigate("/club/start");
    }
    return window.history.back(); // 이전 페이지로 이동
  };

  return (
    <DefaultContainer>
      <SimpleAppBar />
      <Container>
        <ColoredDiv>
          나에게 맞는 글자 크기를
          <br />
          선택해볼까요?
        </ColoredDiv>
        <BlackDiv>내정보에서 변경 가능해요</BlackDiv>
        <ShowingDiv>이 크기로 글자를 볼 수 있어요</ShowingDiv>
        <SelectContainer>
          <StyledButton
            variant={selectedButton === "20px" ? "contained" : "outlined"}
            onClick={() => changeFontSize("20px")}
          >
            크게
          </StyledButton>
          <StyledButton
            variant={selectedButton === "18px" ? "contained" : "outlined"}
            onClick={() => changeFontSize("18px")}
          >
            중간
          </StyledButton>
          <StyledButton
            variant={selectedButton === "16px" ? "contained" : "outlined"}
            onClick={() => changeFontSize("16px")}
          >
            작게
          </StyledButton>
        </SelectContainer>
        <ButtonContainer>
          <EndButton onClick={handleGoNext}>다 했어요!</EndButton>
        </ButtonContainer>
      </Container>
    </DefaultContainer>
  );
};

export default FontSetting;
