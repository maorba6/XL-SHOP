import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import './Header.scss'
export function Header() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <header className="header">
            <p className="header-logo">LOGO</p>
            <ul className="flex">
                <li><NavLink activeClassName='active-path' to="/" exact >Home</NavLink></li>
                <li><NavLink to="/login" exact >login</NavLink></li>
                <li><NavLink to="/main" exact >main</NavLink></li>
            </ul>
        </header>
    );
}