import React from "react";
import { Tabs, Tab } from "@mui/material";
import HomeIcon from "../../assets/icons/HomeIcon.png";
import ClubIcon from "../../assets/icons/ClubIcon.png";
import MyIcon from "../../assets/icons/MyIcon.png";
import DefaultIcon from "./DefaultIcon";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledTabs = styled(Tabs)({
  maxWidth: "430px",
  position: "fixed",
  bottom: "0",
  display: "flex",
  justifyContent: "space-evenly",
  padding: "4px",
  boxShadow: "0px -2px 6px 2px rgba(163, 148, 255, 0.40)",
  "&.MuiTabs-root":{
    width: "100%",
  },
  "& .MuiButtonBase-root": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "9px", // 아이콘과 레이블 사이의 간격 설정
    color: "#A394FF",
    fontSize: "1rem",
    fontWeight: "600",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#A394FF",
  },
})

const BottomTabBar = ({currentPage}: {currentPage : string}) => {
  const navigate = useNavigate();

  const initialValue = (() => {
    switch (currentPage) {
      case 'home':
        return 0;
      case 'club':
        return 1;
      case 'myinfo':
        return 2;
      default: 
        return 0;
    }
  })

  const [value, setValue] = React.useState<number>(initialValue);


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate("/");
        return ;
      case 1:
        navigate("/club");
        return ;
      case 2:
        navigate("/my");
        return ;
      default:
        return ;
    }
  };

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="icon label tabs"
      sx={{
        "& .MuiButtonBase-root": {
          "&.MuiTab-textColorPrimary": {
            color: "#A394FF",
          },
        }
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
    </StyledTabs>
  );
};

export default BottomTabBar;
