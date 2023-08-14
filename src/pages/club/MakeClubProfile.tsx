import React, {
  useState,
  useRef,
  ChangeEvent,
  MouseEventHandler,
  useEffect,
} from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../../utils/axiosInterceptor";

import ClubStartBase from "../../components/club/ClubStartBase";
import FormButton from "../../components/shared/FormButton";
import DefaultIcon from "../../components/shared/DefaultIcon";
import Warning from "../../assets/icons/WarningIcon.png";
import Checked from "../../assets/icons/CheckedIcon.png";
import Plus from "../../assets/icons/Plus.png";

import classes from "./MakeClubProfile.module.css";

const Title = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 37px;
  margin: 50px 0;
  text-align: center;
`;
const FieldTitle = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.md};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 32px 0;
  text-align: center;
`;
const FieldTitleMarginTop = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  margin: 30px 0 0 0;
  text-align: center;
`;
const FieldTitleSmall = styled.p`
  width: 100%;
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 700;
  text-align: start;
  color: ${(props) => props.theme.colors.black};
  text-align: center;
`;
const HelperText = styled.p`
  display: flex;
  font-size: ${(props) => props.theme.text.sm};
  font-weight: 600;
  color: ${(props) => props.theme.colors.lightgrey};
  margin: 16px;
  align-items: center;
`;

const MakeClubProfile = () => {
  const [nickname, setNickname] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState("");
  const [clubCode, setClubCode] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { clubName, description, keywordsList } = location.state || {};

  const handleNickname = (event: React.ChangeEvent) => {
    const nicknameInputValue = nicknameRef.current
      ? nicknameRef.current.value
      : "";
    if (nicknameInputValue.length > 20) {
      return;
    }
    setNickname(nicknameInputValue);
  };
  const handleNicknameCheck: MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    if (nickname.length === 0) {
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/duplicateNickname/`,
        JSON.stringify({ nickname }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setNicknameStatus("200");
      } else {
        setNicknameStatus("400");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
    }
  };

  const handleImageOuterDiv: MouseEventHandler<HTMLDivElement> = (event) => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setSelectedImage(selectedFile);

      // 이미지 미리보기를 위해 데이터 URL을 생성합니다.
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      return;
    }
    try {
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}clubs/`,
        {
          name: clubName,
          intro: description,
          tag: JSON.stringify(keywordsList),
        }
      );
      const club_code = response.data.code;
      setClubCode(club_code);
    } catch (error) {
      console.error("Error register clubName, description:", error);
    }

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("profile_image", selectedImage);

    try {
      await axiosInstance.put(
        `${process.env.REACT_APP_API_URL}users/nickname/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    setNicknameStatus("0");
  }, [nickname]);

  const handleNext = () => {
    handleImageUpload();
    // 여기에서 생성을 성공하면? 다음 페이지로 넘어가기
    console.log("clubCode :", clubCode);
    return navigate("/club/register", {
      state: {
        clubName: clubName,
        clubCode: clubCode,
      },
    });
  };

  return (
    <ClubStartBase>
      <Title>
        이제
        <br />
        프로필만 설정하면 끝!
      </Title>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <FieldTitle>모임에서 사용할 나의 별명은?</FieldTitle>
        <div className={classes["nickname-div"]}>
          <input
            onChange={handleNickname}
            ref={nicknameRef}
            value={nickname}
            placeholder="여기에 입력해주세요"
            className={classes["nickname-input"]}
          />
          <button
            className={
              nickname.trim().length === 0
                ? `${classes["nickname-input-btn"]} ${classes["disabled"]}`
                : classes["nickname-input-btn"]
            }
            onClick={handleNicknameCheck}
            disabled={nickname.length === 0}
          >
            중복확인
          </button>
        </div>
        <div className={classes["nickname-feedback-div"]}>
          {nicknameStatus === "400" && (
            <HelperText>
              <DefaultIcon icon={Warning} name={"warning_icon"} />
              &nbsp;중복된 아이디가 있어요!
            </HelperText>
          )}
          {nicknameStatus === "200" && (
            <HelperText>
              <DefaultIcon icon={Checked} name={"checked_icon"} />
              &nbsp;확인되었어요!
            </HelperText>
          )}
        </div>
        <FieldTitleMarginTop>
          내가 원하는 사진도 올릴 수 있어요!
        </FieldTitleMarginTop>
        <FieldTitleSmall>(선택사항)</FieldTitleSmall>
        <input
          className={classes["img-upload-input"]}
          type="file"
          onChange={handleImageChange}
          ref={imageInputRef}
        ></input>
        <div
          className={classes["img-upload-div"]}
          onClick={handleImageOuterDiv}
        >
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className={classes["img-upload-img"]}
            />
          )}
          {previewImage && (
            <div className={classes["img-upload-change-div"]}>사진 바꾸기</div>
          )}
          <img
            src={Plus}
            alt="plus-icon"
            className={classes["img-upload-icon"]}
          />
        </div>
        <div
          className="button-container"
          style={{ width: "100%", position: "absolute", bottom: "88px" }}
        >
          <FormButton disabled={nicknameStatus !== "200"} onClick={handleNext}>
            다 했어요!
          </FormButton>
        </div>
      </div>
    </ClubStartBase>
  );
};

export default MakeClubProfile;
