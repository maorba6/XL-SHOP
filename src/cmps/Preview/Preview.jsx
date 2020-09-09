import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import trash from '../../assets/trash.png';
import './Preview.scss'

export function Preview({ item, removeItem }) {


    useEffect(() => {
        return () => {
            console.log('dead');
        }
    }, [])
    return (
        <div className="preview flex">
            <Link to={`item/${item._id}`} >

                    <img src={item.imgUrl} />    
                <div className="price">
                    <span>price:</span>
                    <span>${item.price}</span>
                </div>
                <div className="size">
                    <span>size:</span>
                    <span>{item.size}</span>
                </div>
            </Link>
            {/* <img className="img-trash" onClick={() => removeItem(item._id)} src={trash} /> */}
        </div>
    );
}