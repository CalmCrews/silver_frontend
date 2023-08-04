import React from "react";
import Drawer from "@mui/material/Drawer";

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <p>drawer!</p>
    </Drawer>
  );
};

export default CustomDrawer;