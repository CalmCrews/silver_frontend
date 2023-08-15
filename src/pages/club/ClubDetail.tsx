import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import ClubRankInfoBox from "../../components/club/ClubRankInfoBox";

import { AxiosInterceptor } from "../../utils/axiosInterceptor";

const ClubDetail = () => {
  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <div>{/* <ClubRankInfoBox /> */}</div>
        <BottomTabBar currentPage="club" />
      </DefaultContainer>
    </>
  );
};

export default ClubDetail;
