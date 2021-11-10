
/*import './App.css';*/
import NavbarNoSearch from "./components/NavbarNoSearch.js"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.js";
import UserLogin from './components/userLogin.js';
import RestaurantLogin from './components/restaurantLogin.js';
import UserSignup from './components/userSignup';
import RestaurantSignup from './components/restaurantSignup';

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
          </Routes>
      </Router>

    </div>
  );
}

export default App;
