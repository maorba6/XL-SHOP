import React, { useEffect } from 'react';
import './Preview.scss'
export function Preview(props) {

    const { item } = props

    useEffect(() => {
        console.log(props);
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
        </div>
    );
}