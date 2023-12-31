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
  const [clubData, setClubData] = useState<any | null>(null);
  const [participantsData, setParticipantsData] = useState<any | null>(null);

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

    //일반 상품
    async function getProduct() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}products/${productId}`
      );
      console.log(response.data);
      setProductData(response.data);
      setSellerData(response.data.seller);
    }

    //모임내 상품
    async function getClubProduct() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}clubs/clubProducts/${clubProductId}`
      );
      console.log(response.data);
      setProductData(response.data.product);
      setSellerData(response.data.seller);
      setClubData(response.data.club);
      setParticipantsData(response.data.participants);
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
    is_not_buyable,
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
    is_not_buyable,
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
            productTitle={productData.name}
            sellerProfile={sellerData.business_image}
            productId={productData.id}
            videoUrl={productData.video}
          />
          <Box sx={{ width: "100%", padding: "12px" }}>
            <SellerInfoButton
              sellerName={sellerData.name}
              sellerProfile={sellerData.business_image}
              onClick={() => setIsSellerOpen(true)}
            />
            <CustomDivider color="#f0f0f0" width="100%" />
            <ProductInfoSection info={infoProps} club_Id={clubData ? clubData.id : null} participants={participantsData}/>
            <br/>
            <TabPanel thumbnail={productData.thumbnail}/>
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
