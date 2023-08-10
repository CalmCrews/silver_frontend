import React from "react";
import { Card, CardMedia } from "@mui/material";

interface VideoCardProps {
	srcUrl: string;
	item: string;
}

const VideoCard = ({ srcUrl, item }: VideoCardProps) => {
	return (
		<Card sx={{width: "100%", height: "323px", borderRadius: "0", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}>
			<CardMedia component={"video"} src={srcUrl} title={item} controls sx={{width: "100%", height: "100%"}}/>
		</Card>
	)
};

export default VideoCard;