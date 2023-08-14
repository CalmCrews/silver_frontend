import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import MyInfoCard from "../../components/myinfo/MyInfoCard";

const UserInfo = {
	name: "코알라",
	userId: 1,
	profile: "",
}

const MyInfo = () => {
	return (
		<>
			<DefaultContainer>
        <Toolbar sx={{ height: "100px" }} />
        <AppBarWithDrawer/>
				
				<MyInfoCard userInfo={UserInfo}/>
				<p>내 정보 메인 페이지</p>
        <BottomTabBar currentPage="myinfo"/>
      </DefaultContainer>
		</>
	)
}

export default MyInfo;