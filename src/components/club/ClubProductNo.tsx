import React from "react";
import SadFaceImage from "../../assets/faceImage/SadFaceImage.png";
import classes from "./ClubProductNo.module.css";

const ClubProductNo = () => {
  return (
    <div className={classes[""]}>
      <img
        className={classes["sad-head-img"]}
        src={SadFaceImage}
        alt="SadFaceImage"
      />
      <div className={classes["no-product-text-div"]}>
        <span className={classes["no-product-span"]}>
          아직 참여 중인 함께구매 상품이 없어요
        </span>
        <span className={classes["no-product-span"]}>
          상품을 구경해 볼까요?
        </span>
      </div>
    </div>
  );
};

export default ClubProductNo;
