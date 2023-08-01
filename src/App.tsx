import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/users/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/users/SignIn";
import Review from "./pages/testing/Review";
import "./App.css";
import { useRecoilState } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './theme/theme';
import { fontSizeState } from './states/userInfo';


const GlobalStyle = createGlobalStyle`
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
  }, [setBodyFontSize]);

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
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/review" element={<Review />} />
                </Routes>
              </div>
            </div>
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
