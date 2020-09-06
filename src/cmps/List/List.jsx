import React, { useEffect } from 'react';
import { Preview } from '../Preview/Preview'
import './List.scss'
export function List(props) {
    useEffect(() => {
        console.log(props.items);
        return () => {
            console.log('dead');
        }
    }, [])
    const { items } = props

    return (
        <section>
            < div className="item-list">
                {
                    items.map(item =>
                        < Preview key={item._id} item={item} />
                    )
                }
            </div >
        </section>
    );
}