import React, { useEffect } from 'react';
import './Home.scss'
export function Home() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <section className="home">
            <h1>welcome user</h1>
            {/* <img src="../../assets/1.jpeg"/> */}
        </section>
    );
}