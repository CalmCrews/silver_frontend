import React, { useState } from "react";
import * as style from "../../components/main/MyBuyingCardComponents";
import classes from "./joinMemberPerson.module.css";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";

interface PopupProps {
  member: { id: number; profile_image: string; nickname: string };
}
const PopUpPerson: React.FC<PopupProps> = ({ member }) => {
  const [pointIsClikced, setPointIsClikced] = useState(false);
  const handleClick = () => {
    setPointIsClikced((prevValue) => !prevValue);
  };

  return (
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
  );
};

export default PopUpPerson;
