import React, { useEffect } from 'react';
import './Preview.scss'
export function Preview() {
    useEffect(() => {
        console.log('created');
        return () => {
            console.log('dead');
        }
    }, [])

    return (
        <div className="preview">

            preview

        </div>
    );
}