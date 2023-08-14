import React from "react";
import { Drawer, Box, IconButton, Toolbar, Grid } from "@mui/material";
import DefaultIcon from "../shared/DefaultIcon";
import HomeAppBar from "../shared/HomeAppBar";
import Backward from "../../assets/icons/BackwardIcon.png";
import { styled } from "styled-components";
import SearchBar from "./SearchBar";
import CategoryCard from "./CategoryCard";

import Fashion from "../../assets/categoryImages/fashion.png"
import Digital from "../../assets/categoryImages/digital.png"
import Furniture from "../../assets/categoryImages/funiture.png"
import Food from "../../assets/categoryImages/food.png"
import Aniplant from "../../assets/categoryImages/aniplant.png"
import Sports from "../../assets/categoryImages/sports.png"
import Hobby from "../../assets/categoryImages/hobby.png"
import Travel from "../../assets/categoryImages/travel.png"
import Overseas from "../../assets/categoryImages/overseas.png"
import Coupon from "../../assets/categoryImages/coupon.png"
import Life from "../../assets/categoryImages/life.png"

interface MainDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DrawerTitle = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.colors.primary};
`;


const categories = [
  {title: "패션뷰티", img: Fashion},
  {title: "디지털/가전", img: Digital},
  {title: "가구", img: Furniture},
  {title: "식품", img: Food},
  {title: "동식물", img: Aniplant},
  {title: "스포츠", img: Sports},
  {title: "취미", img: Hobby},
  {title: "여행", img: Travel},
  {title: "해외직구", img: Overseas},
  {title: "이용권/ e쿠폰", img: Coupon},
  {title: "생활", img: Life},
];

const MainDrawer = ({ open, onClose }: MainDrawerProps) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: open ? "block" : "none",
        "& .MuiDrawer-paper": {
          position: "absolute",
          width: "100%",
          height: "100%",
          display: open ? "block" : "none",
        },
      }}
    >
      <HomeAppBar>
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "22px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                textAlign: "center",
                paddingRight: "12px",
              }}
              onClick={onClose}
            >
              <DefaultIcon icon={Backward} height={"26px"} width={"16px"} name={"backward"} />
            </IconButton>
            <DrawerTitle>카테고리</DrawerTitle>
            <IconButton disabled sx={{ width: "40px", height: "40px" }}></IconButton>
          </Box>
        </>
      </HomeAppBar>
      <Toolbar sx={{ height: "80px" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "calc(100% - 80px)",
          padding: "22px 12px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <SearchBar />
        <Grid container flex={1} spacing={1} sx={{padding: "10px 5px"}}>
          {categories.map((category, index) => (
            <Grid item xs={6} key={index} sx={{marginBottom: "10px", display: "flex", justifyContent: "center"}}>
              <CategoryCard title={category.title} imageUrl={category.img}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
