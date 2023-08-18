import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import MainLogo from "../../assets/logo/MainLogo.png";

import classes from "./Splash.module.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 20px 45px;
`;

const Splash = () => {
  const navigate = useNavigate();

  const handleGoNext = () => {
    navigate("/splash/ads");
  };

  return (
    <Container>
      <img className={classes["main-img"]} src={MainLogo} alt="MainLogo" />
      <button onClick={handleGoNext} className={classes["splash-btn"]}>
        모여가 뭐여?
      </button>
    </Container>
  );
};

export default Splash;
