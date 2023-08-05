import React from "react";
import { Drawer, Box, IconButton, Toolbar } from "@mui/material";
import DefaultIcon from "./DefaultIcon";
import HomeAppBar from "./HomeAppBar";
import AlarmIcon from '../../assets/icons/AlarmIcon.png'
import { styled } from "styled-components";

interface MainDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DrawerTitle = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.colors.primary}
`

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
        display: open? "block" : "none",
        "& .MuiDrawer-paper" : {
          position: "absolute",
          width: "100%",
          height: "100%",
          display: open? "block" : "none",
        }
      }}
    >
      <HomeAppBar>
        <>
          <Box sx={{display: "flex", width: "100%", padding: "22px", justifyContent: "space-between", alignItems: "center"}}>
            <IconButton sx={{width:"40px", height:"40px"}} onClick={onClose}></IconButton>
            <DrawerTitle>카테고리</DrawerTitle>
            <IconButton sx={{width:"40px", height:"40px"}}>
            </IconButton>
          </Box>
        </>
      </HomeAppBar>
      <Toolbar sx={{height: "80px"}}/>
      <Box>
        
      </Box>
    </Drawer>
  );
};

export default MainDrawer;
