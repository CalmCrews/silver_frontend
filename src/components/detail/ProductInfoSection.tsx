import React from "react";
import { styled } from "styled-components";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import MenuItem from "@mui/material/MenuItem";
import AchievementGraph from "./AchievementGraph";
import CustomDivider from "../shared/CustomDivider";
import FormButton from "../shared/FormButton";
import { useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


//날짜 변환 함수
function formatDate(input: string) {
  const [datePart, timePart] = input.split(" / ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour] = timePart.split(":").map(Number);

  // 요일 계산
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const dateObj = new Date(year, month - 1, day);
  const weekday = weekdays[dateObj.getDay()];

  // 문자열 재구성
  return `${month}월 ${day}일 (${weekday}) ${hour}시`;
}

//가격 변환 함수
function formatForPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

type Participant = {
  id: number;
  nickname: string;
  profile_image: string;
};

export interface InfoProps {
  id: number;
  intro: string;
  name: string;
  price: number;
  end_at: string;
  current_price?: number;
  discount_rate?: number;
  achievement_rate?: number;
  participant_count?: number;
  participants?: Participant[];
}

const EndDate = styled.div`
  width: 100%;
  text-align: left;
  color: #a394ff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
`;

const ProductName = styled.div`
  width: 100%;
  text-align: left;
  color: #3a3a3a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const PriceContainer = styled.div`
  width: 100%;
  padding: 20px 5px;
`;

const PricePair = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 7px;
`;

const PriceText = styled.div`
  width: 85px;
  color: #3a3a3a;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 10px;
`;

const PriceValue = styled.div`
  display: flex;
  color: #a394ff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-right: 12px;
`;

const RateValue = styled.div`
  display: flex;
  color: #ff2929;
  font-size: 1rem;
  font-weight: 600;
`;

const ParticipantContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  padding: 7px;
`;

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const StyledButton = styled.button<ButtonProps>`
  width: 130px;
  padding: 13px;
  border-radius: 2rem;
  border: none;
  font-size: 1.25rem;
  color: #fff;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey : props.theme.colors.primary};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

interface Club {
  id: number;
  name: string;
  intro: string;
  level: number;
  tag: Array<string>;
}

const ProductInfoSection = (props: InfoProps) => {
  const [clubsData, setClubsData] = React.useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = React.useState("");
  const [selectedClubId, setSelectedClubId] = React.useState(0);
  const user = useRecoilValue(loginState);
  const { clubId, productId } = useParams<Record<string, string | undefined>>();

  const newAxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  //console.log(props);
  React.useEffect(() => {
    if (!props.current_price) {
      getClubs();
    }

    async function getClubs() {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}clubs/`
      );
      console.log(response.data);
      setClubsData(response.data);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    const selectedName = event.target.value as string;
    const club = clubsData.find((item) => item.name === selectedName);
    const selectedId = club ? club.id : 0;
    console.log(selectedId);
    setSelectedClub(selectedName);
    setSelectedClubId(selectedId);
  };

  //상품 구매
  const handleConfirm = async() => {
    const requestBody = {
      quantity: 1,
    }
    try {
      const requestBody = {
        quantity: 1,
      }
      const response = await newAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}products/${props.id}/orders`,
        requestBody,
      );
      console.log("구매완료",response.data);
      setPurchaseCompleted(true);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const [open, setOpen] = React.useState(false);
  const [purchaseCompleted, setPurchaseCompleted] = React.useState(false);
  
  
  const handlePurchaseClick = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
    setPurchaseCompleted(false);
  };


  //상품에 모임 참여
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = React.useState(false);

  const [toClubProduct, setToClubProduct] = React.useState(0);

  const handleClubJoin = async() => {
    try {
      const response = await newAxiosInstance.post(
        `${process.env.REACT_APP_API_URL}products/${productId}/joinProductToClub/?club=${selectedClubId}`,
      );
      console.log(response.data);
      setIsConfirmationDialogOpen(true);
      setIsDialogOpen(false);
      setToClubProduct(response.data.id);
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmationDialogOpen = () => {

     // 처음의 Dialog 닫기
  };

  const handleConfirmationDialogClose = () => {
    setIsConfirmationDialogOpen(false);
    window.location.href = `/clubProducts/${toClubProduct}`;
  };

  const handleCompleteClick = () => {
    if (selectedClub) {
      handleDialogOpen();
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
      }}
    >
      <EndDate>공구 마감 {formatDate(props.end_at)}</EndDate>
      <ProductName>
        {props.intro} {props.name}
      </ProductName>
      {!props.current_price && (
        <>
          <PriceContainer>
            <PricePair>
              <PriceText>정가</PriceText>
              <PriceValue>{formatForPrice(props.price)}원</PriceValue>
            </PricePair>
            <PricePair>
              <PriceText>최대 공구가</PriceText>
              <PriceValue>
                {formatForPrice(Math.round((props.price * 0.65) / 10) * 10)}원
              </PriceValue>
              <RateValue>35%</RateValue>
            </PricePair>
          </PriceContainer>
          <div style={{width: "100%", textAlign: "center", padding: "24px", borderRadius: "15px", border: "2px solid #E7DEFF", backgroundColor: "#F5F1FF"}}>
            <p style={{color: "#a394ff", fontSize: "1rem", marginBottom: "16px"}}>
              함께 구매할 모임원들을 모아볼까요?
            </p>
            <p style={{color: "#3a3a3a", fontSize: "1rem", marginBottom: "30px"}}>
              원하는 모임을 선택해주세요!
            </p>
            <Select
              id="club-select"
              value={selectedClub}
              placeholder="모임을 선택해주세요"
              onChange={handleChange}
              sx={{
                "&.MuiInputBase-root": {
                  width: "100%",
                  borderRadius: "100px",
                  border: "2px solid #a394ff",
                },
              }}
            >
              {clubsData.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <div style={{marginTop: "20px"}}>
              <StyledButton disabled={!selectedClub} onClick={handleCompleteClick}>선택완료</StyledButton>
            </div>
          </div>
          {/* "내 모임에 공유하시겠습니까" Dialog */}
          <Dialog open={isDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>내 모임에 공유하시겠습니까?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                선택한 모임에 공유하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                아니오
              </Button>
              <Button onClick={handleClubJoin} color="primary">
                네
              </Button>
            </DialogActions>
          </Dialog>

          {/* "알림" Dialog */}
          <Dialog open={isConfirmationDialogOpen} onClose={handleConfirmationDialogClose}>
            <DialogTitle>알림</DialogTitle>
            <DialogContent>
              <DialogContentText>
                모임원들에게 알림이 전송되었습니다!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleConfirmationDialogClose} color="primary">
                확인
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      {props.current_price!==undefined && 
      props.discount_rate!==undefined && 
      props.achievement_rate!==undefined &&
      (
        <>
          <PriceContainer>
            <PricePair>
              <PriceText>정가 </PriceText>
              <div
                style={{
                  display: "flex",
                  color: "#909090",
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  textDecorationLine: "line-through",
                }}
              >
                {props.price}원
              </div>
            </PricePair>
            <PricePair>
              <PriceText>현재 공구가 </PriceText>
              <PriceValue>{formatForPrice(props.current_price)}원</PriceValue>
              <RateValue>{formatForPrice(props.discount_rate * 100)}%</RateValue>
            </PricePair>
            <PricePair>
              <PriceText>최대 공구가</PriceText>
              <PriceValue>
                {Math.round((props.price * 0.65) / 10) * 10}원
              </PriceValue>
              <RateValue>35%</RateValue>
            </PricePair>
          </PriceContainer>
          <div style={{ width: "100%", padding: "10px" }}></div>
          <CustomDivider width="100%" color="#f0f0f0"/>
          <div style={{ width: "100%", padding: "10px 35px" }}>
            <AchievementGraph
              achievement_rate={props.achievement_rate}
              current_price={props.current_price}
              price={props.price}
            />
          </div>
          <div style={{padding: "0 10px"}}>
            <FormButton onClick={handlePurchaseClick}>구매하기</FormButton>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>구매 확인</DialogTitle>
            <DialogContent>
              {purchaseCompleted ? (
                <DialogContentText>구매가 완료되었습니다.</DialogContentText>
              ) : (
                <DialogContentText>구매하시겠습니까?</DialogContentText>
              )}
            </DialogContent>
            <DialogActions>
              {!purchaseCompleted && (
                <Button onClick={handleConfirm} color="primary">
                  확인
                </Button>
              )}
              <Button onClick={handleClose} color="primary">
                닫기
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ProductInfoSection;
