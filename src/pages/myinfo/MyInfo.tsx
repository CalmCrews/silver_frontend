import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar, Button, ButtonGroup } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import MyInfoCard from "../../components/myinfo/MyInfoCard";
import CustomDivider from "../../components/shared/CustomDivider";
import { styled } from "styled-components";

const UserInfo = {
  name: "코알라",
  userId: 1,
  profile: "",
};

const GridButton = styled(Button)({
	"&.MuiButton-root" : {
		borderRadius: "0",
		border: "2px solid #F0F0F0",
		color: "#3a3a3a",
	},
	"&:hover": {
    backgroundColor: "transparent",
    color: "#3a3a3a",
    borderColor: "#F0F0F0;",
  },
  "&:focus": {
    outline: "none",
  },
  "&:active": {
    backgroundColor: "#transparent;",
    color: "#3a3a3a",
    borderColor: "#F0F0F0;",
  },
});

const MyInfo = () => {
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
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0px",
						width: "100%",
          }}
					variant="text"
        >
          <GridButton>버튼 1</GridButton>
          <GridButton>버튼 2</GridButton>
          <GridButton>버튼 3</GridButton>
          <GridButton>버튼 4</GridButton>
          <GridButton>버튼 5</GridButton>
          <GridButton>버튼 6</GridButton>
        </ButtonGroup>
      </DefaultContainer>
    </>
  );
};

export default MyInfo;
