import Navbar from "./components/navbar/Navbar.js";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage";
import UserLogin from "./components/signupAndLogin/userLogin.js";
import UserSignup from "./components/signupAndLogin/userSignup";
import Cart from "./components/shoppingCart/TestCartPage.js";
import UserMainPage from "./components/mainpages/userMainPage.js";
import Payment from "./components/mainpages/payment/Payment.js";
<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
import AddMenuItem from "./components/mainpages/editableRestaurantInfo/AddMenuItem.js";
=======
>>>>>>> 8997c98254582c542806cbbc23be283386daabc8

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
        <Route path="/usermainpage" element={<UserMainPage />} />
        <Route path="/payment" element={<Payment />} />
      </>
    );
  }

  return (
    <div>
      <Router>
<<<<<<< HEAD
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
            <Route path="/payment" element={<Payment/>}/>
            <Route path="restaurantmainpage" element={ <RestaurantMainPage/>  }>
              <Route path=":menuId" element={ <MenuDetailView menus={ menus } /> } />
            </Route>

          </Routes>
=======
        <Navbar userLoggedIn={userJWT != null} logout={ () => setUserJWT(null)}/>
        <Routes>
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
>>>>>>> 8997c98254582c542806cbbc23be283386daabc8
      </Router>
    </div>
  );
}

export default App;
