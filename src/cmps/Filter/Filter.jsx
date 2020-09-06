import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import './Filter.scss'
export function Filter() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <div className="filter">

            <span>search</span>
            <input type="text" placeholder="search" />

        </div>
    );
}