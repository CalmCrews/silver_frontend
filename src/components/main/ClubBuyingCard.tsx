import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Link,
  Rating,
} from "@mui/material";
import { styled } from "styled-components";
import * as style from "./MyBuyingCardComponents";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import StarIconEmpty from "../../assets/icons/StarIconEmpty.svg";
import StarIconFilled from "../../assets/icons/StarIconFilled.svg";
import DefaultIcon from "../shared/DefaultIcon";

export const EndDate = styled.div`
  display: flex;
  position: absolute;
  left: 20px;
  top: -15px;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #3a3a3a;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid #a394ff;
  padding: 5px 16px;
  border-radius: 50px;
  z-index: 300;
`;

const ParticipantsContainer = styled.div`
  display: flex;
  width: 110px;
  height: 65px;
  padding: 8px 0;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  color: #a394ff;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 3px;
  margin-bottom: 5px;
`;

const DiscountSection = styled.span`
  color: #ff2929;
  font-size: 0.875rem;
  font-weight: 600;
  margin-left: 8px;
`;

type CardProps = {
  id: number;
  end_at: string;
  name: string;
  thumbnail: string;
  discountRate: number;
  price: number;
  score: number;
  participantsNum: number;
  participants: { name: string; profile: string }[];
};

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

function formatForPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const ClubBuyingCard = ({
  id,
  end_at,
  name,
  thumbnail,
  discountRate,
  price,
  score,
  participantsNum,
  participants,
}: CardProps) => {
  const fixedParticipants = [
    {
      name: "코알1",
      profile: "",
    },
    {
      name: "코알2",
      profile: "",
    },
    {
      name: "코알3",
      profile: "",
    },
  ];

  return (
    <Card
      sx={{
        position: "relative",
        width: "330px",
        margin: "20px 8px 20px 5px",
        overflow: "visible",
        "&.MuiPaper-root": {
          borderRadius: "25px",
          border: "2px solid #EBE4FF",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.40)",
          backgroundColor: "#F5F1FF",
        },
      }}
    >
      <EndDate>
        구매마감{" "}
        <span style={{ color: "#A394FF", margin: "0 8px 0 15px" }}>|</span>{" "}
        {formatDate(end_at)}
      </EndDate>
      <CardMedia
        image={thumbnail}
        title={name}
        sx={{
          borderRadius: "25px 25px 0 0",
          height: "190px",
          objectFit: "cover",
          backgroundColor: "#fff",
          borderBottom: "2px solid #A394FF",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "188px",
          borderRadius: "25px 25px 0 0",
          zIndex: "200",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(58, 58, 58, 0.50) 100%)",
        }}
      />
      <CardContent style={{ padding: "14px 14px 8px 14px" }}>
        <InfoSection>
          <div>
            <PriceSection>
              {formatForPrice(price)}원
              <DiscountSection> ~{discountRate}%</DiscountSection>
            </PriceSection>
            <div>{name}</div>
          </div>
          <div style={{color: "#909090"}}>
            <Rating
              defaultValue={score}
              precision={0.1}
              icon={<DefaultIcon size="inherit" name="star_filled" icon={StarIconFilled}/>}
              emptyIcon={<DefaultIcon size="inherit" name="star_empty" icon={StarIconEmpty}/>}
              readOnly
              sx={{
                padding: "5px",
              }}
            />
            {score}
          </div>
        </InfoSection>
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#E7DEFF",
            margin: "8px 0",
          }}
        />
        <div style={{ display: "flex", alignContent: "center" }}>
          <ParticipantsContainer>
            <div
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              {fixedParticipants.map((participant, index) =>
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
          </ParticipantsContainer>
          <CardActions>
            <Link href={`products/${id}`}>
              <button 
                style={{
                  width: "180px",
                  padding: "13px",
                  color: "#fff",
                  backgroundColor: "#a394ff",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  borderRadius: "35px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                나도 참여하기
              </button>
            </Link>
          </CardActions>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubBuyingCard;
