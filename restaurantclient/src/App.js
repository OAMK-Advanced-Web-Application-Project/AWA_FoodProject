import Navbar from "./components/navbar/Navbar.js";
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import RestaurantLogin from "./components/signupAndLogin/restaurantLogin.js";
import RestaurantSignup from "./components/signupAndLogin/restaurantSignup";
import TestRestaurantPage from "./components/shoppingCart/TestRestaurantPage";
import RestaurantMainPage from "./components/mainpages/restaurantMainPage.js";
import MenuDetailView from "./components/mainpages/editableRestaurantInfo/MenuDetailView.js";
import MenuList from "./components/mainpages/editableRestaurantInfo/MenuList.js";
import menuData from "./components/mainpages/editableRestaurantInfo/menuData.json";
import Payment from "./components/mainpages/payment/Payment.js";
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const menus = menuData.map((menu) => {
    return { ...menu, id: uuidv4() };
  });

  return (
    <div>
      <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/restaurantlogin" element={<RestaurantLogin/>} />
            <Route path="/restaurantsignup" element={<RestaurantSignup/>} />
            <Route path="/testRestaurantPage" element={<TestRestaurantPage/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="restaurantmainpage" element={ <RestaurantMainPage/> }>
              <Route path=":menuId" element={ <MenuDetailView menus={ menus } /> } />
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
