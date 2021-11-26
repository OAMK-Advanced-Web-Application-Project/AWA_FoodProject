import Navbar from "./components/navbar/Navbar.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import UserLogin from "./components/signupAndLogin/userLogin.js";
import UserSignup from "./components/signupAndLogin/userSignup";
import Cart from "./components/shoppingCart/TestCartPage.js";
import UserMainPage from "./components/mainpages/userMainPage.js";
import Payment from "./components/mainpages/payment/Payment.js";

function App() {

  return (
    <div>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/userlogin" element={<UserLogin/>} />
            <Route path="/usersignup" element={<UserSignup/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/usermainpage" element={<UserMainPage/>} />
            <Route path="/payment" element={<Payment/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
