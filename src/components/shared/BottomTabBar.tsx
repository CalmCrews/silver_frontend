import React from "react";
import { Tabs, Tab } from "@mui/material";
import HomeIcon from "../../assets/icons/HomeIcon.png";
import ClubIcon from "../../assets/icons/ClubIcon.png";
import MyIcon from "../../assets/icons/MyIcon.png";
import DefaultIcon from "./DefaultIcon";
import { styled } from "styled-components";

const StyledTab = styled(Tab)`
  
`

const BottomTabBar = () => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="icon label tabs"
      sx={{
        width: "100%",
        position: "absolute",
        bottom: "0",
        display: "flex",
        justifyContent: "space-evenly",
        padding: "4px",
        boxShadow: "0px -2px 6px 2px rgba(163, 148, 255, 0.40)",
        "& .MuiButtonBase-root": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "9px", // 아이콘과 레이블 사이의 간격 설정
          color: "#A394FF",
          fontSize: "1rem",
          fontWeight: "600"
        },
      }}
    >
      <Tab
        icon={
          <DefaultIcon
            icon={HomeIcon}
            name="HomeIcon"
            width="auto"
            height="35px"
          />
        }
        label="모살까"
      />
      <Tab
        icon={
          <DefaultIcon
            icon={ClubIcon}
            name="ClubIcon"
            width="auto"
            height="35px"
          />
        }
        label="모일까"
      />
      <Tab
        icon={
          <DefaultIcon icon={MyIcon} name="MyIcon" width="auto" height="35px" />
        }
        label="내정보"
      />
    </Tabs>
  );
};

export default BottomTabBar;
