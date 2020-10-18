import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview'
import './List.scss'
export function List({ items, removeItem, toggleLike }) {


    function randomNumber() {
        const x = Math.floor(Math.random() * 99999999 + 999)
        console.log({ x });
        return x
    }
    return (
        < section >
            < div className="item-list">
                {
                    items.map(item =>
                        < Preview key={randomNumber()} item={item} toggleLike={toggleLike} removeItem={removeItem} />
                    )
                }
            </div >
        </section >
    );
}