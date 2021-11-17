import NavbarNoSearch from "./components/navbar/NavbarNoSearch.js"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import UserLogin from './components/signupAndLogin/userLogin.js';
import RestaurantLogin from './components/signupAndLogin/restaurantLogin.js';
import UserSignup from './components/signupAndLogin/userSignup';
import RestaurantSignup from './components/signupAndLogin/restaurantSignup';
import Restaurant from "./components/mainpages/restaurantPage";
import Cart from "./components/shoppingCart/Cart.js";
import UserMainPage from "./components/mainpages/userMainPage.js";
import RestaurantMainPage from "./components/mainpages/restaurantMainPage.js";

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
            <Route path="/restaurant:id" element ={<Restaurant/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/usermainpage" element={<UserMainPage/>} />
            <Route path="mainpages/restaurantmainpage" element={<RestaurantMainPage/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;