import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
} from "@mui/material";
import { styled } from "styled-components";

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

const BuyingCard = styled(Card)({
  width: "400px",
  marginBottom: "16px",
  position: "relative",
  "&.MuiPaper-root": {
    borderRadius: "24px",
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.40)",
    backgroundColor: "#F5F1FF",
  },
});

const EndDate = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #3a3a3a;
  font-size: 0.87rem;
  background-color: #e7deff;
  padding: 5px 16px;
  border-radius: 50px;
`;

const ProductName = styled.div`
	width: 130px;
	white-space: nowrap;
  color: #3a3a3a;
  font-size: 18px;
  font-weight: 600;
  padding: 3px 0 7px 10px;
	overflow: hidden;
  text-overflow: ellipsis;
`;

const Accomplishment = styled.div`
  width: calc(100% - 25px);
  height: 15px;
  position: relative;
	padding: 7px 0 0 0;
	margin-left: 10px;
`;

type GraphProps = {
  width: string;
  color: string;
};

const GraphDiv = styled.div<GraphProps>`
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  position: absolute;
  left: 0;
  bottom: 5px;
  height: 10px;
  border-radius: 10px;
`;

type PointProp = {
	point: string
}

const CurrentPoint = styled.div<PointProp>`
	position: absolute;
  left: calc(${props => props.point} - 30px);
  bottom: -1px;
	width: 53px;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 12px;
	font-weight: 700;
	border-radius: 30px;
	background-color: #A394FF;
`

type CardProps = {
  id: number;
  end_at: string;
  name: string;
  thumbnail: string;
  accomplished: number;
  participants: { name: string; profile: string }[];
};

const MyBuyingCard = ({
  id,
  end_at,
  name,
  thumbnail,
  accomplished,
  participants,
}: CardProps) => {
  return (
    <BuyingCard>
      <CardActionArea
        href={`/products/detail/${id}`}
        sx={{ width: "100%", height: "100%", padding: "9px" }}
      >
        <header style={{ display: "flex" }}>
          <EndDate>
            구매마감{" "}
            <span style={{ color: "#A394FF", margin: "0 8px 0 15px" }}>|</span>{" "}
            {formatDate(end_at)}
          </EndDate>
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
              width: "90px",
              height: "90px",
              borderRadius: "12px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          />
          <div style={{ marginLeft: "8px", width: "calc(100% - 100px)" }}>
            <ProductName>{name}</ProductName>
            <div
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#E7DEFF",
              }}
            />
						<div style={{ fontSize: "0.875rem", color: "#3a3a3a", margin:"9px 0 9px 10px" }}>
							현재 달성률
						</div>
            <Accomplishment>
              <GraphDiv width="100%" color="#D9D9D9" />
              <GraphDiv width={`${accomplished}%`} color="#A394FF" />
							<CurrentPoint point={`${accomplished}%`}>{accomplished}%</CurrentPoint>
            </Accomplishment>
          </div>
        </CardContent>
      </CardActionArea>
    </BuyingCard>
  );
};

export default MyBuyingCard;
