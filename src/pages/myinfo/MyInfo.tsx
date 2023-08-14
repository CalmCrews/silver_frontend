import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar, Button, ButtonGroup } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import MyInfoCard from "../../components/myinfo/MyInfoCard";
import CustomDivider from "../../components/shared/CustomDivider";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const UserInfo = {
  name: "코알라",
  userId: 1,
  profile: "",
};

const GridButton = styled.button`
  border-radius: 0;
  border: 2px solid #f0f0f0;
  color: #3a3a3a;
  background-color: transparent;
  padding: 18px 10px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(240, 240, 240, 0.25);
  }
`;

const RowButton = styled.button`
	text-align: left;
  border-radius: 0;
  border: 1.5px solid #d9d9d9;
  color: #3a3a3a;
  background-color: transparent;
  padding: 14px 31px;
  font-size: 1.25rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(240, 240, 240, 0.25);
  }
`;

const MyInfo = () => {
	const navigate = useNavigate();

  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "100px" }} />
        <AppBarWithDrawer />
        <MyInfoCard userInfo={UserInfo} />
        <br />
        <CustomDivider width="calc(100% - 26px)" color="#F0F0F0" />
        <Button
          href=""
          variant="contained"
          sx={{
            padding: "12px 28px",
            color: "#fff",
            fontSize: "1.25rem",
            fontWeight: "600",
            borderRadius: "100px",
            margin: "18px",
            backgroundColor: "#a394ff",
            "&:hover": {
              backgroundColor: "#a394ff",
            },
            "&:active": {
              backgroundColor: "#a394ff",
            },
            "&:focus": {
              backgroundColor: "#a394ff",
            },
          }}
        >
          나의 모임 바로가기
        </Button>

        <BottomTabBar currentPage="myinfo" />
        <ButtonGroup
          aria-label="button group"
          variant="text"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0px",
            width: "100%",
						boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.25)",
						borderTop: "1px solid #f0f0f0",
						borderRadius: "0",
						marginBottom: "10px",
          }}
        >
          <GridButton>구매현황</GridButton>
          <GridButton>배송조회</GridButton>
          <GridButton>쿠폰관리</GridButton>
          <GridButton>주문내역</GridButton>
          <GridButton>정보수정</GridButton>
          <GridButton>문의하기</GridButton>
        </ButtonGroup>
				<br/>
				<ButtonGroup
					orientation="vertical"
					sx={{
            width: "100%",
						border: "1px solid #f0f0f0",
						borderRadius: "0",
          }}
				>
          <RowButton onClick={() => navigate("/fontsetting")}>글씨 크기 바꾸기</RowButton>
					<RowButton>자주 묻는 질문</RowButton>
          <RowButton>로그아웃</RowButton>
          <RowButton>회원탈퇴</RowButton>
        </ButtonGroup>
      </DefaultContainer>
    </>
  );
};

export default MyInfo;
