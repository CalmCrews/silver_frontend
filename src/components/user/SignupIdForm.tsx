import React, { useState } from "react";
import { TextField, Button, InputBase, FormHelperText, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FormButton from "../shared/FormButton";

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

type SignUpFormValues = {
  userId: string;
  password: string;
  passwordConfirm: string;
};

const SignupIdForm = () => {
  const [ userId, setUserId ] = useState('');
  const [ idError, setIdError ] = useState(true);
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
          if (res.status) {
            setIdError(false);
          }
          else {
            
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  const handleNext = () => {
    // 입력한 아이디 값을 비밀번호 입력 페이지로 전달하고 이동
    navigate("/signup/password", { state: { userId: userId } });
    
  };

  return (
    <>
      <FieldTitle>먼저, 아이디를 만들어 볼까요?</FieldTitle>
      <StyledTextField>
        <StyledLabel>아이디</StyledLabel>
        <InputBase
          value= {userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="아이디를 입력해주세요"
          onBlur={handleIdCheck}
        />
      </StyledTextField>
      {idError && (
        <FormHelperText>{}</FormHelperText>
      )}
      <FormButton isEnabled={idError} onClick={handleNext}>
        다 했어요!
      </FormButton>
    </>
    
  );
}

export default SignupIdForm;
