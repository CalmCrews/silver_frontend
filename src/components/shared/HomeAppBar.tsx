import React, { ReactNode } from "react";
import { styled } from "styled-components";
import { AppBar } from "@mui/material";

interface HomeAppBarProps {
  children?: ReactNode;
}

const HomeAppBar = ({ children }: HomeAppBarProps) => {
  return (
    <AppBar
      sx={{
        position: "fixed",
        maxWidth: "430px",
        left: "auto",
        right: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80px",
        color: "black",
        background: "#fff",
      }}
    >
      {children}
    </AppBar>
  );
};

export default HomeAppBar;
