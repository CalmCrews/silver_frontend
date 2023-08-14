import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  InputBase,
  FormHelperText,
  Typography,
} from "@mui/material";
import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import classes from "./style/MakeClubDes.module.css";

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

const MakeClubDes = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { clubName } = location.state || {};

  const handleOnChange = (event: React.ChangeEvent) => {
    const textareaText = textareaRef.current ? textareaRef.current.value : "";
    if (textareaText.length > 30) {
      return;
    }
    setText(textareaText);
  };

  const handleNext = () => {
    return navigate("/club/keywords", {
      state: { clubName: clubName, description: text },
    });
  };
  return (
    <ClubStartBase>
      <Title>모임 등록</Title>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <FieldTitle>어떤 모임인지 짧게 소개해주세요!</FieldTitle>
        <div className={classes["textarea-div"]}>
          <textarea
            className={classes.textarea}
            placeholder="여기에 입력해주세요"
            ref={textareaRef}
            onChange={handleOnChange}
            value={text}
          />
          <span className={classes["textarea-count"]}>{text.length}/30자</span>
        </div>
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton disabled={text.length === 0} onClick={handleNext}>
            다 했어요!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default MakeClubDes;
