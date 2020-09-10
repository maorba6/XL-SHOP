import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './Login.scss'
export function Login() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <section className="flex signup-section">
            <form action="" className="flex signup-form">
            <h2>Welcome Back</h2>
                <div className="name">
                <label>Email</label>
                    <input type="text" placeholder="Enter eMail" />
                </div>
                <div className="password">
                <label>Password</label>
                    <input type="text" placeholder=" Enter password" />
                </div>
                <div className="btns">
                    <button className="signin-button">Login</button>
                </div>
                <div className="no-account">
                <p>Don’t have an account?</p>
                <Link to="/signup">Sign Up </Link>
                 </div>
            </form>


        </section>
    );
}