import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import img1 from '../../assets/1.jpeg';
import pants from '../../assets/pants.jpg';
import shirt from '../../assets/shirt.png';
import shoes from '../../assets/shoes.jpeg'
import './Home.scss'
export function Home() {

    const types = [
        {
            str: "shirt",
            img: shirt
        },
        {
            str: "pants",
            img: pants
        },
        {
            str: "shoes",
            img: shoes
        }
    ]

    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])
    return (
        <section className="home">
            <h1>welcome user</h1>
            <img className="front-img" src={img1} />
            <div className="types flex">
                {types.map(type => {
                    return <Link key={type.str} to={type.str}> <img src={type.img} />  </Link>
                })}
            </div>
            <h3>Top Rated</h3>
            <div className="top-items">

            </div>
        </section>
    );
}