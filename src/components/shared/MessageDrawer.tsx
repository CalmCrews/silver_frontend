import React, { useEffect, useState } from "react";
import { Drawer, Box, IconButton, Link, Divider, Button } from "@mui/material";
import { styled } from "styled-components";
import CloseIcon from "../../assets/icons/CloseIcon.png";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import ClubBuyingCard from "../main/ClubBuyingCard";
import DefaultIcon from "./DefaultIcon";

interface MainDrawerProps {
  messageInfo: number;
  open: boolean;
  onClose: () => void;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 14px 88px 14px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -30px;
  left: calc(50% - 30px);
  border-radius: 30px;
  border: 2px solid #a394ff;
  background-color: #fff;
  object-fit: cover;
  z-index: 300;
`;

const CloseButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const MessageDrawer = ({ messageInfo, open, onClose }: MainDrawerProps) => {
  const [msgContent, setMsgContent] = useState<any | null>(null);

  const user = useRecoilValue(loginState);

  const newAxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  useEffect(() => {
    getMsgContent();
  }, [open]);

  const getMsgContent = async () => {
    if (messageInfo !== 0) {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}notifications/${messageInfo}`
        );
        console.log("msg: ", response.data);
        setMsgContent(response.data);
        console.log("get complete");
      } catch (error) {
        console.log(error);
      }
    }
  };
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
      <Container>
        {msgContent && (
          <>
            <div
              style={{
                padding: "24px",
                width: "100%",
                textAlign: "center",
                color: "#A394FF",
                fontSize: "30px",
              }}
            >
              알림
            </div>
            <CloseButton onClick={onClose}>
              <DefaultIcon size="18px" name="close" icon={CloseIcon} />
            </CloseButton>
            <div
              style={{
                width: "100%",
                padding: "25px 50px",
                textAlign: "center",
                color: "#3a3a3a",
                fontSize: "1.25rem",
              }}
            >
              <p style={{width: "100%", color: "#a394ff", lineHeight: "160%" }}>
                {msgContent.notification.message.substring(0, msgContent.notification.message.indexOf("모임원이"))}
              </p>
              <p style={{width: "100%", color: "#3a3a3a", lineHeight: "160%" }}>
                {msgContent.notification.message.substring(msgContent.notification.message.indexOf("모임원이"))}
              </p>
            </div>
            <ClubBuyingCard
              id={msgContent.club_product.product.id}
              end_at={msgContent.club_product.product.end_at}
              name={msgContent.club_product.product.name}
              thumbnail={msgContent.club_product.product.thumbnail}
              discountRate={msgContent.club_product.product.discount_rate}
              price={msgContent.club_product.product.price}
              score={msgContent.club_product.product.review_score}
              participantsNum={
                msgContent.club_product.product.participant_count
              }
              participants={msgContent.club_product.participants}
            />
          </>
        )}
      </Container>
    </Drawer>
  );
};

export default MessageDrawer;
