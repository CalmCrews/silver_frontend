import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputBase } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { useCookies } from "react-cookie";
import { loginState } from "../../states/userInfo";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import FormButton from "../shared/FormButton";
import DefaultIcon from "../shared/DefaultIcon";
import Warning from "../../assets/icons/WarningIcon.png";
import Checked from "../../assets/icons/CheckedIcon.png";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const FieldTitle = styled.h2`
  font-size: ${(props) => props.theme.text.md};
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
`;

const StyledLabel = styled.label`
  width: 4rem;
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
`;

const SignupPsForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [login, setLogin] = useRecoilState(loginState);
  const [cookies, setCookie] = useCookies(["refreshToken"]);
  useEffect(() => {
    console.log("userId:", userId);
    if (!userId) {
      navigate("/signup/id/");
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isButtonEnabled, setButtonEnabled] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  //비밀번호 확인
  const [detectedPassword, setDetectedPassword] = useState("");
  const [detectedPasswordConfirm, setDetectedPasswordConfirm] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetectedPassword(e.target.value);
    // 비밀번호 확인값이 있을 때만 검사 예약
    setPasswordsMatch(true);
    setButtonEnabled(false);
    //console.log(detectedPassword, detectedPasswordConfirm);
    // console.log(getValues("passwordConfirm"));
    if (detectedPassword && detectedPasswordConfirm) {
      // 기존의 예약된 검사를 취소
      if (timer) {
        clearTimeout(timer);
      }
      // 1초 이후에 새로운 검사 예약
      setTimer(
        setTimeout(() => {
          if (detectedPasswordConfirm !== e.target.value) {
            // 일치하지 않는 경우 에러 처리
            setPasswordsMatch(false);
            setButtonEnabled(false);
          } else {
            // 에러가 없을 경우 버튼 활성화
            setButtonEnabled(true);
            setPasswordsMatch(true);
          }
        }, 1000)
      ); // 1초 (1000ms) 후에 검사 수행
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetectedPasswordConfirm(e.target.value);
    // 비밀번호 확인값이 있을 때만 검사 예약
    setPasswordsMatch(true);
    setButtonEnabled(false);
    //console.log(detectedPasswordConfirm, detectedPassword);
    if (detectedPasswordConfirm && detectedPasswordConfirm) {
      // 기존의 예약된 검사를 취소
      if (timer) {
        clearTimeout(timer);
      }
      // 1초 이후에 새로운 검사 예약
      setTimer(
        setTimeout(() => {
          if (detectedPassword !== e.target.value) {
            // 일치하지 않는 경우 에러 처리
            setPasswordsMatch(false);
            setButtonEnabled(false);
          } else {
            // 에러가 없을 경우 버튼 활성화
            setButtonEnabled(true);
            setPasswordsMatch(true);
          }
        }, 1000)
      ); // 1초 (1000ms) 후에 검사 수행
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register/`, {
        username: userId,
        password: detectedPassword,
      })
      .then((res) => {
        console.log(res);
        if (res.status >= 200 && res.status < 300) {
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

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <FormContainer onSubmit={onSubmit}>
        <FieldTitle>비밀번호를 설정해 주세요!</FieldTitle>
        <StyledTextField style={{ marginBottom: "40px" }}>
          <StyledLabel>비밀번호</StyledLabel>
          <InputBase
            type={showPassword ? "text" : "password"}
            value={detectedPassword}
            error={!detectedPassword || !passwordsMatch}
            placeholder="여기에 입력해주세요"
            onChange={handlePasswordChange}
            sx={{ fontSize: "0.9rem", fontWeight: "600" }}
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
          />
        </StyledTextField>
        <FieldTitle>비밀번호를 다시 확인해 보아요!</FieldTitle>
        <StyledTextField>
          <StyledLabel>비밀번호</StyledLabel>
          <InputBase
            type={showPasswordConfirm ? "text" : "password"}
            value={detectedPasswordConfirm}
            error={!detectedPasswordConfirm || !passwordsMatch}
            placeholder="여기에 입력해주세요"
            onChange={handlePasswordConfirmChange}
            sx={{ fontSize: "0.9rem", fontWeight: "600" }}
            onFocus={() => setShowPasswordConfirm(true)}
            onBlur={() => setShowPasswordConfirm(false)}
          />
        </StyledTextField>
        {!passwordsMatch && (
          <HelperText>
            <DefaultIcon icon={Warning} name={"warning_icon"} />
            &nbsp; 비밀번호가 일치하지 않습니다.
          </HelperText>
        )}
        {isButtonEnabled && (
          <HelperText>
            <DefaultIcon icon={Checked} name={"checked_icon"} />
            &nbsp; 확인되었어요!
          </HelperText>
        )}
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton disabled={!isButtonEnabled} type="submit">
            다 했어요!
          </FormButton>
        </div>
      </FormContainer>
    </div>
  );
};

export default SignupPsForm;
