import React from "react";
import { Card } from "@mui/material";

type CardProps = {
  id: number;
  end_at: string;
  name: string;
  thumbnail: string;
  discountRate: number;
  price: number;
  score: number;
  participantNum: number;
  participants: { name: string; profile: string }[];
};

const MyBuyingCard = ({
  id,
  end_at,
  name,
  thumbnail,
  discountRate,
  price,
  score,
  participantNum,
  participants,
}: CardProps) => {
  return (
    <Card>
      
      
    </Card>
  );
}
