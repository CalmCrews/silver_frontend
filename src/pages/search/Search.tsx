import React from "react";
import DefaultContainer from "../../components/shared/DefaultContainer";
import { Toolbar, IconButton, } from "@mui/material";
import AppBarWithDrawer from "../../components/shared/AppBarWithDrawer";
import BottomTabBar from "../../components/shared/BottomTabBar";
import { styled } from "styled-components";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../../states/userInfo";
import RecommendBox from "../../components/main/RecommendBox";

const SearchToolbar = styled(Toolbar)({
  width: "100%",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  marginTop: "84px",
  textAlign: "center",
  color: "#a394ff",
  fontSize: "1.5rem",
  fontWeight: "700",
});

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SectionBox = styled.div`
  width: 100%;
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Search = () => {
  const location = useLocation();
  console.log(location.state);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const fullQueryString = urlSearchParams.toString();
  
  const [login, setLogin] = useRecoilState(loginState);
  const user = useRecoilValue(loginState);
  
  const [searchData, setSearchData] = React.useState<any | null>(null);

  const handleGoBack = () => {
    window.history.back(); // 이전 페이지로 이동
  };
  
  
  const newAxiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });

  const getSearch = async () => {
    try {
      const response = await newAxiosInstance.get(
        `${process.env.REACT_APP_API_URL}products/?${fullQueryString}`
      );
      console.log(response.data);
      setSearchData(response.data)
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  React.useEffect(() => {
    getSearch();
  }, [])

  return (
    <>
			<DefaultContainer>
        <AppBarWithDrawer/>
        <MainDiv>
          <SearchToolbar>
            <IconButton 
              onClick={handleGoBack}
              sx={{
                position: "absolute",
                left: "10px",
              }}
            >
              <ArrowBackIosRoundedIcon/>
            </IconButton>
            <p>결과 목록</p>
          </SearchToolbar>
          <SectionBox>
            {searchData &&
                searchData.map((product: any, index: number) => (
                  <RecommendBox
                    key={index}
                    id={product.id}
                    name={product.name}
                    thumbnail={product.thumbnail || ""}
                    price={product.price}
                    score={product.review_score}
                  />
                ))}
          </SectionBox>
        </MainDiv>
      </DefaultContainer>
		</>
  )
}

export default Search;