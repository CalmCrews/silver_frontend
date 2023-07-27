import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';
import axios from 'axios';
import { atom, useRecoilState } from 'recoil';
import { useCookies } from 'react-cookie';
import { loginState } from '../states/userInfo';
import { useNavigate } from 'react-router-dom';

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField
				label="아이디"
				{...register("userId", { required: "아이디는 필수 입력 사항입니다." })}
				error={Boolean(errors.userId)}
				helperText={errors.userId && errors.userId.message}
			/>
			<br />
			<TextField
				label="비밀번호"
				type="password"
				{...register("password", { required: "비밀번호는 필수 입력 사항입니다." })}
				error={Boolean(errors.password)}
				helperText={errors.password && errors.password.message}
			/>
			<br />
			<Button variant="contained" color="primary" type="submit">로그인</Button>
		</form>
  );
}

export default SignInForm;
