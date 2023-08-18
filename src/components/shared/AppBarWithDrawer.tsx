import React, { useState, useEffect } from "react";
import HomeAppBar from "./HomeAppBar";
import {
  Badge,
  Box,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Drawer,
} from "@mui/material";
import DefaultIcon from "./DefaultIcon";
import MenuIcon from "../../assets/icons/MenuIcon.png";
import AlarmIcon from "../../assets/icons/AlarmIcon.png";
import MainDrawer from "../drawer/MainDrawer";
import Logo from "../../assets/logo/MoyeoLogo.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";

const AppBarWithDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const location = useLocation();
  const user = useRecoilValue(loginState);

  //알림
  const [notiData, setNotiData] = React.useState<any | null>(null);
  const [isMsgDrawerOpen, setIsMsgDrawerOpen] = useState(false);
  const [selectedMsgContent, setSelectedMsgContent] = useState<any | null>(
    null
  );

  const newAxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const getNotification = async () => {
    try {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}notifications/`
      );
      console.log(response.data);
      setNotiData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuItemClick = (msgContent: any) => {
    setSelectedMsgContent(msgContent);
    setIsMsgDrawerOpen(true);
  };

  useEffect(() => {
    // 주소가 변경되면 Drawer를 닫도록 설정
    setIsDrawerOpen(false);
    getNotification();
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
              sx={{ "& .MuiBadge-badge": { backgroundColor: notiData? "#a394ff" : "transparent" } }}
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
                  paddingBottom: "12px",
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
                <IconButton onClick={handleAlertClose} sx={{ padding: "0" }}>
                  <CloseRoundedIcon sx={{ color: "#fff" }} />
                </IconButton>
              </div>
              {notiData ? (
                notiData.map((msg: any, index: number) => (
                  <MenuItem
                    key={index}
                    sx={{
                      borderBottom: "1px solid #D9D9D9",
                      padding: "15px",
                      color: "#3a3a3a",
                    }}
                    onClick={() => handleMenuItemClick(msg)}
                  >
                    <p
                      style={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        color: "#3a3a3a",
                      }}
                    >
                      {msg.title}
                    </p>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  sx={{
                    borderBottom: "1px solid #D9D9D9",
                    padding: "15px",
                  }}
                  onClick={() => handleMenuItemClick("내용없음")}
                >
                  <p
                    style={{
                      width: "100%",
                      textAlign: "center",
                      color: "#909090",
                    }}
                  >
                    받은 메시지가 없습니다.
                  </p>
                </MenuItem>
              )}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
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
      <Drawer
        anchor="bottom"
        open={isMsgDrawerOpen}
        onClose={() => setIsMsgDrawerOpen(false)}
        variant="persistent"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          display: open ? "block" : "none",
          backgroundColor: "#fff",
          "& .MuiDrawer-paper": {
            position: "absolute",
            width: "100%",
            height: "calc(100% - 120px)",
            display: open ? "block" : "none",
            borderRadius: "35px 35px 0px 0px",
            borderTop: "1px solid #A394FF",
            background: "#FFF",
            boxShadow: "0px -2px 10px 0px rgba(0, 0, 0, 0.25)",
            overflow: "visible",
          },
        }}
      >
        <p></p>
        <button onClick={() => setIsMsgDrawerOpen(false)}>
          닫기
        </button>
      </Drawer>
    </>
  );
};

export default AppBarWithDrawer;
