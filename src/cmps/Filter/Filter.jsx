import React, { useEffect } from 'react';
import './Filter.scss'
export function Filter(props) {

    const filterBy = {
        name: '',
        category: '',
        type: ''
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        filterBy[field] = value
        props.setFilter(filterBy)
    }
    return (
        <div className="filter">
            <div className="search">
                <span>name</span>
                <input name="name" type="text" placeholder="search" onChange={handleChange} />
            </div>
            <div className="category">
                <span> category</span>
                <select name="category" onChange={handleChange} >
                    <option value="">all</option>
                    <option value="sport">sport</option>
                    <option value="casual">casual</option>
                </select>
            </div>
            <div className="type">
                <span> type </span>
                <select name="type" onChange={handleChange}>
                    <option value="">all</option>
                    <option value="shirts">shirts</option>
                    <option value="pants">pants</option>
                    <option value="shoes">shoes</option>
                    <option value="accessories">accessories</option>
                </select></div>
        </div>
    );
}