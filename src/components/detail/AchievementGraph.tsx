import React from "react";
import { styled } from "styled-components";
import DefaultIcon from "../shared/DefaultIcon";
import Flaming from "../../assets/icons/flaming.gif";


const AchievementContainer = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TotalGraphDiv = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  height: 10px;
  border-radius: 10px;
`;

const RateGraphDiv = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  position: absolute;
  left: 0;
  top: calc(50% - 5px);
  background-color: #a394ff;
  height: 10px;
  border-radius: 10px;
`;

const PointDiv = styled.div<{ left: string; color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80px;
  width: 70px;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.color};
  position: absolute;
  left: calc(${(props) => props.left} - 35px);
  top: 20px;
`;

interface AchievementProps {
  achievement_rate: number;
  current_price: number;
  price: number;
}

const AchievementGraph = (props: AchievementProps) => {
  return (
    <AchievementContainer>
      <TotalGraphDiv />
      <RateGraphDiv width={`${props.achievement_rate}%`} />
      <PointDiv left="0%" color="#909090">
        <span>0%</span>
        <span>{props.price}원</span>
      </PointDiv>
      <PointDiv left={`${props.achievement_rate}%`} color="#a394ff">
        <span>0%</span>
        <DefaultIcon icon={Flaming} name="flaming_icon" height="30px" width="auto"/>
        <span>{props.price}원</span>
      </PointDiv>
      <PointDiv left="100%" color="#909090">
        <span>100%</span>
        <span>{Math.round((props.price * 0.65) / 10) * 10}원</span>
      </PointDiv>
    </AchievementContainer>
    
  );
};

export default AchievementGraph;
