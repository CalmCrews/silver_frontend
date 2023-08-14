import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";

const MyInfo = () => {
	return (
		<>
			<DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer/>
				<p>내 정보 메인 페이지</p>
        <BottomTabBar currentPage="myinfo"/>
      </DefaultContainer>
		</>
	)
}

export default MyInfo;