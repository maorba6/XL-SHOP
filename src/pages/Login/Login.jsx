import React, { useEffect } from 'react';
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
                    <button className="signin-button">Sign Up</button>
                </div>
            </form>


        </section>
    );
}