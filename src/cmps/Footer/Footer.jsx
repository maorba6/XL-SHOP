import React, { useEffect } from 'react';
import './Footer.scss'
export function Footer() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <footer>
            <h1>foot</h1>
        </footer>
    );
}