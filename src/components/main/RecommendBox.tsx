import React from "react";
import { Box, Rating, IconButton } from "@mui/material";
import { styled } from "styled-components";
import StarIconEmpty from "../../assets/icons/StarIconEmpty.svg";
import StarIconFilled from "../../assets/icons/StarIconFilled.svg";
import DefaultIcon from "../shared/DefaultIcon";
import CustomDivider from "../shared/CustomDivider";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

function formatForPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const StyledBox = styled(Box)`
  width: 100%;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  color: #3a3a3a;
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

type BoxProps = {
  id: number;
  intro: string;
  name: string;
  thumbnail: string;
  discountRate: number;
  price: number;
  score: number;
};

const RecommendBox = ({
  id,
  intro,
  name,
  thumbnail,
  discountRate,
  price,
  score,
}: BoxProps) => {
  return (
    <StyledBox>
      <div
        style={{
          width: "100%",
          height: "190px",
          backgroundColor: "#fff",
          padding: "10px",
          display: "flex",
        }}
      >
        <img
          src={thumbnail}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            border: "2px solid #F0F0F0",
            objectFit: "contain",
          }}
        />
      </div>
      <InfoSection>
        <div>
          <PriceSection>
            {formatForPrice(price)}원
            <DiscountSection> ~{discountRate}%</DiscountSection>
          </PriceSection>
        </div>
        <div style={{ color: "#909090" }}>
          <Rating
            defaultValue={score}
            precision={0.1}
            icon={
              <DefaultIcon
                size="inherit"
                name="star_filled"
                icon={StarIconFilled}
              />
            }
            emptyIcon={
              <DefaultIcon
                size="inherit"
                name="star_empty"
                icon={StarIconEmpty}
              />
            }
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
          display: "flex",
          padding: "0 0 0 15px",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "1.125rem",
          marginBottom: "10px",
        }}
      >
        <div
          style={{ textOverflow: "ellipsis", width: "275px", color: "#3a3a3a" }}
        >
          {intro} {name}
        </div>
        <IconButton href={`/products/${id}`}>
          <ArrowForwardIosRoundedIcon
            style={{ color: "#A394FF" }}
            fontSize="inherit"
          />
        </IconButton>
      </div>
      <CustomDivider color="#F0F0F0" width="100%" />
      <br/>
    </StyledBox>
  );
};

export default RecommendBox;
