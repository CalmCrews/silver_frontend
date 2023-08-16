import React, { useEffect, useState } from "react";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import { Toolbar, Box, Divider } from "@mui/material";
import { styled } from "styled-components";
import SellerInfoButton from "../../components/detail/SellerInfoButton";
import CustomDivider from "../../components/shared/CustomDivider";
import SellerDrawer from "../../components/detail/SellerDrawer";
import VideoPlayer from "../../components/detail/VideoPlayer";
import { useParams } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import axios from "axios";

//임시 데이터
const ProductInfo = {
  id: 1,
  name: "설국열차 팔 토시",
  intro: "팔이 얼 것 같은",
  currentPrice: "4,500",
  originalPrice: "5,000",
  category: "DIGITAL",
  thumbnail: null,
  video: "https://player.vimeo.com/external/430014215.sd.mp4?s=2c2fedb46aa038dcc4664ad42ef6a0e002bf312a&profile_id=165&oauth2_token_id=",
  seller: "코알라",
  sellerProfile: "",
  total: 100,
  end_at: "2023-08-04 / 14:02:59",
  current_buyable_quantity: 21,
};

const DetailToolbar = styled(Toolbar)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "84px",
  textAlign: "center",
  color: "#a394ff",
  fontSize: "1.5rem",
  fontWeight: "700",
});

const ProductDetail = () => {
  const { productId } = useParams();
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  
  const user = useRecoilValue(loginState);
  const [poductData, setProductData] = useState<any[]>([]);

  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  
  
  useEffect(() => {
    console.log(productId);
    console.log(user);
    async function getProduct() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}products/${productId}`
      );
      console.log(response.data);
      setProductData(response.data);
    }
    getProduct();
  }, []);



  const handleSellerDrawerClose = () => {
    setIsSellerOpen(false);
  };

  return (
    <>
      <AppBarWithDrawer />
      <DetailToolbar>상품 상세보기</DetailToolbar>
      <VideoPlayer productTitle={ProductInfo.name} sellerProfile={ProductInfo.sellerProfile} productId={ProductInfo.id} videoUrl={ProductInfo.video}/>
      <Box sx={{ width: "100%", padding: "12px" }}>
        <SellerInfoButton
          sellerName="코알라"
          sellerProfile=""
          onClick={() => setIsSellerOpen(true)}
        />
        <CustomDivider color="#f0f0f0" width="100%" />

      </Box>
      <SellerDrawer
        sellerName={ProductInfo.seller}
        open={isSellerOpen}
        onClose={handleSellerDrawerClose}
      />
    </>
  );
};

export default ProductDetail;
