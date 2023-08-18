import React, { useEffect, ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import "./App.css";
import { useRecoilState, useRecoilValue } from "recoil";
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
import ChargeCash from "./pages/charge/ChargeCash";
import MyClubs from "./pages/club/MyClubs";
import MyClubDetail from "./pages/club/MyClubDetail";
import MyClubsAll from "./pages/club/MyClubsAll";
import MyInfo from "./pages/myinfo/MyInfo";
import FontSetting from "./pages/myinfo/FontSetting";
import ClubMountainMap from "./pages/club/ClubMountainMap";
import Search from "./pages/search/Search";
import Splash from "./pages/splash/Splash";
import SplashAdvertisement from "./pages/splash/SplashAdvertisement";
import { loginState } from "./states/userInfo";
import Background from "./assets/Images/MoyeoBackground.png";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard';
    font-weight: 600;
  }
  html {
    font-size: ${(props) => props.theme.bodyFontSize};
  }
`;


interface AuthProps {
  isLoggedIn: boolean;
}

interface PrivateRouteProps {
  auth: AuthProps;
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, children }) => {
  return auth ? <>{children}</> : <Navigate to="/splash" />;
};

function App() {
  const [bodyFontSize, setBodyFontSize] = useRecoilState(fontSizeState);

  const user = useRecoilValue(loginState);
  const isLoggedIn = user.isLoggedIn;


  useEffect(() => {
    console.log(isLoggedIn);
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
            <div className="desktop-background">
              <div style={{width: "100%", height: "100%", position:"relative"}}>
                <img 
                  src={Background} 
                  alt="moyeo_background" 
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "10%",
                    width: "45%",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mobile-view">
            <div className="mobile-content" style={{border: "1px solid #EBE4FF"}}>
              <Routes>
                <Route path="/splash" element={<Splash />} />
                <Route path="/splash/ads" element={<SplashAdvertisement />} />
                <Route path="/" element={<PrivateRoute auth={isLoggedIn}><Home /></PrivateRoute>} /> 
                <Route path="/signup/id" element={<SignupId />} />
                <Route path="/signup/password" element={<SignupPs />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/users/kakao/callback/" element={<KakaoLogin />} />
                <Route path="/users/naver/callback/" element={<NaverLogin />} />
                <Route
                  path="/products/:productId"
                  element={<PrivateRoute auth={isLoggedIn}><ProductDetail /></PrivateRoute>}
                />
                <Route
                  path="/clubProducts/:clubProductId"
                  element={<ProductDetail />}
                />
                <Route path="/club/start" element={<PrivateRoute auth={isLoggedIn}><ClubFirstStep /></PrivateRoute>} />
                <Route path="/club/naming" element={<PrivateRoute auth={isLoggedIn}><MakeClubNaming /></PrivateRoute>}></Route>
                <Route path="/club/description" element={<PrivateRoute auth={isLoggedIn}><MakeClubDes /></PrivateRoute>} />
                <Route path="/club/keywords" element={<PrivateRoute auth={isLoggedIn}><MakeClubKeywords /></PrivateRoute>} />
                <Route path="/club/profile" element={<PrivateRoute auth={isLoggedIn}><MakeClubProfile /></PrivateRoute>} />
                <Route path="/club/register" element={<PrivateRoute auth={isLoggedIn}><MakeClubRegister /></PrivateRoute>} />
                <Route path="/club/join" element={<PrivateRoute auth={isLoggedIn}><JoinClubRegister /></PrivateRoute>} />
                <Route
                  path="/club/join/profile"
                  element={<PrivateRoute auth={isLoggedIn}><JoinClubProfile /></PrivateRoute>}
                />
                <Route path="/club/myClubs" element={<PrivateRoute auth={isLoggedIn}><MyClubs /></PrivateRoute>} />
                <Route
                  path="/club/myClubs/detail/:id"
                  element={<PrivateRoute auth={isLoggedIn}><MyClubDetail /></PrivateRoute>}
                />
                <Route path="/club/myClubs/all" element={<PrivateRoute auth={isLoggedIn}><MyClubsAll /></PrivateRoute>} />
                <Route path="/club/clubMap" element={<PrivateRoute auth={isLoggedIn}><ClubMountainMap /></PrivateRoute>} />
                <Route path="/my" element={<PrivateRoute auth={isLoggedIn}><MyInfo /></PrivateRoute>} />
                <Route path="/fontsetting" element={<PrivateRoute auth={isLoggedIn}><FontSetting /></PrivateRoute>} />
                <Route path="/search" element={<PrivateRoute auth={isLoggedIn}><Search /></PrivateRoute>} />
                <Route path="/charge" element={<PrivateRoute auth={isLoggedIn}><ChargeCash /></PrivateRoute>} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
