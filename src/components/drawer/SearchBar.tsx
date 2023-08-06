import React from "react";
import { styled } from "@mui/material/styles";
import { InputBase, IconButton } from "@mui/material";

const SearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  border: "2px solid #A394FF",
  borderRadius: "1.6rem",
  background: "white",
  width: "100%",
  height: "3.2rem",
  padding: "16px 0px",
});

const SearchInput = styled(InputBase)({
  flex: 1,
  marginLeft: "16px",
  fontWeight: "600",
});

const SearchButton = styled("button")({
  position: "relative",
  right: "-2px",
  width: "110px",
  height: "3.2rem",
  border: "none",
  borderRadius: "1.6rem",
  fontSize: "1.5rem",
  color: "#fff",
  backgroundColor: "#A394FF",
  cursor: "pointer",
});

const SearchBar: React.FC = () => {
  const handleSearch = () => {
    // Implement your search logic here
    console.log("Search button clicked!");
  };

  return (
    <SearchContainer>
      <SearchInput placeholder="검색어를 입력해주세요" />
      <SearchButton onClick={handleSearch} aria-label="search">
        검색
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
