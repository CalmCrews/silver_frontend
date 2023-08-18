import React from "react";
import { styled } from "@mui/material/styles";
import { InputBase, Autocomplete, TextField } from "@mui/material";
import { includesByCho, makeRegexByCho } from "hangul-util";
import { useNavigate } from "react-router-dom";

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
    { label: "차오르는 냉기, 쿨한 나의 목풍기" },
    { label: "따끈따끈 한솥밥 먹는 사이, 한솥밥솥" },
    { label: "식기 건조대만 있으면 설거지 잘할텐데, 트로이 식기건조대 오픈" },
    { label: "지압볼 밟고 내 건강 꽃길만 걸어요, 지압볼 구매 오픈" },
    { label: "요즘 바퀜 없는 사람도 있어? 냉장고 필수 아이템, 바퀜 공구 오픈" },
    { label: "뽀송뽀송 엠보 물티슈, 마르지 않아요" },
    { label: "빈틈없는 나의 투명 가방, 위생지퍼백 함께구매 알림" },
    { label: "피부에 차오르는 금빛 향연, 금비누 함께구매해봐요" },
    { label: "예쁘다고 수국도 수군대요, 캔디박스 수국 함께구매" },
    { label: "들숨날숨 책임져요, 자외선 차단 마스크 함께구매" },
    { label: "오르락내리락 초경량 라이딩 등산 가방" },
    { label: "시원한 바람이 솔솔, 소용돌이 무선 선풍기" },
    { label: "손주 소풍갈 때 가방에 쏘옥, 김밥 담는 밀폐용기 공동구매합니다" },
    { label: "이판저판 뒤집어요, 온오프후라이팬 함께구매해요" },
    { label: "냉장고에 차곡차곡, 반찬통 세트" },
  ];
  const [searchValue, setSearchValue] = React.useState<string>("");

  const navigate = useNavigate();

  const handleSearch = () => {
    // Implement your search logic here
    console.log(searchValue);
    navigate(`/search/?search=${searchValue}`);
  };

  const filterOptions = (
    options: DataType[],
    { inputValue }: { inputValue: string }
  ) => {
    const lowerInputValue = inputValue.toLowerCase();
    return lowerInputValue
      ? options.filter((option) =>
          includesByCho(lowerInputValue, option.label.toLowerCase())
        )
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
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        )}
        sx={{
          "& .MuiInputBase-root": {
            marginLeft: "8px",
            padding: "0",
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
