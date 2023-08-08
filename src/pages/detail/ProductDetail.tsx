import React, { useState } from "react";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import { Toolbar, Box, Divider } from "@mui/material";
import { styled } from "styled-components";
import VideoCard from "../../components/detail/VideoCard";
import SellerInfoButton from "../../components/detail/SellerInfoButton";
import CustomDivider from "../../components/shared/CustomDivider";
import SellerDrawer from "../../components/detail/SellerDrawer";

//임시 데이터
const ProductInfo = {
	id: 1,
	name: "팔이 얼 것 같은 설국열차 팔 토시",
	currentPrice: "4,500",
	originalPrice: "5,000",
	category: "DIGITAL",
	thumbnail: null, 
	video: null,
	seller: "코알라",
	total: 100,
	end_at: "2023-08-04 / 14:02:59",
	current_buyable_quantity: 21,
}


const DetailToolbar = styled(Toolbar)({
	width: "100%",
	display: "flex",
	justifyContent: "center",
	marginTop: "84px",
	textAlign: "center",
	color: "#a394ff",
	fontSize: "1.5rem",
	fontWeight: "700",
})

const ProductDetail = () => {
	const [isSellerOpen, setIsSellerOpen] = useState(false);

	const handleSellerDrawerClose = () => {
		setIsSellerOpen(false);
	}

	return (
		<>
			<AppBarWithDrawer/>
			<DetailToolbar>상품 상세보기</DetailToolbar>
			<VideoCard srcUrl="" item=""/>
			<Box sx={{width: "100%", padding: "12px"}}>
				<SellerInfoButton sellerName="코알라" sellerProfile="" onClick={() => setIsSellerOpen(true)}/>
				<CustomDivider color="#f0f0f0" width="100%"/>
			</Box>
			<SellerDrawer sellerName={ProductInfo.seller} open={isSellerOpen} onClose={handleSellerDrawerClose}/>
		</>
	)
};

export default ProductDetail;