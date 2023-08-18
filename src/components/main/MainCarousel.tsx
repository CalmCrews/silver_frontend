import { Link, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {styled} from "styled-components";
import SaleMask from "../../assets/advertise/Sale_Mask.png"
import SaleDish from "../../assets/advertise/Sale_Dish.png"
import SaleTrip from "../../assets/advertise/Sale_Trip.png"

const products = [
  {
    id: 1,
    label: "Sale_Mask",
    imgPath:
      SaleMask,
    saleTime:
      "",
    productTitle:
      "",
    productSubtitle: 
      "",
  },
  {
    id: 2,
    label: "Sale_Dish",
    imgPath:
      SaleDish,
    saleTime:
      "",
    productTitle:
      "",
    productSubtitle: 
      "",
  },
  {
    id: 3,
    label: "Sale_Trip",
    imgPath:
      SaleTrip,
    saleTime:
      "",
    productTitle:
      "",
    productSubtitle: 
      "",
  },
];

const CardImage = styled.img`
  width: 100%;
  height: 590px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`
const CoverLayer = styled.div`
  width: 100%;
  height: 590px;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
`

const InfoContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 370px;
  color: #fff;
  text-align: center;
  padding: 50px;
`

const SaleTime = styled.p`
  margin-bottom: 5px;
`

const SaleTitle = styled.h2`
  margin-bottom: 12px;
`
const SaleSubtitle = styled.p`
  
`

const MainCarousel = () => {
  return (
    <Carousel
      sx={{ width: "100%", height: "620px" }} // Optional callback when page changes
      navButtonsAlwaysVisible // Keeps the navigation arrows always visible (optional)
      autoPlay={false}
      indicatorIconButtonProps={{
        style: {
          color: "#D9D9D9",
          padding: "2px",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#a394ff", // Set the color of active pagination dot
          backgroundColor: "transparent", // Remove the background color
        },
      }}
      indicatorContainerProps={{
        style: {
          position: "absolute",
          bottom: "0px",
          textAlign: "center",
          width: "100%",
        },
      }}
    >
      {products.map((product, index) => (
        <Paper
          key={index}
          sx={{ width: "100%", height: "100%", position: "relative" }}
        >
          <Link href={product.id === 1 ? '/products/6' : product.id === 2 ? '/products/13' : '/products/7'}>
            <CardImage
              src={product.imgPath}
              alt={product.label}
            />
            <InfoContainer>
              <SaleTime>{product.saleTime}</SaleTime>
              <SaleTitle>{product.productTitle}</SaleTitle>
              <SaleSubtitle>{product.productSubtitle}</SaleSubtitle>
            </InfoContainer>
          </Link>
        </Paper>
      ))}
    </Carousel>
  );
};

export default MainCarousel;
