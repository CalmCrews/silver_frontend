import React from "react";
import SignInForm from "../../components/SignInForm";
import { Divider, IconButton } from "@mui/material";
import { styled } from "styled-components";
import Kakao from "../../assets/icons/kakao_Button.png";
import Naver from "../../assets/icons/Naver_Button.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  color: ${(props) => props.theme.colors.black};
  font-weight: 400;
  font-size: 20px;
  margin-top: 120px;
`;

const SocialLoginTitle = styled.div`
  width: 100%;
  text-align: center;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  font-weight: 600;
  font-size: ${(props) => props.theme.text.md};
  margin: 16px 0 8px 0;
`;

const SocialLoginButton = styled(IconButton)`
  width: 250px;
  border: none;
  padding: 0;
`;

const SignIn = () => {
  const handleKakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/kakao/login`;
  };

  const handleNaverLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/users/naver/login/`;
  };

  return (
    <Container>
      <TitleContainer>
        <p>
          모임원들과 모여
          <br />
          여기서 더 저렴하게!
        </p>
        <h1 style={{ margin: "15px" }}>모 여</h1>
      </TitleContainer>
      <SignInForm />
      <div style={{ display: "flex", fontSize: "1rem", marginBottom: "35px" }}>
        <p style={{ color: "#3a3a3a" }}>아직 회원이 아니신가요?&nbsp;</p>
        <a
          href="/signup/id"
          style={{
            color: "#a394ff",
            textDecorationColor: "#a394ff",
            textUnderlineOffset: "4px",
          }}
        >
          회원가입하기
        </a>
      </div>
      <Divider
        variant="middle"
        sx={{ width: "100%", borderBottomWidth: "2px" }}
      />
      <SocialLoginTitle>간편 로그인</SocialLoginTitle>
      <p style={{ color: "#3a3a3a" }}>SNS 계정을 이용해 로그인 할 수 있어요</p>
      <div style={{ margin: "27px", width: "250px" }}>
        <SocialLoginButton
          sx={{ padding: "0", marginBottom: "10px" }}
          onClick={handleKakaoLogin}
        >
          <img src={Kakao} alt="Kakao_login_button" style={{ width: "100%" }} />
        </SocialLoginButton>
        <SocialLoginButton sx={{ padding: "0" }}>
          <img
            src={Naver}
            alt="Naver_login_button"
            style={{ width: "100%" }}
            onClick={handleNaverLogin}
          />
        </SocialLoginButton>
      </div>
    </Container>
  );
};

export default SignIn;
