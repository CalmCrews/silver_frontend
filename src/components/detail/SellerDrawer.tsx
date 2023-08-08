import React from "react";
import { Drawer, Box, IconButton, Link, Divider } from "@mui/material";
import { styled } from "styled-components";
import CloseIcon from "../../assets/icons/CloseIcon.png";
import RightArrow from "../../assets/icons/RightArrowPurple.png";
import DefaultIcon from "../shared/DefaultIcon";
import CustomDivider from "../shared/CustomDivider";

interface MainDrawerProps {
  sellerName: string;
  open: boolean;
  onClose: () => void;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 14px 88px 14px;
`

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: -30px;
  left: calc(50% - 30px);
  border-radius: 30px;
  border: 2px solid #a394ff;
  background-color: #fff;
  object-fit: cover;
  z-index: 300;
`;
const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "28px",
  left: "calc(100% - 59px)",
});

const NowSellingContianer = styled.div`
  width: 350px;
  border-radius: 10px;
  background-color: #F5F1FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #EBE4FF;
`;

const MainInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 30px 0;  
`

const TitleText = styled.h3`
  color: ${props => props.color || '#3a3a3a'};
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
`;

const ContentText = styled.p<{ fontWeight?: number }>`
  color: #909090;
  font-size: 1rem;
  width: 100%;
  text-align: center;
  font-weight: ${props => props.fontWeight || '400'};
`;

const SellerInfo = {
  marketName: "알라마켓",
  sellerName: "코알라",
  isSelling: true,
  sellingProduct: "",
  historyCount: 7,
  historyList: [
    {
      productId: 1,
      productName: "설국열차 팔토시",
      thumbnail: "",
    },
    {
      productId: 1,
      productName: "설국열차 팔토시",
      thumbnail: "",
    },
    {
      productId: 1,
      productName: "설국열차 팔토시",
      thumbnail: "",
    },
    {
      productId: 1,
      productName: "설국열차 팔토시",
      thumbnail: "",
    },
    {
      productId: 1,
      productName: "설국열차 팔토시",
      thumbnail: "",
    },
  ],
  sellerId: "123-12-12345",
  sellerContact: "010-1234-5678",
  sellerEmail: "moyeo@moyoe.com",
};

const SellerDrawer = ({ sellerName, open, onClose }: MainDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: open ? "block" : "none",
        backgroundColor: "#fff",
        "& .MuiDrawer-paper": {
          position: "absolute",
          width: "100%",
          height: "calc(100% - 120px)",
          display: open ? "block" : "none",
          borderRadius: "35px 35px 0px 0px",
          borderTop: "1px solid #A394FF",
          background: "#FFF",
          boxShadow: "0px -2px 10px 0px rgba(0, 0, 0, 0.25)",
          overflow: "visible",
        },
      }}
    >
      <Container>
        <ProfileImage src="" alt="seller_profile" />
        <CloseButton onClick={onClose}>
          <DefaultIcon size="18px" name="close" icon={CloseIcon} />
        </CloseButton>
        <TitleText color="#a394ff" style={{margin: "20px 0"}}>{SellerInfo.marketName}</TitleText>
        {SellerInfo.isSelling && 
          <NowSellingContianer>
            <p style={{fontSize: "16px", margin: "12px 0 5px 0"}}>현재 진행 중인 공동구매 상품이 있어요!</p>
            <Link href={""} sx={{fontSize: "14px", textDecoration: "none", color: "#a394ff", margin: "5px 0 12px 0"}}>클릭하여 공구영상 보러가기 <img width={"7px"} src={RightArrow}/></Link>
          </NowSellingContianer>
        }
        <MainInfoContainer>
          <div className="seller-name" style={{width: "40%"}}>
            <TitleText>{SellerInfo.sellerName}</TitleText>
            <ContentText>대표자명</ContentText>
          </div>
          <Divider orientation="vertical" flexItem sx={{width: "3px"}}/>
          <div className="seller-count" style={{width: "40%"}}>
            <TitleText>{SellerInfo.historyCount}</TitleText>
            <ContentText>모여 상품 판매 횟수</ContentText>
          </div>
        </MainInfoContainer>
        <CustomDivider color="#f0f0f0" width="100%"/>
        <br/>
        <CustomDivider color="#f0f0f0" width="100%"/>
      </Container>
    </Drawer>
  );
};

export default SellerDrawer;
