import React, { useState, useRef } from "react";
import classes from "./ClubIsJoinedPopup.module.css";

interface PopupProps {
  isLogedIn: boolean;
  club_name: string;
}

const ClubIsJoinedPopup: React.FC<PopupProps> = ({ isLogedIn, club_name }) => {
  const [clubCode, setClubCode] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleOnChange = () => {
    if (inputRef.current) {
      setClubCode(inputRef.current.value);
    }
  };
  return (
    <div className={classes["popup-outer-div"]}>
      <div className={classes["popup-title-div"]}>
        <span>{`"${club_name}"`}</span>
        <span>모임에 초대되셨나요?</span>
        <span>로그인 후 모임에 참여해보세요!</span>
      </div>
      {isLogedIn ? (
        <div>
          <input
            type="text"
            value={clubCode}
            ref={inputRef}
            onChange={handleOnChange}
          />
          <span>참여코드</span>
          <button>입력완료</button>
        </div>
      ) : (
        <button className={classes["popup-login-btn"]}>로그인 하러가기</button>
      )}
    </div>
  );
};

export default ClubIsJoinedPopup;
