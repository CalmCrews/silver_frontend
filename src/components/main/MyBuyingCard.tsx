import React from 'react';
import { Card, CardActionArea } from '@mui/material';
import { styled } from 'styled-components';

type CardProps = {
	id: number;
  end_at: string;
  name: string;
  thumbnail: string;
  accomplished: number;
  participants: { name: string; profile: string }[];
};

const BuyingCard = styled(Card)({
	marginBottom: "16px",
	position: "relative",
	"&.MuiPaper-root": {
		borderRadius: "24px",
		boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.40)",
	},
})


const MyBuyingCard = ({ id, end_at, name, thumbnail, accomplished, participants }: CardProps) => {

	
	return (
		<BuyingCard sx={{width: "390px", height: "140px"}}>
			<CardActionArea href={`/products/detail/${id}`} sx={{width: "100%", height: "100%", background: "#F5F1FF"}}>

			</CardActionArea>
		</BuyingCard>

	)
}

export default MyBuyingCard;