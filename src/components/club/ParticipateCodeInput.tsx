import React from "react";
import classes from "./ParticipateCodeInput.module.css";
import CopyIcon from "../../assets/icons/Copyicon.png";

interface MyComponentProps {
  onClick: () => void;
  clubCode: string;
  style: React.CSSProperties;
}

const ParticipateCodeInput: React.FC<MyComponentProps> = ({
  onClick,
  clubCode,
  style,
}) => {
  return (
    <div className={classes["outer-code-box"]} style={style}>
      <div className={classes["inner-code-desc"]}>참여코드</div>
      <div className={classes["inner-code-number"]}>{clubCode}</div>
      <div className={classes["inner-code-icon-div"]} onClick={onClick}>
        <img
          src={CopyIcon}
          alt="CopyIcon"
          className={classes["inner-code-icon-img"]}
        />
        <button className={classes["inner-code-icon-text"]}>복사</button>
      </div>
    </div>
  );
};

export default ParticipateCodeInput;
