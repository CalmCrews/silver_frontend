import React, { useEffect, useState } from "react";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import { Toolbar, Box, IconButton } from "@mui/material";
import { styled } from "styled-components";
import SellerInfoButton from "../../components/detail/SellerInfoButton";
import CustomDivider from "../../components/shared/CustomDivider";
import SellerDrawer from "../../components/detail/SellerDrawer";
import VideoPlayer from "../../components/detail/VideoPlayer";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";
import ProductInfoSection from "../../components/detail/ProductInfoSection";
import { InfoProps } from "../../components/detail/ProductInfoSection";
import TabPanel from "../../components/detail/TabPanel";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

//임시 데이터
const ProductInfo = {
  id: 1,
  name: "설국열차 팔 토시",
  intro: "팔이 얼 것 같은",
  currentPrice: "4,500",
  originalPrice: "5,000",
  category: "DIGITAL",
  thumbnail: null,
  video: "https://player.vimeo.com/external/855289260.m3u8?s=1dd544d1f31449f83bbadb94d7c4fd3268a0867a&logging=false",
  seller: "코알라",
  sellerProfile: "",
  total: 100,
  end_at: "2023-08-04 / 14:02:59",
  current_buyable_quantity: 21,
};

const DetailToolbar = styled(Toolbar)({
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: "84px",
  textAlign: "center",
  color: "#a394ff",
  fontSize: "1.5rem",
  fontWeight: "700",
});

interface RouteParams {
  productId?: string;
  clubProductId?: string;
}

const ProductDetail = () => {
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const { clubProductId, productId } = useParams<Record<string, string | undefined>>();

  const user = useRecoilValue(loginState);
  const [productData, setProductData] = useState<any | null>(null);
  const [sellerData, setSellerData] = useState<any | null>(null);

  const newAxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  useEffect(() => {
    if (clubProductId) {
      getClubProduct();
    }
    else {
      getProduct();
    }

    async function getProduct() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}products/${productId}`
      );
      console.log(response.data);
      setProductData(response.data);
      setSellerData(response.data.seller);
    }

    async function getClubProduct() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}clubs/clubProducts/${clubProductId}`
      );
      console.log(response.data);
      setProductData(response.data.product);
      setSellerData(response.data.seller);
    }
    
  }, []);//dependency : clubId, productId?

  //props filtering
  const {
    id,
    intro,
    name,
    price,
    end_at,
    current_price,
    discount_rate,
    achievement_rate,
    participant_count,
    participants,
  } = productData || {};
  
  const infoProps: InfoProps = {
    id,
    intro,
    name,
    price,
    end_at,
    current_price,
    discount_rate,
    achievement_rate,
    participant_count,
    participants,
  };
  
  const handleSellerDrawerClose = () => {
    setIsSellerOpen(false);
  };
  

  const handleGoBack = () => {
    window.history.back(); // 이전 페이지로 이동
  };
  


  return (
    <>
      <AppBarWithDrawer />
      <DetailToolbar>
        <IconButton 
          onClick={handleGoBack}
          sx={{
            position: "absolute",
            left: "10px",
          }}
        >
          <ArrowBackIosRoundedIcon/>
        </IconButton>
        상품 상세보기
      </DetailToolbar>
      {productData && (
        <>
          <VideoPlayer
            productTitle={ProductInfo.name}
            sellerProfile={ProductInfo.sellerProfile}
            productId={ProductInfo.id}
            videoUrl={ProductInfo.video}
          />
          <Box sx={{ width: "100%", padding: "12px" }}>
            <SellerInfoButton
              sellerName={productData.seller.name}
              sellerProfile={productData.seller.business_image}
              onClick={() => setIsSellerOpen(true)}
            />
            <CustomDivider color="#f0f0f0" width="100%" />
            <ProductInfoSection {...infoProps} />
            <br/>
            <TabPanel/>
            <div style={{width: "100%", height: "300px"}}>
              <img src="" alt="" />
            </div>
          </Box>
          <SellerDrawer
            sellerInfo={sellerData}
            open={isSellerOpen}
            onClose={handleSellerDrawerClose}
          />
        </>
      )}
    </>
  );
};

export default ProductDetail;
