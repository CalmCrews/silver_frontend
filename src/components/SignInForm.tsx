import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, InputBase } from '@mui/material';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { loginState } from '../states/userInfo';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
  align-items: center;
`;

const StyledTitle = styled.h1`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.title.sm};
  font-weight: 700;
`
const StyledTextField = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  border-radius: 2rem;
  border: 2px solid ${(props) => props.theme.colors.primary};
  align-items: center;
  padding: 0 15px;
`;


const StyledLabel = styled.label`
  width: 3.75rem;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 600;
  text-align: center;
  margin-right: 5px;
`;

const StyledButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  width: 85%;
  height: 60px;
  color: #fff;
  border-radius: 10px;
  font-size: ${props => props.theme.title.sm};
`;

type SignInFormValues = {
  userId: string;
  password: string;
};


function SignInForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInFormValues>();

  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);

	const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFormValues> = data => {
    console.log(data);
		axios.post(`${process.env.REACT_APP_API_URL}/users/signin/`, {
      username: data.userId,
      password: data.password
    })
    .then(res => {
      console.log(res);
      if (res.data.message === "로그인 성공") {
        setLogin({ isLoggedIn: true, userId: res.data.user.username, accessToken: res.data.accessToken });
    		setCookie('refreshToken', res.data.refreshToken, { path: '/' });
				navigate('/');
      }
    })
    .catch(err => {
      console.error(err);
    });

  };

  return (
    <div style={{ width: "100%"}}>
      <StyledTitle>로그인</StyledTitle>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField style={{ marginBottom: "10px"}}>
          <StyledLabel>아이디</StyledLabel>
          <InputBase
            {...register("userId", { required: "아이디는 필수 입력 사항입니다." })}
          />
        </StyledTextField>
        <StyledTextField>
          <StyledLabel>비밀번호</StyledLabel>
          <InputBase
            type="password"
            {...register("password", { required: "비밀번호는 필수 입력 사항입니다." })}
          />
        </StyledTextField>
        <br />
        <StyledButton type="submit">로그인</StyledButton>
      </FormContainer>
    </div>
  );
}

export default SignInForm;
