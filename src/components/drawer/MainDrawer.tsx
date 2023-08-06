import React from "react";
import { Drawer, Box, IconButton, Toolbar, Grid } from "@mui/material";
import DefaultIcon from "../shared/DefaultIcon";
import HomeAppBar from "../shared/HomeAppBar";
import Backward from "../../assets/icons/BackwardIcon.png";
import { styled } from "styled-components";
import SearchBar from "./SearchBar";
import CategoryCard from "./CategoryCard";

interface MainDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DrawerTitle = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.colors.primary};
`;

const categories = [
  {title: "패션뷰티"},
  {title: "디지털/가전"},
  {title: "가구"},
  {title: "식품"},
  {title: "동식물"},
  {title: "스포츠"},
  {title: "취미"},
  {title: "여행"},
  {title: "해외직구"},
  {title: "이용권/ e쿠폰"},
  {title: "생활"},
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
          padding: "25px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <SearchBar />
        <Grid container flex={1} spacing={1} sx={{padding: "30px 5px"}}>
          {categories.map((category, index) => (
            <Grid item xs={6} key={index} sx={{marginBottom: "10px"}}>
              <CategoryCard title={category.title} imageUrl=""/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
