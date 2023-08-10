import React, { useState } from "react";
import HomeAppBar from "./HomeAppBar";
import { Box, IconButton } from "@mui/material";
import DefaultIcon from "./DefaultIcon";
import MenuIcon from "../../assets/icons/MenuIcon.png";
import AlarmIcon from "../../assets/icons/AlarmIcon.png";
import MainDrawer from "../drawer/MainDrawer";

const AppBarWithDrawer = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

	return (
		<>
			<HomeAppBar>
          <>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                padding: "22px",
                justifyContent: "space-between",
              }}
            >
              <IconButton
                sx={{ width: "40px", height: "40px" }}
                onClick={handleDrawerOpen}
              >
                <DefaultIcon
                  icon={MenuIcon}
                  width={"32px"}
                  height={"22px"}
                  name={"menu_icon"}
                />
              </IconButton>
              <p>모여</p>
              <IconButton sx={{ width: "40px", height: "40px" }}>
                <DefaultIcon
                  icon={AlarmIcon}
                  size={"32px"}
                  name={"menu_icon"}
                />
              </IconButton>
            </Box>
          </>
        </HomeAppBar>
				<MainDrawer open={isDrawerOpen} onClose={handleDrawerClose}></MainDrawer>
		</>
	);
}

export default AppBarWithDrawer;