/* import './App.css'; */
import Navbar from "./components/Navbar.js"
import React from 'react';
/* import UserLogin from './components/userLogin'; */
import UserSignup from './components/userSignup';

function App() {
  return (
    <div>

      <Navbar/>
      <UserSignup />
{/*       <UserLogin /> */}

    </div>
  );
}

export default App;
