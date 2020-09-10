import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import trash from '../../assets/trash.png';
import './Preview.scss'

export function Preview({ item, removeItem }) {


    useEffect(() => {
        return () => {
        }
    }, [])
    return (
        <div className="preview flex">
            <p className="delete-item" onClick={() => removeItem(item._id)} src={trash}>X</p>
            <div className="flex img-container">
                <Link to={`item/${item._id}`} >
                    <img className="img-item" src={item.imgUrl} />    
                </Link>
            </div>
                <p className="item-price">price: ${item.price}</p>
        </div>
    );
}