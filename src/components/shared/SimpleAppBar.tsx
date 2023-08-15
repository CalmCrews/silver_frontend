import React from "react";
import DefaultIcon from "./DefaultIcon";
import Logo from "../../assets/logo/MoyeoLogo.png"


const SimpleAppBar = () => {
  return (
    <DefaultIcon icon={Logo} width="65px" height="50px" name="Moyeo-Logo"/>
  );
}

export default SimpleAppBar;