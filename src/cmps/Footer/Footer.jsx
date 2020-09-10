import React, { useEffect } from 'react';
import whatsapp from '../../assets/social-icons/whatsapp.png'
import facebook from '../../assets/social-icons/facebook-color.png'
import instagram from '../../assets/social-icons/instagram-color.png'
import './Footer.scss'
export function Footer() {
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <footer>
            <h1>footer</h1>
            <div className="social">
                <img src={whatsapp} />
                <img src={facebook} />
                <img src={instagram} />
            </div>
        </footer>
    );
}