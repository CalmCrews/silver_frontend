import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  InputBase,
  FormHelperText,
  Typography,
} from "@mui/material";
import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";

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
const StyledTextField = styled.div`
  display: flex;
  width: 100%;
  height: 3.75rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  align-items: center;
  padding: 0 15px;
`;
const StyledLabel = styled.label`
  width: 4.5rem;
  color: rgba(144, 144, 144, 1);
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  margin-right: 5px;
`;

const MakeClubNaming = () => {
  const [clubName, setClubName] = useState("");
  const navigate = useNavigate();

  const inutRef = useRef<HTMLInputElement | null>(null);
  const handleOnChangeClubName = (event: React.ChangeEvent) => {
    const name = inutRef.current ? inutRef.current.value : "";
    if (name.length > 20) {
      return;
    }
    setClubName(name);
  };
  const handleNext = () => {
    return navigate("/club/description", { state: { clubName: clubName } });
  };

  return (
    <ClubStartBase>
      <Title>모임 등록</Title>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <FieldTitle>모임의 이름을 정해 주세요!</FieldTitle>
        <StyledTextField>
          <InputBase
            placeholder="여기에 입력해주세요"
            sx={{
              fontWeight: "600",
              "& .MuiInputBase-root": {
                fontSize: "0.95rem",
                color: "${(props) => props.theme.colors.black}",
              },
              marginLeft: "10px",
            }}
            onChange={handleOnChangeClubName}
            inputRef={inutRef}
            value={clubName}
          />
          <StyledLabel>{clubName.length}/20자</StyledLabel>
        </StyledTextField>
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton disabled={clubName.length === 0} onClick={handleNext}>
            다 했어요!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default MakeClubNaming;
