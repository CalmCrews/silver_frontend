import React, { useState } from "react";
import DownArrowGrey from "../../assets/icons/DownArrowGrey.png";
import { RargeNoneProfile } from "../main/MyBuyingCardComponents";
import * as style from "../../components/main/MyBuyingCardComponents";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import classes from "./ClubJoinMemberPopup.module.css";
import DownArrowIcon from "../../assets/icons/DownArrowGrey.png";

interface PopupProps {
  members: { id: number; profile_image: string; nickname: string }[];
  onClick: () => void;
}

const ClubJoinMemberPopup: React.FC<PopupProps> = ({ members, onClick }) => {
  const [pointIsClikced, setPointIsClikced] = useState(false);
  const handleClick = () => {
    setPointIsClikced(true);
  };
  return (
    <div className={classes["club-popup-box"]}>
      <div className={classes["popup-title"]}>우리 모임에 함께하는 멤버는</div>
      <div className={classes["popup-member-count"]}>총 {members.length}명</div>
      <div>
        {members.map((member) => (
          <div className={classes["popup-user-info-div"]}>
            <div className={classes["popup-user-info-profile-div"]}>
              <style.RargeNoneProfile index={1} top={2}>
                <Person2RoundedIcon
                  sx={{
                    color: "#fff",
                    width: "45px",
                  }}
                />
              </style.RargeNoneProfile>
              <span className={classes["popup-user-info-profile-div"]}>
                {member.nickname}
              </span>
            </div>
            <button
              className={
                pointIsClikced
                  ? `${classes["popup-user-point"]} ${classes["clicked-grey"]}`
                  : classes["popup-user-point"]
              }
              onClick={handleClick}
            >
              콕 인사하기
            </button>
          </div>
        ))}
      </div>
      {members.length > 5 && (
        <div className={classes["more-see-outer-div"]}>
          <span className={classes["see-more-span"]}>더보기</span>
          <img
            className={classes["grey-arrow"]}
            src={DownArrowIcon}
            alt="DownArrowIcon"
          />
        </div>
      )}
      <button className={classes["see-more-btn"]} onClick={onClick}>
        확인
      </button>
    </div>
  );
};

export default ClubJoinMemberPopup;
