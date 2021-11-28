import Navbar from "./components/navbar/Navbar.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import UserLogin from "./components/signupAndLogin/userLogin.js";
import UserSignup from "./components/signupAndLogin/userSignup";
import Cart from "./components/shoppingCart/TestCartPage.js";
import UserMainPage from "./components/mainpages/userMainPage.js";
import RestaurantMainPage from "./components/mainpages/restaurantMainPage.js";
import MenuDetailView from "./components/mainpages/editableRestaurantInfo/MenuDetailView.js";
import MenuList from "./components/mainpages/editableRestaurantInfo/MenuList.js";
import menuData from "./components/mainpages/editableRestaurantInfo/menuData.json";
import SetStatusTestPage from "./components/shoppingCart/SetStatusTestPage.js";
import Payment from "./components/mainpages/payment/Payment.js";
import { v4 as uuidv4 } from "uuid";
import AddMenuItem from "./components/mainpages/editableRestaurantInfo/AddMenuItem.js";

const jwtStorage = localStorage.getItem("token");

function App() {
  const [userJWT, setUserJWT] = useState(jwtStorage);

  let authRoutes = (
    <>
      <Route
        path="/userlogin"
        element={
          <UserLogin
            login={(newJWT) => {
              setUserJWT(newJWT);
            }}
          />
        }
      />
      <Route path="/usersignup" element={<UserSignup />} />
    </>
  );

  if (userJWT != null) {
    authRoutes = (
      <>
        <Route path="/cart" element={<Cart />} />
        <Route path="/usermainpage" element={<UserMainPage />}/>
        <Route path="/payment" element={<Payment />} />
      </>
    );
  }

  return (
    <div>
      <Router>
        <Navbar
          userLoggedIn={userJWT != null}
          logout={() => {
            setUserJWT(null);
            localStorage.removeItem("token");
          }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/restaurantlogin" element={<RestaurantLogin />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/restaurantsignup" element={<RestaurantSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/usermainpage" element={<UserMainPage />} />
          <Route path="/setStatusTest" element={<SetStatusTestPage/>}/>
          <Route path="/testRestaurantPage" element={<TestRestaurantPage />} />
          <Route
            path="/"
            element={<LandingPage userLoggedIn={userJWT != null} />}
          />
          {authRoutes}
          <Route
            path="*"
            element={<LandingPage userLoggedIn={userJWT != null} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
