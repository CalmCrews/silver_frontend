import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Review from "./pages/testing/Review";
import "./App.css";
import { useRecoilState } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import SignIn from "./pages/users/SignIn";
import { fontSizeState } from "./states/userInfo";
import SignupId from "./pages/users/SignupId";
import SignupPs from "./pages/users/SignupPs";
import "./fonts/pretendard.css";
import KakaoLogin from "./pages/KakaoLogin";
import NaverLogin from "./pages/NaverLogin";
import ClubFirstStep from "./pages/club/ClubFirstStep";
import MakeClubNaming from "./pages/club/MakeClubNaming";
import MakeClubDes from "./pages/club/MakeClubDes";
import MakeClubKeywords from "./pages/club/MakeClubKeywords";
import MakeClubProfile from "./pages/club/MakeClubProfile";
import MakeClubRegister from "./pages/club/MakeClubRegister";
import JoinClubRegister from "./pages/club/JoinClubRegister";
import JoinClubProfile from "./pages/club/JoinClubProfile";
import ProductDetail from "./pages/detail/ProductDetail";
import ChargeCash from "./pages/ChargeCash";
import MyClubs from "./pages/club/MyClubs";
import MyClubDetail from "./pages/club/MyClubDetail";
import MyClubsAll from "./pages/club/MyClubsAll";
import MyInfo from "./pages/myinfo/MyInfo";
import FontSetting from "./pages/myinfo/FontSetting";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard';
    font-weight: 600;
  }
  html {
    font-size: ${(props) => props.theme.bodyFontSize};
  }
`;

function App() {
  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);

  useEffect(() => {
    const storedBodyFontSize = localStorage.getItem("bodyFontSize");
    if (storedBodyFontSize) {
      console.log("getbodyfont", storedBodyFontSize);
      setBodyFontSize(storedBodyFontSize);
    }
  }, []);

  // bodyFontSize 값이 변경될 때마다 이 값을 로컬 스토리지에 저장합니다.
  useEffect(() => {
    console.log("setbodyfont", bodyFontSize);
    localStorage.setItem("bodyFontSize", bodyFontSize);
  }, [bodyFontSize]);

  const updatedTheme = {
    ...theme,
    bodyFontSize,
  };

  return (
    <ThemeProvider theme={updatedTheme}>
      <GlobalStyle />
      <Router>
        <div className="ResponsiveLayout">
          <div className="desktop-view">
            <div className="desktop-background"></div>
          </div>
          <div className="mobile-view">
            <div className="mobile-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup/id" element={<SignupId />} />
                <Route path="/signup/password" element={<SignupPs />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/review" element={<Review />} />
                <Route path="/users/kakao/callback/" element={<KakaoLogin />} />
                <Route path="/users/naver/callback/" element={<NaverLogin/>}/>
                <Route path="/products/:productId" element={<ProductDetail/>}/>
                <Route path="/clubs/:clubId/products/:productId" element={<ProductDetail/>}/>
                <Route path="/club/start" element={<ClubFirstStep />} />
                <Route path="/club/naming" element={<MakeClubNaming />}></Route>
                <Route path="/club/description" element={<MakeClubDes />} />
                <Route path="/club/keywords" element={<MakeClubKeywords />} />
                <Route path="/club/profile" element={<MakeClubProfile />} />
                <Route path="/club/register" element={<MakeClubRegister />} />
                <Route path="/club/join" element={<JoinClubRegister />} />
                <Route
                  path="/club/join/profile"
                  element={<JoinClubProfile />}
                />
                <Route path="/club/myClubs" element={<MyClubs />} />
                <Route
                  path="/club/myClubs/detail/:id"
                  element={<MyClubDetail />}
                />
                <Route path="/club/myClubs/all" element={<MyClubsAll />} />
                <Route path="/my" element={<MyInfo />} />
                <Route path="/fontsetting" element={<FontSetting />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
