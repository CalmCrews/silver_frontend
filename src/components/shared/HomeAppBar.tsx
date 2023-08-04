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
        position: "absolute",
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
