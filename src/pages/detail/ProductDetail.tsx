import React from "react";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import { Toolbar } from "@mui/material";
import { styled } from "styled-components";
import VideoCard from "../../components/detail/VideoCard";

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
	return (
		<>
			<AppBarWithDrawer/>
			<DetailToolbar>상품 상세보기</DetailToolbar>
			<VideoCard srcUrl="" item=""/>
		</>
	)
};

export default ProductDetail;