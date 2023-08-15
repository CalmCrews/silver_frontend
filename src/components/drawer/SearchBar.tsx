import React from "react";
import { styled } from "@mui/material/styles";
import { InputBase, Autocomplete, TextField } from "@mui/material";
import { includesByCho, makeRegexByCho } from 'hangul-util';


const SearchContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  border: "2px solid #A394FF",
  borderRadius: "1.6rem",
  background: "white",
  width: "100%",
  height: "3.2rem",
  marginBottom: "15px",
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

interface DataType {
  label: string;
}

const SearchBar = () => {
  const dataList: readonly DataType[] = [
   {label: "빨간색"}, {label: "빨간맛"}, {label: "파란색"}, {label: "노란색"}, {label: "검정색"}, {label: "Hello"}
  ];
  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleSearch = () => {
    // Implement your search logic here
    console.log(searchValue);
  };

  const filterOptions = (options: DataType[], { inputValue }: { inputValue: string }) => {
    const lowerInputValue = inputValue.toLowerCase();
    return lowerInputValue
      ? options.filter((option) => includesByCho(lowerInputValue, option.label.toLowerCase()))
      : options;
  };

  return (
    <SearchContainer>
      <Autocomplete
        freeSolo
        options={dataList}
        inputValue={searchValue}
        onInputChange={(event, newValue) => setSearchValue(newValue)}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField 
            {...params} 
            placeholder="검색어를 입력해주세요"
            sx={{
              padding: "0",
              width: "100%",
              height: "100%",
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
                '&:hover fieldset': {
                  border: 'none',
                },
                '&.Mui-focused fieldset': {
                  border: 'none',
                },
              }
            }} 
          />
        )}
        sx={{
          "& .MuiInputBase-root" : {
            marginLeft: "8px",
            padding: '0',
            height: "100%",
          },
          width: "calc(100% - 16px)", 
        }}
      />
      <SearchButton onClick={handleSearch} aria-label="search">
        검색
      </SearchButton>
    </SearchContainer>
  );
};

export default SearchBar;
