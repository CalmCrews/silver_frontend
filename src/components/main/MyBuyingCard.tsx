import React from "react";
import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import { styled } from "styled-components";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import * as style from "./MyBuyingCardComponents";
import Flaming from "../../assets/icons/flaming.gif"
import DefaultIcon from "../shared/DefaultIcon";

function formatDate(input: string) {
  const [datePart, timePart] = input.split(" / ");
  const [year, month, day] = datePart.split("-").map(Number);

  // 요일 계산
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(year, month - 1, day);
  const weekday = weekdays[dateObj.getDay()];

  // 문자열 재구성
  return `${month}월 ${day}일 (${weekday}) ${timePart}시`;
}

type CardProps = {
  id: number;
  end_at: string;
  name: string;
  thumbnail: string;
  accomplished: number;
  participantsNum: number;
  participants: { name: string; profile: string }[];
};

const MyBuyingCard = ({
  id,
  end_at,
  name,
  thumbnail,
  accomplished,
  participantsNum,
  participants,
}: CardProps) => {
  return (
    <style.BuyingCard>
      <CardActionArea
        href={`/products/detail/${id}`}
        sx={{ width: "100%", height: "100%", padding: "15px 15px 5px 15px" }}
      >
        <header style={{ display: "flex" }}>
          <style.EndDate>
            구매마감{" "}
            <span style={{ color: "#A394FF", margin: "0 8px 0 15px" }}>|</span>{" "}
            {formatDate(end_at)}
          </style.EndDate>
        </header>
        <CardContent
          sx={{
            padding: "0",
            marginTop: "9px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <CardMedia
            component="img"
            image={thumbnail}
            alt={name}
            sx={{
              marginTop: "8px",
              width: "90px",
              height: "90px",
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          />
          <div style={{ margin: "10px 0 0 8px", width: "calc(100% - 100px)" }}>
            <style.ProductName>{name}</style.ProductName>
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#E7DEFF",
              }}
            />
            <div
              style={{
                fontSize: "0.875rem",
                color: "#3a3a3a",
                margin: "9px 0 9px 10px",
              }}
            >
              현재 달성률
            </div>
            <style.Accomplishment>
              <style.GraphDiv width="100%" color="#D9D9D9" />
              <style.GraphDiv width={`${accomplished}%`} color="#A394FF" />
              <style.CurrentPoint point={`${accomplished}%`}>
                <DefaultIcon icon={Flaming} name="flaming_icon" height="100%" width="100%"/>
              </style.CurrentPoint>
            </style.Accomplishment>
            <style.CurrentValue>{accomplished}%</style.CurrentValue>
          </div>
          <style.ParticipantsContainer>
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {participants.map((participant, index) =>
                participant.profile ? (
                  <style.MiniProfile
                    src={participant.profile}
                    alt={participant.name}
                    index={index}
                  />
                ) : (
                  <style.NoneProfile index={index}>
                    <Person2RoundedIcon sx={{ color: "#fff", width: "17px" }} />
                  </style.NoneProfile>
                )
              )}
              <AddRoundedIcon
                sx={{
                  position: "absolute",
                  left: "57px",
                  width: "22px",
                  color: "#d9d9d9",
                  fontWeight: "700",
                }}
              />
              <style.Participating>
                <p style={{ color: "#a394ff" }}>{participantsNum}명</p>
                &nbsp;참여중
              </style.Participating>
            </div>
          </style.ParticipantsContainer>
        </CardContent>
      </CardActionArea>
    </style.BuyingCard>
  );
};

export default MyBuyingCard;
