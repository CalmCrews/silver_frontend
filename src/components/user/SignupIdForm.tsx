import React, { useState } from "react";
import { TextField, Button, InputBase, FormHelperText, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FormButton from "../shared/FormButton";
import DefaultIcon from "../shared/DefaultIcon";
import ICONS from "../../constants/constants";
import Warning from "../../assets/icons/WarningIcon.png";
import Checked from "../../assets/icons/CheckedIcon.png";

const StyledTextField = styled.div`
  display: flex;
  width: 100%;
  height: 3.75rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  align-items: center;
  padding: 0 15px;
`;

const FieldTitle = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.md};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
`;

const StyledLabel = styled.label`
  width: 3.75rem;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 600;
  text-align: center;
  margin-right: 5px;
`;

const HelperText = styled.p`
  display: flex;
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 600;
  color: ${(props) => props.theme.colors.lightgrey};
  margin: 16px;
  align-items: center;
`


const SignupIdForm = () => {
  const [ userId, setUserId ] = useState('');
  const [ idError, setIdError ] = useState(true);
  const [ isWriting, setIsWriting ] = useState(true);
  const navigate = useNavigate();

  const handleIdCheck = () => {
    if (userId)
    {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/duplicateUserId/`, {
          userId: userId,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setIdError(false);
          }
        })
        .catch((err) => {
          setIdError(true);
          console.error(err);
        });
        setIsWriting(false);
    }
  }

  const handleNext = () => {
    // 입력한 아이디 값을 비밀번호 입력 페이지로 전달하고 이동
    navigate("/signup/password", { state: { userId: userId } });
    
  };

  return (
    <div style={{position: "relative", width: "100%", height: "100%"}}>
      <FieldTitle>먼저, 아이디를 만들어 볼까요?</FieldTitle>
      <StyledTextField>
        <StyledLabel>아이디</StyledLabel>
        <InputBase
          value= {userId}
          onChange={(e) => {
            if (e.target.value === '') {
              setIdError(true);
            }
            setUserId(e.target.value);
            setIsWriting(true);
          }}
          placeholder="여기에 입력해주세요"
          onBlur={handleIdCheck}
        />
      </StyledTextField>
      {!isWriting && idError && (
        <HelperText><DefaultIcon icon={Warning} name={"warning_icon"}/>중복된 아이디가 있어요!</HelperText>
      )}
      {!isWriting && !idError && (
        <HelperText><DefaultIcon icon={Checked} name={"checked_icon"}/>확인되었어요!</HelperText>
      )}
      <div className="button-container" style={{width: "100%", position: "absolute", bottom: "88px"}}>
        <FormButton isEnabled={!idError} onClick={handleNext}>
          다 했어요!
        </FormButton>
      </div>
    </div>
  );
}

export default SignupIdForm;
