import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

const activeTabStyle = {
  color: "#A394FF",
};

const inactiveTabStyle = {
  color: "#909090",
};

const TabPanel = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleTabChange}
      aria-label="tabs"
      variant="fullWidth"
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: "#a394ff",
        },
      }}
    >
      <Tab
        label="사진으로 보기"
        style={activeTab === 0 ? activeTabStyle : inactiveTabStyle}
        sx={{
          fontSize: "1.25rem",
          fontWeight: "600",
        }}
      />
      <Tab
        label="배송안내"
        style={activeTab === 1 ? activeTabStyle : inactiveTabStyle}
        sx={{
          fontSize: "1.25rem",
          fontWeight: "600",
        }}
      />
    </Tabs>
  );
};

export default TabPanel;
