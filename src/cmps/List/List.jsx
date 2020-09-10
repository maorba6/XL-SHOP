import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview'
import './List.scss'
export function List({ items, removeItem }) {
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        < section >
            < div className="item-list grid">
                {
                    items.map(item =>

                        < Preview key={item._id} item={item} removeItem={removeItem} />
                    )
                }
            </div >
        </section >
    );
}