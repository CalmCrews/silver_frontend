import React from "react";
import { styled } from "styled-components";
import GreyArrow from '../../assets/icons/RightArrowGrey.png'

const StyledButton = styled.button`
	width: 100%;
	padding: 12px;
	display: flex;
	border: none;
	cursor: pointer;
	align-items: center;
	background-color: transparent;
`

const ProfileImage = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	object-fit: cover;
	background-color: #A394FF;
	margin: 0 12px;
`

const SellerName = styled.p`
	color: #000;
	font-size: 16px;
	font-weight: 600;
	margin-right: 10px;
`

const StyledLink = styled.p`
	color: #909090;
	font-size: 16px;
	font-weight: 600;
`

interface SellerInfo {
	sellerName: string;
	sellerProfile: string;
	onClick?: () => void;
}


const SellerInfoButton = ({sellerName, sellerProfile, onClick}: SellerInfo) => {
	return (
		<StyledButton onClick={onClick}>
			<ProfileImage src={`${process.env.REACT_APP_API_URL}${sellerProfile}`} alt="seller_profile"/>
			<SellerName>{sellerName}</SellerName>
			<StyledLink>판매자 정보 <img src={GreyArrow} width={"8px"}/></StyledLink>
		</StyledButton>
	)
}

export default SellerInfoButton;