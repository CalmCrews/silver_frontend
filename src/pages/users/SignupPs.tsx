import React from 'react';
import { styled } from 'styled-components';
import SimpleAppBar from '../../components/SimpleAppBar';
import SignupPsForm from '../../components/user/SignupPsForm';

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

const SignupPs = () => {
  return (
    <Container>
      <SimpleAppBar/>
      <Title>회원가입</Title>
      <SignupPsForm />
    </Container>
  );
}

export default SignupPs;