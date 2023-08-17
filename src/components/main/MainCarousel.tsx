import { Link, Paper } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {styled} from "styled-components";


const products = [
  {
    id: 1,
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    saleTime:
      "8월 3일 (목) 20:00",
    productTitle:
      "풍성한 볼륨감, 우일고데기 함께구매 오픈",
    productSubtitle: 
      "볼륨감의 비밀, 우일이가 알려줄게요",
  },
  {
    id: 2,
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    saleTime:
      "8월 3일 (목) 20:00",
    productTitle:
      "풍성한 볼륨감, 우일고데기 함께구매 오픈",
    productSubtitle: 
      "볼륨감의 비밀, 우일이가 알려줄게요",
  },
  {
    id: 3,
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    saleTime:
      "8월 3일 (목) 20:00",
    productTitle:
      "풍성한 볼륨감, 우일고데기 함께구매 오픈",
    productSubtitle: 
      "볼륨감의 비밀, 우일이가 알려줄게요",
  },
  {
    id: 4,
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    saleTime:
      "8월 3일 (목) 20:00",
    productTitle:
      "풍성한 볼륨감, 우일고데기 함께구매 오픈",
    productSubtitle: 
      "볼륨감의 비밀, 우일이가 알려줄게요",
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
          <Link href={`/products/${product.id}`}>
            <CardImage
              src={product.imgPath}
              alt={product.label}
            />
            <CoverLayer/>
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
