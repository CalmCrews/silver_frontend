import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import { useNavigate, useLocation } from "react-router-dom";

import DefaultContainer from "../../components/shared/DefaultContainer";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import { Toolbar } from "@mui/material";
import CheckedBox from "../../assets/icons/CheckedIcon.png";
import NotChecked from "../../assets/icons/NotCheckedIcon.png";

import classes from "./ChargeCash.module.css";

interface ChargeType {
  amount: number;
  paymethod: string;
  agreement: boolean;
}

const ChargeCash = () => {
  const [isTouced, setIsTouced] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [balance, setBalance] = React.useState<number>(0);
  const [charge, setCharge] = React.useState<any>("");
  const [paymethod, setPaymethod] = React.useState<string>("s");
  const [agreement, setAgreement] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const user = useRecoilValue(loginState);
  const newAxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  function formatForPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function formReturnPrice(value: any) {
    return value.split(",").join("");
  }

  const [chargeInfo, setChargeInfo] = React.useState<ChargeType>({
    amount: 10000,
    paymethod: "s",
    agreement: false,
  });
  const handleCharge = (
    e: React.MouseEvent<HTMLButtonElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    const cash = formReturnPrice(e.currentTarget.value);
    if (!Number(cash) && Number(cash) !== 0) {
      console.log(cash, Number(cash));
      return;
    }
    if (cash === "0" || cash === "") {
      setCharge("");
    } else {
      setCharge(cash);
    }
  };

  const handlePaymethod = (e: React.MouseEvent<HTMLLIElement>) => {
    setPaymethod(String(e.currentTarget.getAttribute("value")));
  };

  const handlePutCharge = async () => {
    if (charge === "" || Number(charge) < 10000) {
      alert("최소충전 금액은 10000원 입니다");
      setCharge("");
      return;
    }
    try {
      const response = await newAxiosInstance.put(
        `${process.env.REACT_APP_API_URL}users/${user.user_id}/charge/`,
        {
          balance: charge,
        }
      );
      console.log(response);
      setCharge("");
      navigate("/my");
    } catch (error) {
      console.log("handlePutCharge :", error);
      setCharge("");
    }
  };

  const handleConfirmChecked = () => {
    setIsChecked((prevValue) => !prevValue);
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
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <div className={classes["charge-input-outer-div"]}>
          <div className={classes["charge-title-div"]}>충전금액</div>
          <input
            value={charge !== "" ? formatForPrice(Number(charge)) : ""}
            name="amount"
            type="text"
            onChange={handleCharge}
            className={classes["input-money"]}
            placeholder="10,000원 이상 직접 입력"
          />
          <div className={classes["input-after-money"]}>
            <span className={classes["input-now-text"]}>충전 후 잔액:</span>
            <span className={classes["input-now-money"]}>
              {`${formatForPrice(balance + Number(charge))} 원`}
            </span>
          </div>
        </div>
        <div className={classes["charge-section"]}>
          {[10000, 20000, 30000, 50000, 100000].map((item) => (
            <button
              className={classes["charge-button"]}
              name="amount"
              onClick={handleCharge}
              value={item}
            >
              {formatForPrice(item)}원
            </button>
          ))}
        </div>
        <div className={classes["sub-title-div"]}>결제수단</div>
        <ul className={classes["ul-style"]}>
          <li
            className={classes["li-style"]}
            value="s"
            onClick={handlePaymethod}
          >
            간편결제
          </li>
          <li
            className={classes["li-style"]}
            value="c"
            onClick={handlePaymethod}
          >
            신용카드 결제
          </li>
          <li
            className={classes["li-style"]}
            value="p"
            onClick={handlePaymethod}
          >
            휴대폰 결제
          </li>
        </ul>
        <div className={classes["check-box-div"]}>
          <img
            src={isChecked ? CheckedBox : NotChecked}
            alt="isCheckedImage"
            onClick={handleConfirmChecked}
            className={classes["check-img"]}
          />
          <div>
            <span className={classes["check-txt-span"]}>
              주문할 상품의 구매조건을 확인하였으며,
            </span>
            <span className={classes["check-txt-span"]}>
              결제 진행에 동의합니다.
            </span>
          </div>
        </div>
        <button
          className={
            isChecked
              ? classes["charge-btn"]
              : `${classes["charge-btn"]} ${classes["not-checked"]}`
          }
          onClick={handlePutCharge}
        >
          충전하기
        </button>
      </DefaultContainer>
    </>
  );
};

export default ChargeCash;
