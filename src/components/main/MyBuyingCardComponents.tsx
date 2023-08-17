import React from "react";
import { Card } from "@mui/material";
import { styled } from "styled-components";



export const BuyingCard = styled(Card)({
  width: "100%",
  marginBottom: "16px",
  position: "relative",
  "&.MuiPaper-root": {
    borderRadius: "24px",
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.40)",
    backgroundColor: "#F5F1FF",
  },
});

export const EndDate = styled.div`
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

export const ProductName = styled.div`
  width: 130px;
  white-space: nowrap;
  color: #3a3a3a;
  font-size: 18px;
  font-weight: 600;
  padding: 3px 0 7px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Accomplishment = styled.div`
  width: calc(100% - 55px);
  height: 15px;
  position: relative;
  padding: 7px 0 0 0;
  margin-left: 10px;
`;

type GraphProps = {
  width: string;
  color: string;
};

export const GraphDiv = styled.div<GraphProps>`
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  position: absolute;
  left: 0;
  bottom: 5px;
  height: 10px;
  border-radius: 10px;
`;

type PointProp = {
  point: string;
};

export const CurrentPoint = styled.div<PointProp>`
  position: absolute;
  left: calc(${(props) => props.point} - 22px);
  bottom: -4px;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

export const CurrentValue = styled.div`
  color: #a394ff;
  font-size: 1rem;
  font-weight: 700;
  position: relative;
  left: calc(100% - 37px);
  bottom: 20px;
`;

export const ParticipantsContainer = styled.div`
  display: flex;
  position: absolute;
  width: 110px;
  height: 49px;
  top: 25px;
  right: 0;
`;

type ProfileProp = {
  index: number;
  top?: number;
};

export const MiniProfile = styled.img<ProfileProp>`
  position: absolute;
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid #fff;
  object-fit: cover;
  left: ${(props) => props.index * 15 + 5}px;
  z-index: ${(props) => 1000 - props.index};
  background-color: #d9d9d9;
`;

export const NoneProfile = styled.div<ProfileProp>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  overflow: hidden;
  border-radius: 20px;
  border: 2px solid #fff;
  left: ${(props) => props.index * 15 + 5}px;
  z-index: ${(props) => 1000 - props.index};
  background-color: #d9d9d9;
`;

export const RargeProfile = styled.img<ProfileProp>`
  position: absolute;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 999px;
  border: 2px solid #fff;
  object-fit: cover;
  left: ${(props) => props.index * 20 + 5}px;
  z-index: ${(props) => 1000 - props.index};
  background-color: #d9d9d9;
`;

export const RargeNoneProfile = styled.div<ProfileProp>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 999px;
  border: 2px solid #fff;
  left: ${(props) => props.index * 20 + 5}px;
  top: ${(props) => props.top}px;
  z-index: ${(props) => 1000 - props.index};
  background-color: #d9d9d9;
`;

export const Participating = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.9rem;
  color: #3a3a3a;
  font-weight: 600;
`;
