import React from 'react';
import './signup.css';

export default function userSignup() {
    return (
        <div className="userSignupForm">
            <h1 className="userSignupTitle">Signup</h1>
            <label>Firstname</label>
            <input type="text"></input>
            <label>Lastname</label>
            <input type="text"></input>
            <label>Address</label>
            <input type="text"></input>
            <label>Email address</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            <h2>If you have not registered yet please signup</h2>
        </div>
    )
};



