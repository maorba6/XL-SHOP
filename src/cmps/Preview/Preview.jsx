import React, { useEffect } from 'react';
import './Preview.scss'
import trash from '../../assets/trash.png'
export function Preview({ item, removeItem }) {


    useEffect(() => {
        return () => {
            console.log('dead');
        }
    }, [])
    return (
        <div className="preview">
            <h1>{item.type}</h1>
            <div className="price">
                <span>price:</span>
                <span>${item.price}</span>
            </div>
            <div className="size">
                <span>size:</span>
                <span>{item.size}</span>
            </div>
            <div className="img">
                <img src={item.imgUrl} />
            </div>
            <img className="img-trash" onClick={() => removeItem(item._id)} src={trash} />
        </div>
    );
}