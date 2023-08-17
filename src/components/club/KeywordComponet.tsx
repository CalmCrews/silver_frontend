import React, { useState, useEffect } from "react";
import classes from "./KeywordComponet.module.css";

interface CustomButtonProps {
  id: string;
  innerText: string;
  count: number;
  allowList: string[];
  onClick: (id: string) => void;
}

const KeywordComponet: React.FC<CustomButtonProps> = ({
  id,
  innerText,
  count,
  allowList,
  onClick,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [amIOk, setAmIOk] = useState(true);
  const handleClick = () => {
    if (count >= 3 && !isClicked) {
      return;
    }
    // 버튼을 클릭했을 때 실행될 함수
    setIsClicked((prev) => {
      return !prev;
    });
    onClick(id);
  };
  useEffect(() => {
    if (count >= 3) {
      allowList.includes(id) ? setAmIOk(true) : setAmIOk(false);
    }
  }, [allowList]);

  const divClasses = `${
    isClicked ? classes["outer-div-clicked"] : classes["outer-div"]
  } ${amIOk ? "" : classes["click-no"]}`;

  return (
    <div className={divClasses} id={id} onClick={handleClick}>
      {innerText}
    </div>
  );
};

export default KeywordComponet;
