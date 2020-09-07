import React, { useEffect } from 'react';
import './Home.scss'
import img1 from '../../assets/1.jpeg'
export function Home() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <section className="home">
            {/* <h1>welcome user</h1> */}
            {/* <img className="front-img" src={img1}/> */}
            <h2>Catagories</h2>
            <section>
                Categories list (['Shirts','Pants','Big','Small']+imgs) 
                <p>Best Sellers</p>
            </section>
        </section>
    );
}