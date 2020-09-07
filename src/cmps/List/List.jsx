import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview'
import './List.scss'
export function List({ items, removeItem }) {
    useEffect(() => {
        console.log(items)

        return () => {

            console.log('dead');
        }
    }, [])

    return (
        < section >
            < div className="item-list">
                {
                    items.map(item =>

                        < Preview key={item._id} item={item} removeItem={removeItem} />
                    )
                }
            </div >
        </section >
    );
}