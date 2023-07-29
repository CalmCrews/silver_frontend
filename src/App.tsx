import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/users/SignUp";
import Home from "./pages/Home";
import SignIn from "./pages/users/SignIn";
import Review from "./pages/testing/Review";
import "./App.css";

function App() {
  return (
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
  );
}

export default App;
