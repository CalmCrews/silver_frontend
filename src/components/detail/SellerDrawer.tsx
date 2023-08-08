import React from "react";
import { Drawer } from "@mui/material";
import { styled } from "styled-components";

interface MainDrawerProps {
	sellerName: string;
  open: boolean;
  onClose: () => void;
}

const SellerDrawer = ({ sellerName, open, onClose }: MainDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
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
          height: "calc(100% - 120px)",
          display: open ? "block" : "none",
					borderRadius: "35px 35px 0px 0px",
					borderTop: "1px solid #A394FF",
					background: "#FFF",
					boxShadow: "0px -2px 10px 0px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      
    </Drawer>
  );
};

export default SellerDrawer;