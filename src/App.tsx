import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Review from "./pages/testing/Review";
import "./App.css";
import { useRecoilState } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import SignIn from "./pages/users/SignIn";
import { fontSizeState } from './states/userInfo';
import SignupId from "./pages/users/SignupId";
import SignupPs from "./pages/users/SignupPs";
import './fonts/pretendard.css';
import KakaoLogin from "./pages/KakaoLogin";
import NaverLogin from "./pages/NaverLogin";
import ProductDetail from "./pages/detail/ProductDetail";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard';
    font-weight: 600;
  }
  html {
    font-size: ${props => props.theme.bodyFontSize};
  }
`;

function App() {
  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);

  useEffect(() => {
    const storedBodyFontSize = localStorage.getItem('bodyFontSize');
    if (storedBodyFontSize) {
      console.log("getbodyfont", storedBodyFontSize);
      setBodyFontSize(storedBodyFontSize);
    }
  }, []);

  // bodyFontSize 값이 변경될 때마다 이 값을 로컬 스토리지에 저장합니다.
  useEffect(() => {
    console.log("setbodyfont", bodyFontSize);
    localStorage.setItem('bodyFontSize', bodyFontSize);
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
                  <Route path="/signup/password" element={<SignupPs/>} />
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/users/kakao/callback/" element={<KakaoLogin/>}/>
                  <Route path="/users/naver/callback/" element={<NaverLogin/>}/>
                  <Route path="/products/detail/:productId" element={<ProductDetail/>}/>
                </Routes>
              </div>
            </div>
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
