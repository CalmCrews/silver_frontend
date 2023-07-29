import React from 'react';
import SignUpForm from "../../components/SignUpForm"
import { styled } from 'styled-components';
import SimpleAppBar from '../../components/SimpleAppBar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.title.sm};
  margin-top: 20px;
`

const SignUp = () => {
  return (
    <Container>
      <SimpleAppBar/>
      <Title>회원가입</Title>
      <SignUpForm/>
    </Container>
  );
}

export default SignUp;