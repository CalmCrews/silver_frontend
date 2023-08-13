import React from "react";

interface ChargeType {
  amount: number;
  paymethod: string;
  agreement: boolean;
}

const ChargeCash = () => {
  const balance: number = 100;
  const [charge, setCharge] = React.useState<number>(10000);
  const [paymethod, setPaymethod] = React.useState<string>("s");
  const [agreement, setAgreement] = React.useState<boolean>(false);

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
        <button>충전하기</button>
      </div>
    </>
  );
};

export default ChargeCash;
