import Navbar from "./components/navbar/Navbar.js";
import React, { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

const jwtStorage = localStorage.getItem("token");


function App() {
  const [userJWT, setUserJWT] = useState(jwtStorage);

  const menus = menuData.map((menu) => {
    return { ...menu, id: uuidv4() };
  });
  const id = localStorage.getItem("restaurantID");

  let authRoutes = (
    <>
      <Route
        path="/restaurantLogin"
        element={
          <RestaurantLogin
            login={(newJWT) => {
              setUserJWT(newJWT);
            }}
          />
        }
      />
      <Route path="/restaurantSignup" element={<RestaurantSignup />} />
    </>
  );

  if (userJWT != null) {
    authRoutes = (
      <>
        <Route path="/payment" element={<Payment />} />
        <Route
          path="restaurantmainpage/:id"
          element={<RestaurantMainPage jwt={userJWT} />}
        >
          <Route path=":menuId" element={<MenuDetailView menus={menus} />} />
        </Route>
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
            localStorage.removeItem("restaurantID");
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                userLoggedIn={userJWT != null}
                jwt={userJWT}
                id={id}
              />
            }
          />
          {authRoutes}
          <Route
            path="*"
            element={
              <LandingPage
                userLoggedIn={userJWT != null}
                jwt={userJWT}
                id={id}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
