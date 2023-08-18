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
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "../../assets/icons/CloseIcon.png";
import { styled } from "styled-components";
import ClubBuyingCard from "../main/ClubBuyingCard";
import MessageDrawer from "./MessageDrawer";

const CloseButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 14px 88px 14px;
`;

const AppBarWithDrawer = () => {
  //카테고리 서랍
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //알림 메뉴
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const location = useLocation();
  const user = useRecoilValue(loginState);

  //알림
  const [notiData, setNotiData] = React.useState<any | null>(null);
  const [isMsgDrawerOpen, setIsMsgDrawerOpen] = useState(false);
  const [notiId, setNotiId] = useState(0);

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


  const handleMenuItemClick = (id: number) => {
    setNotiId(id);
    setAnchorEl(null);
    handleMsgDrawerOpen();
  };

  useEffect(() => {
    // 주소가 변경되면 Drawer를 닫도록 설정
    setIsDrawerOpen(false);
    getNotification();
  }, [location.pathname, location.search]);

  //카테고리 서랍
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  //알림 메뉴 열기
  const handleAlertClick = (event: React.MouseEvent<HTMLElement>) => {
    getNotification();
    setAnchorEl(event.currentTarget);
  };

  //알림 메뉴 닫기
  const handleAlertClose = () => {
    setAnchorEl(null);
  };

  //알림 메시지

  const handleMsgDrawerOpen = () => {
    setIsMsgDrawerOpen(true);
  };

  const handleMsgDrawerClose = () => {
    setIsMsgDrawerOpen(false);
    console.log("drawer close")
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
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: notiData ? "#a394ff" : "transparent",
                },
              }}
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
                notiData.slice(0, 6).map((msg: any, index: number) => (
                  <MenuItem
                    key={index}
                    sx={{
                      width: "100%",
                      borderBottom: "1px solid #D9D9D9",
                      padding: "15px",
                      color: "#3a3a3a",
                    }}
                    onClick={() => handleMenuItemClick(msg.id)}
                  >
                    <div
                      style={{
                        display: "block",
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "#3a3a3a",
                        alignItems: "center",
                      }}
                    >
                      {msg.is_read === false && (
                        <CircleIcon
                          sx={{ color: "#FF4B4B", fontSize: "10px" }}
                        />
                      )}
                      &nbsp;
                      {msg.title}
                    </div>
                  </MenuItem>
                ))
              ) : (
                <MenuItem
                  sx={{
                    borderBottom: "1px solid #D9D9D9",
                    padding: "15px",
                  }}
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
      <MessageDrawer messageInfo={notiId} open={isMsgDrawerOpen} onClose={handleMsgDrawerClose}/>
    </>
  );
};

export default AppBarWithDrawer;
