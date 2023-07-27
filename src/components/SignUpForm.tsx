import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Dialog, DialogTitle } from '@mui/material';
import axios from 'axios';

type SignInFormValues = {
  userId: string;
  password: string;
  passwordConfirm: string;
};

function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignInFormValues>();
  const [open, setOpen] = useState(false);


  const onSubmit: SubmitHandler<SignInFormValues> = data => {
    console.log(data);
	axios.post(`${process.env.REACT_APP_API_URL}/users/register/`, {
      username: data.userId,
      password: data.password
    })
    .then(res => {
      console.log(res);
      if (res.data.message === "회원가입 성공") {
        setOpen(true);
      }
    })
    .catch(err => {
      console.error(err);
    });

  };

  return (
	<>
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
		<TextField
			label="비밀번호 확인"
			type="password"
			{...register("passwordConfirm", {
			required: "비밀번호 확인은 필수 입력 사항입니다.",
			validate: value => value === watch('password') || "비밀번호가 일치하지 않습니다."
			})}
			error={Boolean(errors.passwordConfirm)}
			helperText={errors.passwordConfirm && errors.passwordConfirm.message}
		/>
		<br />
		<Button variant="contained" color="primary" type="submit">회원가입</Button>
		</form>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>회원가입 완료</DialogTitle>
      </Dialog>
	</>
  );
}

export default SignUpForm;
