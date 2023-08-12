import React, { useState } from "react";
import classes from "./KeywordComponet.module.css";

interface CustomButtonProps {
  id: string;
  innerText: string;
  onClick: (id: string) => void;
}

const KeywordComponet: React.FC<CustomButtonProps> = ({
  id,
  innerText,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    // 버튼을 클릭했을 때 실행될 함수
    setIsClicked((prev) => !prev);
    onClick(id);
  };
  return (
    <div
      className={
        !isClicked ? classes["outer-div"] : classes["outer-div-clicked"]
      }
      id={id}
      onClick={handleClick}
    >
      {innerText}
    </div>
  );
};

export default KeywordComponet;
