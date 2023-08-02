import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, InputBase, FormHelperText, Typography } from "@mui/material";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { loginState } from "../states/userInfo";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const FormContainer = styled.form`
  width: 100%;
  height: 100vh;
  padding: 30px;
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
const FieldTitle = styled.h1`
  font-size: ${(props) => props.theme.text.md};
  color: ${(props) => props.theme.colors.black};
  margin: 12px 0;
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

function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>();

	const [currentStep, setCurrentStep] = useState(1);
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);

  const navigate = useNavigate();

	const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register/`, {
        username: data.userId,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.message === "회원가입 성공") {
          setLogin({
            isLoggedIn: true,
            userId: res.data.user.username,
            accessToken: res.data.accessToken,
          });
          setCookie("refreshToken", res.data.refreshToken, { path: "/" });
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

	//비밀번호 확인 
	const detectedPassword = watch("password");
	const detectedPasswordConfirm = watch("passwordConfirm");


  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
			{currentStep === 1 && (
				<>
					<FieldTitle>아이디 설정</FieldTitle>
					<StyledTextField>
						<StyledLabel>아이디</StyledLabel>
						<InputBase
							{...register("userId", {
								required: "아이디는 필수 입력 사항입니다.",
							})}
							error={Boolean(errors.userId)}
							placeholder="아이디를 입력해주세요"
						/>
					</StyledTextField>
					{errors.userId && (
						<FormHelperText>{errors.userId.message}</FormHelperText>
					)}
					<Button variant="contained" color="primary" onClick={handleNext}>
						다 했어요!
					</Button>
				</>
			)}
			{currentStep === 2 && (
				<>
					<FieldTitle>비밀번호 설정</FieldTitle>
					<StyledTextField>
						<StyledLabel>비밀번호</StyledLabel>
						<InputBase
							type="password"
							{...register("password", {
								required: "비밀번호는 필수 입력 사항입니다.",
							})}
							error={Boolean(errors.password)}
							placeholder="비밀번호를 입력해주세요"
						/>
					</StyledTextField>
					{errors.password && (
						<FormHelperText>{errors.password.message}</FormHelperText>
					)}
					<FieldTitle>비밀번호 확인</FieldTitle>
					<StyledTextField>
						<StyledLabel>비밀번호</StyledLabel>
						<InputBase
							type="password"
							{...register("passwordConfirm", {
								required: "비밀번호 확인은 필수 입력 사항입니다.",
								validate: (value) =>
									value === watch("password") || "비밀번호가 일치하지 않습니다.",
							})}
							error={Boolean(errors.passwordConfirm)}
							placeholder="비밀번호를 다시 입력해주세요"
						/>
					</StyledTextField>
					{errors.passwordConfirm && (
						<FormHelperText>{errors.passwordConfirm.message}</FormHelperText>
					)}
					{detectedPassword === detectedPasswordConfirm && detectedPasswordConfirm &&(
							<FormHelperText>확인되었어요</FormHelperText>
						)}
					<br />
					<Button variant="contained" color="primary" type="submit">
						다 했어요!
					</Button>
				</>
			)}
    </FormContainer>
  );
}

export default SignUpForm;
