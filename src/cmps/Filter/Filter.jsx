import React, { useState } from 'react';
import './Filter.scss'
export function Filter(props) {


    const [state, setState] = useState({
        pants:
            { display: 'none' },
        shirts:
            { display: 'none' },
        filterBy: {
            name: '',
            type: ''
        }
    })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        state.filterBy[field] = value
        console.log(state.filterBy);
        props.setFilter(state.filterBy)
    }

    function setFilter() {

    }

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
                        <li>polo pants</li>
                        <li>black pants</li>
                        <li>white pants</li>
                        <li>summer pants</li>
                        <li>winter pants</li>
                    </ul>
                </li>

                <li onMouseEnter={() => toggleTypes('block', 'shirts')} onMouseLeave={() => toggleTypes('none', 'shirts')}>
                    <span>shirts</span>
                    <ul style={state.shirts} >
                        <li>short shirts</li>
                        <li>long shirts</li>
                        <li>black shirts</li>
                        <li>white shirts</li>
                        <li>summer shirts</li>
                        <li>winter shirts</li>
                    </ul>
                </li>
            </ul>
            <div className="search">
                <span>name</span>
                <input name="name" type="text" placeholder="search" onChange={handleChange} />
            </div>


            {/* <div className="search">
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
                    <option value="shirt">shirts</option>
                    <option value="pants">pants</option>
                    <option value="shoes">shoes</option>
                    <option value="accessories">accessories</option>
                </select>
            </div> */}

        </div >
    );
}