import React, { useEffect } from 'react';
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import './Main.scss'

export function Main() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <main >
            <Filter></Filter>
            <List></List>
        </main>
    );
}