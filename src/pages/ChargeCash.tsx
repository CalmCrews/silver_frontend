import React, { useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../states/userInfo";

interface ChargeType {
  amount: number;
  paymethod: string;
  agreement: boolean;
}

const ChargeCash = () => {
  const [balance, setBalance] = React.useState<number>(0);
  const [charge, setCharge] = React.useState<number>(10000);
  const [paymethod, setPaymethod] = React.useState<string>("s");
  const [agreement, setAgreement] = React.useState<boolean>(false);
  const user = useRecoilValue(loginState);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const [chargeInfo, setChargeInfo] = React.useState<ChargeType>({
    amount: 10000,
    paymethod: "s",
    agreement: false,
  });
  const handleCharge = (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const cash = Number(e.currentTarget.value);
    if (cash === 0) {
      setCharge(10000);
    } else {
      setCharge(cash);
    }
  };

  const handlePaymethod = (e: React.MouseEvent<HTMLLIElement>) => {
    setPaymethod(String(e.currentTarget.getAttribute("value")));
  };

  const handlePutCharge = async () => {
    try {
      const response = await newAxiosInstance.put(
        `${process.env.REACT_APP_API_URL}users/${user.user_id}/charge/`,
        {
          balance: charge,
        }
      );
      console.log(response);
    } catch (error) {
      console.log("handlePutCharge :", error);
    }
  };
  

  useEffect(() => {
    async function getMyBalance() {
      try {
        const response = await newAxiosInstance.get(
          `${process.env.REACT_APP_API_URL}users/${user.user_id}/charge/`
        );
        return response.data;
      } catch (error) {
        console.log("getMyBalance inside :", error);
        return [];
      }
    }
    try {
      getMyBalance().then((returnData) => {
        setBalance(returnData.balance);
      });
    } catch (error) {
      console.log("getMyBalance run :", error);
    }
  }, []);


  return (
    <>
      <div>
        <input
          value={charge}
          name="amount"
          type="number"
          onChange={handleCharge}
        />
        충전 후 잔액: {balance + charge}원
      </div>
      <div>
        {[10000, 20000, 30000, 50000, 100000].map((item) => (
          <button name="amount" onClick={handleCharge} value={item}>
            {item}원
          </button>
        ))}
      </div>
      <div>
        결제수단
        <ol>
          <li value="s" onClick={handlePaymethod}>
            간편결제
          </li>
          <li value="c" onClick={handlePaymethod}>
            신용카드 결제
          </li>
          <li value="p" onClick={handlePaymethod}>
            휴대폰 결제
          </li>
        </ol>
      </div>
      <div>
        <input></input> 주문할 상품의 구매조건을 확인하였으며, 결제 진행에
        동의합니다.
        <button onClick={handlePutCharge}>충전하기</button>
      </div>
    </>
  );
};

export default ChargeCash;
