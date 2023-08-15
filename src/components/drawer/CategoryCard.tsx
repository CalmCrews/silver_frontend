import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material"

const StyledCard = styled(Card)({
  position: "relative",
  width: "170px",
  height: "130px",
  borderRadius: "15px 15px 50px 15px",
  background: "linear-gradient(180deg, #A394FF 0%, rgba(163, 148, 255, 0.67) 42.71%)",
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
})

const StyledMedia = styled("div")({
  position: "absolute",
  width: "90px",
  height: "90px",
  borderRadius: "50px",
  right: "5px",
  bottom: "5px",
  padding: "20px",
  backgroundColor: "#fff",
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
})

const StyledTypo = styled(Typography)({
  color: "#fff",
  fontSize: "1.25rem",
  fontWeight: "700",
})

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

const CategoryCard = ({ title, imageUrl } : CategoryCardProps ) => {
  return (
    <StyledCard sx={{ maxWidth: "170px" }}>
      <CardContent sx={{ width : "86px", padding: "16px 0 0 16px" }}>
        <StyledTypo gutterBottom variant="h5">
          {title}
        </StyledTypo>
      </CardContent>
      <StyledMedia>
        <img src={imageUrl} alt="Image" style={{height: "100%", width: "auto"}}/>
      </StyledMedia>
    </StyledCard>
  );
};

export default CategoryCard;
