import React, { useState, useEffect } from "react";
import HomeAppBar from "./HomeAppBar";
import { Badge, Box, IconButton, Link, Menu, MenuItem } from "@mui/material";
import DefaultIcon from "./DefaultIcon";
import MenuIcon from "../../assets/icons/MenuIcon.png";
import AlarmIcon from "../../assets/icons/AlarmIcon.png";
import MainDrawer from "../drawer/MainDrawer";
import Logo from "../../assets/logo/MoyeoLogo.png";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useLocation } from "react-router-dom";

const AppBarWithDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const location = useLocation();

  useEffect(() => {
    // 주소가 변경되면 Drawer를 닫도록 설정
    setIsDrawerOpen(false);
  }, [location.pathname, location.search]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleAlertClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAlertClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <HomeAppBar>
        <>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              padding: "22px",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              sx={{ width: "40px", height: "40px" }}
              onClick={handleDrawerOpen}
            >
              <DefaultIcon
                icon={MenuIcon}
                width={"32px"}
                height={"22px"}
                name={"menu_icon"}
              />
            </IconButton>
            <Link href="/">
              <DefaultIcon
                icon={Logo}
                width="52px"
                height="40px"
                name="Moyeo-Logo"
              />
            </Link>
            <Badge
              variant="dot"
              sx={{ "& .MuiBadge-badge": { backgroundColor: "#a394ff" } }}
            >
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={handleAlertClick}
              >
                <DefaultIcon
                  icon={AlarmIcon}
                  size={"32px"}
                  name={"menu_icon"}
                />
              </IconButton>
            </Badge>
            <Menu
              id="alert-list"
              aria-labelledby="alert-list"
              anchorEl={anchorEl}
              open={open}
              onClose={handleAlertClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                "& .MuiPopover-paper": {
                  width: "310px",
                  backgroundColor: "#fff",
                  borderRadius: "25px",
                  border: "2px solid #A394FF",
                },
                "& .MuiList-root": {
                  padding: "0",
                },
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  height: "auto",
                  borderRadius: "23px 23px 0px 0px",
                  backgroundColor: "#A394FF",
                  color: "#fff",
                  padding: "12px 24px",
                  fontSize: "1.25rem",
                  justifyContent: "space-between",
                }}
              >
                알림
                <IconButton onClick={handleAlertClose} sx={{padding: "0"}}>
                  <CloseRoundedIcon sx={{color: "#fff"}} />
                </IconButton>
              </div>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
              <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <button
                  onClick={handleAlertClose}
                  style={{
                    width: "122px",
                    height: "50px",
                    borderRadius: "25px",
                    backgroundColor: "#a394ff",
                    color: "#fff",
                    fontSize: "20px",
                    fontWeight: "600",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  확인
                </button>
              </div>
            </Menu>
          </Box>
        </>
      </HomeAppBar>
      <MainDrawer open={isDrawerOpen} onClose={handleDrawerClose}></MainDrawer>
    </>
  );
};

export default AppBarWithDrawer;
