
/*import './App.css';*/
import NavbarNoSearch from "./components/NavbarNoSearch.js"
import React from 'react';
/*import UserLogin from './components/userLogin';*/
import UserSignup from './components/userSignup';

function App() {
  return (
    <div>

      <NavbarNoSearch/>
      <UserSignup />
{/*       <UserLogin /> */}

    </div>
  );
}

export default App;