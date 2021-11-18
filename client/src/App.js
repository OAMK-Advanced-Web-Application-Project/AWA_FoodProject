import NavbarNoSearch from "./components/navbar/NavbarNoSearch.js"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import UserLogin from './components/signupAndLogin/userLogin.js';
import RestaurantLogin from './components/signupAndLogin/restaurantLogin.js';
import UserSignup from './components/signupAndLogin/userSignup';
import RestaurantSignup from './components/signupAndLogin/restaurantSignup';
import Cart from "./components/shoppingCart/TestCartPage.js";
import TestRestaurantPage from "./components/shoppingCart/TestRestaurantPage";
import UserMainPage from "./components/mainpages/userMainPage.js";

function App() {
  return (
    <div>
      <Router>
          <NavbarNoSearch/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/userlogin" element={<UserLogin/>} />
            <Route path="/restaurantlogin" element={<RestaurantLogin/>} />
            <Route path="/usersignup" element={<UserSignup/>} />
            <Route path="/restaurantsignup" element={<RestaurantSignup/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/usermainpage" element={<UserMainPage/>} />
            <Route path="/testRestaurantPage" element={<TestRestaurantPage/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;