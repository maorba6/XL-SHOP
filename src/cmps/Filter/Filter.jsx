import React, { useState, useEffect } from 'react';
import './Filter.scss'
export function Filter(props) {


    const [state, setState] = useState({
        pants:
            { display: 'none', position: 'absolute', 'list-style-type': 'none' },
        shirts:
            { display: 'none', position: 'absolute', 'list-style-type': 'none' },
        filterBy: {
            name: '',
            category: ''
        }
    })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        state.filterBy[field] = value
        props.setFilter(state.filterBy)
    }

    function setFilter(category) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category } }))
    }

    useEffect(() => {
        props.setFilter(state.filterBy)
        return () => {
        }
    }, [state.filterBy])

    function toggleTypes(display, type) {
        setState(state => ({ ...state, [type]: { ...state[type], display } }))
    }

    return (
        <div className="filter">
            <ul className="list flex">
                <li onMouseEnter={() => toggleTypes('block', 'pants')} onMouseLeave={() => toggleTypes('none', 'pants')}>
                    <span >pants</span>
                    <ul style={state.pants}>
                        <li onClick={() => setFilter('short-pants')}>short pants</li>
                        <li onClick={() => setFilter('polo-pants')}>polo pants</li>
                        <li onClick={() => setFilter('black-pants')}>black pants</li>
                        <li onClick={() => setFilter('white-pants')}>white pants</li>
                        <li onClick={() => setFilter('summer-pants')}>summer pants</li>
                        <li onClick={() => setFilter('winter-pants')}>winter pants</li>
                    </ul>
                </li>

                <li onMouseEnter={() => toggleTypes('block', 'shirts')} onMouseLeave={() => toggleTypes('none', 'shirts')}>
                    <span>shirts</span>
                    <ul style={state.shirts} >
                        <li onClick={() => setFilter('short-pants')}>short shirts</li>
                        <li onClick={() => setFilter('long-pants')}>long shirts</li>
                        <li onClick={() => setFilter('black-pants')}>black shirts</li>
                        <li onClick={() => setFilter('white-pants')}>white shirts</li>
                        <li onClick={() => setFilter('summer-pants')}>summer shirts</li>
                        <li onClick={() => setFilter('winter-pants')}>winter shirts</li>
                    </ul>
                </li>
            </ul>
            <div className="search">
                <span>name</span>
                <input name="name" type="text" placeholder="search" onChange={handleChange} />
            </div>
        </div >
    );
}