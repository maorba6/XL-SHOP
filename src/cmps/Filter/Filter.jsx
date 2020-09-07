import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import './Filter.scss'
export function Filter() {
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <div className="filter">
            <span>search</span>
            <input type="text" placeholder="search" />

        </div>
    );
}