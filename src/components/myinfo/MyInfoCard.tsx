import React from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Link } from "@mui/material";
import { styled } from "styled-components";
import { userInfo } from "os";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import shadows from "@mui/material/styles/shadows";

interface userInfo {
	name: string;
	userId: number;
	profile: string;
}

interface InfoCardProps {
	userInfo: userInfo;
}



const UserName = styled.div`
	font-size: 1.25rem;
	color: #a394ff;
	font-weight: 600;
	margin-bottom: 5px;
`

const StyledInfoCard = styled(Card)({
	display: "flex",
	width: "calc(100% - 60px)",
	height: "auto",
	padding: "18px 32px",
	border: "2px solid #A394FF",
	backgroundColor: "#FFF",
	filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
	alignItems: "center",
	"&.MuiPaper-root": {
		borderRadius: "25px",
	}
})




const MyInfoCard = ({ userInfo }: InfoCardProps) => {
	return (
		<StyledInfoCard>
			<CardMedia 
				component="img" 
				alt="user_profile" 
				image={userInfo.profile} 
				sx={{
					width: "80px",
					height: "80px",
					borderRadius: "50px",
					border: "1px solid #a394ff",
					marginRight: "22px",
				}}
			/>
			<CardContent
				sx={{
					padding: "0 ",
					"&.MuiCardContent-root": {
						padding: "0",
					}
				}}
			>
				<UserName>{userInfo.name}{" "}<span style={{color: "#3a3a3a"}}>님</span></UserName>
				<Link href="" underline="none" sx={{color: "#909090", fontSize: "o.875rem"}}>
					<EditOutlinedIcon fontSize="small" sx={{position: "relative", top: "5px"}}/>
					{" "}프로필 수정
				</Link>
				<CardActions sx={{padding: "6px 0 0 0"}}>
					<Button
						variant="contained"
						sx={{
							width: "160px",
							height: "28px",
							color: "#fff",
							fontSize: "1rem",
							fontWeight: "600",
							borderRadius: "10px",
							backgroundColor: "#a394ff",
							'&:hover': {
								backgroundColor: "#a394ff",
							},
							'&:active': {
								backgroundColor: "#a394ff",
							},
							'&:focus': {
								backgroundColor: "#a394ff",
							}
						}}
						href="/fontsetting"
					>글자 크기 조정</Button>
				</CardActions>
			</CardContent>
		</StyledInfoCard>
	)
}

export default MyInfoCard;