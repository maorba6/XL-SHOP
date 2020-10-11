import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './Filter.scss'

export function Filter(props) {

    const [state, setState] = useState({
        pants:
            { display: 'none', },
        shirts:
            { display: 'none' },
        accessories:
            { display: 'none' },
        filterBy: {
            name: '',
            category: '',
            price: { min: 0, max: 800 }
        }
    })

    useEffect(() => {

    }, [])

    useEffect(() => {
        console.log('category changed', props.category);
        if (props.category) {
            setState(state => ({ ...state, filterBy: { ...state.filterBy, category: props.category } }))
        }
    }, [props.category])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        state.filterBy[field] = value
        props.setFilter(state.filterBy)
    }

    function setFilter(category) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category } }))
    }

    function setPriceRange(value) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, price: value } }))

    }



    useEffect(() => {
        console.log('filter changed');
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
                <li className="list-title" onMouseEnter={() => toggleTypes('block', 'pants')} onMouseLeave={() => toggleTypes('none', 'pants')}>
                    <label >pants</label>
                    <ul style={state.pants} className="sublist">
                        <li onClick={() => setFilter('elegant-pants')}>Elegant pants</li>
                        <li onClick={() => setFilter('jeans')}>jeans</li>
                        <li onClick={() => setFilter('Cotton-pants')}>Cotton pants</li>
                    </ul>
                </li>

                <li onMouseEnter={() => toggleTypes('block', 'shirts')} onMouseLeave={() => toggleTypes('none', 'shirts')}>
                    <label>shirts</label>
                    <ul style={state.shirts} className="sublist" >
                        <li onClick={() => setFilter('polo-shirts')}>polo shirts</li>
                        <li onClick={() => setFilter('t-shirts')}>t-shirts</li>
                        <li onClick={() => setFilter('button-down shirts')}>Button down shirts</li>
                    </ul>
                </li>

                <li onMouseEnter={() => toggleTypes('block', 'accessories')} onMouseLeave={() => toggleTypes('none', 'accessories')}>
                    <label>accessories</label>
                    <ul style={state.accessories} className="sublist" >
                        <li onClick={() => setFilter('Coats')}>coats</li>
                        <li onClick={() => setFilter('Suits')}>suits</li>
                        <li onClick={() => setFilter('Socks')}>Socks</li>
                        <li onClick={() => setFilter('Belts')}>Belts</li>
                        <li onClick={() => setFilter('Underpants')}>underpants</li>
                        <li onClick={() => setFilter('Tank-tops')}>tank tops</li>
                        <li onClick={() => setFilter('Ties')}>ties</li>
                        <li onClick={() => setFilter('Tricot')}>tricot</li>
                        <li onClick={() => setFilter('Potter-shorts')}>Potter shorts</li>
                        <li onClick={() => setFilter('Sweaters')}>sweaters</li>
                        <li onClick={() => setFilter('Shlikes')}>Shlikes</li>
                        <li onClick={() => setFilter('Bermudas')}>Bermudas</li>
                        <li onClick={() => setFilter('Cardigans')}>Cardigans</li>
                        <li onClick={() => setFilter('Hoodies')}>hoodies</li>
                    </ul>
                </li>
            </ul>
            <div className="search">
                <span>name</span>
                <input className="app-input" name="name" type="text" placeholder="search" onChange={handleChange} />
            </div>
            <InputRange
                maxValue={800}
                minValue={0}
                value={state.filterBy.price}
                onChange={value => setPriceRange(value)}
            />
        </div >
    );

}