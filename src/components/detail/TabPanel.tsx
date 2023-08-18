import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import DeliveryImage from "../../assets/Images/delivery.png";

const activeTabStyle = {
  color: "#A394FF",
};

const inactiveTabStyle = {
  color: "#909090",
};

const TabPanel = ({thumbnail}: { thumbnail: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <>
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
      {activeTab === 0 ? (
        <div style={{width: "100%", marginBottom: "90px"}}>
          <img 
            src={thumbnail} alt="상품 사진"
            style={{
              width: "100%",
              padding: "30px", 
            }}
          />
        </div>
      ) : (
        // Content for the second tab ("배송안내")
        <div style={{width: "100%", marginBottom: "90px"}}>
          <img 
            src={DeliveryImage} alt="상품 사진"
            style={{
              width: "100%",
              padding: "30px", 
            }}
          />
        </div>
      )}
    </>
  );
};

export default TabPanel;
