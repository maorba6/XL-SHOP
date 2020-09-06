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
        <section className="login">
            <form action="">
                <div className="name">
                    <span>name:</span>
                    <input type="text" placeholder="enter name" />
                </div>
                <div className="password">
                    <span>password:</span>
                    <input type="text" placeholder=" enter password" />
                </div>
                <div className="btns">
                    <button>login</button>
                    <button>signup</button>
                </div>
            </form>


        </section>
    );
}