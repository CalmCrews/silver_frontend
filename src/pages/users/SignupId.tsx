import React from 'react';
import SignUpForm from "../../components/SignUpForm"
import { styled } from 'styled-components';
import SimpleAppBar from '../../components/SimpleAppBar';
import SignupIdForm from '../../components/user/SignupIdForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.title.md};
  margin: 50px 0;
`

const SignupId = () => {
  return (
    <Container>
      <SimpleAppBar/>
      <Title>회원가입</Title>
      <SignupIdForm />
    </Container>
  );
}

export default SignupId;