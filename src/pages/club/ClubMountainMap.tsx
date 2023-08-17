import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import MapImage from "../../assets/clubMap/MapPage.png";
import MapFlag from "../../assets/clubMap/RedFlag.png";

import classes from "./style/ClubMountainMap.module.css";

const ClubMountainMap = () => {
  const location = useLocation();
  const [flagPosition, setFlagPosition] = useState("0");
  const { club_rank } = location.state || {};

  useEffect(() => {
    switch (club_rank) {
      case 0:
        setFlagPosition("0");
        break;
      case 5:
        setFlagPosition("flag-first");
        break;
      case 4:
        setFlagPosition("flag-second");
        break;
      case 3:
        setFlagPosition("flag-third");
        break;
      case 2:
        setFlagPosition("flag-fourth");
        break;
      case 1:
        setFlagPosition("flag-fifth");
        break;
    }
  }, [club_rank]);

  return (
    <>
      <DefaultContainer>
        <Toolbar sx={{ height: "60px" }} />
        <AppBarWithDrawer />
        <div className={classes["map-whole"]}>
          <div className={classes["map-image-outer-div"]}>
            {flagPosition === "0" && (
              <img
                src={MapFlag}
                alt="MapFlag"
                className={`${classes["map-object-flag"]} ${classes["flag-fifth"]}`}
              />
            )}
            <div
              className={`${classes["map-object-name-space"]} ${classes["mountain-first"]}`}
            >
              한라산
            </div>
            <div
              className={`${classes["map-object-name-space"]} ${classes["mountain-second"]}`}
            >
              지리산
            </div>
            <div
              className={`${classes["map-object-name-space"]} ${classes["mountain-third"]}`}
            >
              설악산
            </div>
            <div
              className={`${classes["map-object-name-space"]} ${classes["mountain-fourth"]}`}
            >
              청계산
            </div>
            <div
              className={`${classes["map-object-name-space"]} ${classes["mountain-fifth"]}`}
            >
              동산
            </div>
            <img
              className={classes["map-image"]}
              src={MapImage}
              alt="MapImage"
            />
          </div>
        </div>
        <BottomTabBar currentPage="club" />
      </DefaultContainer>
    </>
  );
};

export default ClubMountainMap;
