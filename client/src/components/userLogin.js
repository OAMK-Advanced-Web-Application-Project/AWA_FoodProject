import React from 'react'

export default function UserLogin() {
    return (
        <div className="userSignupForm">
            <h1 className="userSignupTitle">login</h1>
            <label>Username</label>
            <input type="text"></input>
            <label>Password</label>
            <input type="text"></input>
            <button> Login </button>
            <h2>If you have not registered yet please signup</h2>
        </div>
    )
}
