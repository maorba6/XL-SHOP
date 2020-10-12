import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './Filter.scss'

export function Filter(props) {

    const [state, setState] = useState({
        categoriesStyle: { display: 'none' },
        colorsStyle: { display: 'none' },
        priceStyle: { display: 'none' },
        filterBy: {
            name: '',
            category: '',
            price: { min: 0, max: 800 },
            color: '',
            sortByPrice: ''
        },

    })



    useEffect(() => {
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

    function setCategory(category) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category } }))
    }

    function setColor(color) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, color } }))
    }

    function setPrice(sortByPrice) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, sortByPrice } }))
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

    function toggleTypes(display) {
        setState(state => ({ ...state, categoriesStyle: { ...state.categoriesStyle, display } }))
    }

    function toggleColors() {
        if (state.colorsStyle.display === 'flex') {
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'flex' } }))
        }
    }


    function togglePrice() {
        if (state.priceStyle.display === 'flex') {
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'flex' } }))
        }
    }



    return (
        <div className="filter" onMouseLeave={() => toggleTypes('none')}>

            <ul className="ul-titles flex" onMouseEnter={() => toggleTypes('flex')} >
                <li>Pants</li>
                <li>Shirts</li>
                <li>Acessories</li>
            </ul>
            <div style={state.categoriesStyle} className="all-categories flex" >
                <ul className="sublist pants">
                    <li onClick={() => setCategory('elegant-pants')}>Elegant pants</li>
                    <li onClick={() => setCategory('jeans')}>jeans</li>
                    <li onClick={() => setCategory('Cotton-pants')}>Cotton pants</li>
                </ul>
                <ul className="sublist shirts" >
                    <li onClick={() => setCategory('polo-shirts')}>polo shirts</li>
                    <li onClick={() => setCategory('t-shirts')}>t-shirts</li>
                    <li onClick={() => setCategory('button-down shirts')}>Button down shirts</li>
                </ul>
                <ul className="sublist flex column acessories" >
                    <li onClick={() => setCategory('Coats')}>coats</li>
                    <li onClick={() => setCategory('Suits')}>suits</li>
                    <li onClick={() => setCategory('Socks')}>Socks</li>
                    <li onClick={() => setCategory('Belts')}>Belts</li>
                    <li onClick={() => setCategory('Underpants')}>underpants</li>
                    <li onClick={() => setCategory('Tank-tops')}>tank tops</li>
                    <li onClick={() => setCategory('Ties')}>ties</li>
                    <li onClick={() => setCategory('Tricot')}>tricot</li>
                    <li onClick={() => setCategory('Potter-shorts')}>Potter shorts</li>
                    <li onClick={() => setCategory('Sweaters')}>sweaters</li>
                    <li onClick={() => setCategory('Shlikes')}>Shlikes</li>
                    <li onClick={() => setCategory('Bermudas')}>Bermudas</li>
                    <li onClick={() => setCategory('Cardigans')}>Cardigans</li>
                    <li onClick={() => setCategory('Hoodies')}>hoodies</li>
                </ul>
            </div>

            {/* <div className="search">
                <span>name</span>
                <input className="app-input" name="name" type="text" placeholder="search" onChange={handleChange} />
            </div> */}
            <div className="sort flex ">
               

                <div className="color-select flex column">
                    <button onClick={() => toggleColors()} className="btn-sort" >Color</button>
                    <ul style={state.colorsStyle} className="colors-container flex ">
                        <li onClick={() => setColor('green')} className="opt option-green" ></li>
                        <li onClick={() => setColor('yellow')} className="opt option-yellow" ></li>
                        <li onClick={() => setColor('black')} className="opt option-black" ></li>
                        <li onClick={() => setColor('blue')} className="opt option-blue"></li>
                        <li onClick={() => setColor('white')} className="opt option-white" ></li>
                        <li onClick={() => setColor('pink')} className="opt option-pink"></li>
                        <li onClick={() => setColor('pink')} className="opt option-red"></li>
                        <li onClick={() => setColor('pink')} className="opt option-purple"></li>

                    </ul>
                </div>

                <div className="sort-select flex column">
                    <button onClick={() => togglePrice()} className="btn-sort" >Price</button>
                    <ul style={state.priceStyle} className=" flex column" >
                        <li onClick={() => setPrice('esc')} >Low To High</li>
                        <li onClick={() => setPrice('desc')} >High To Low</li>
                    </ul>
                </div>
            </div>




            {/* <InputRange
                maxValue={800}
                minValue={0}
                value={state.filterBy.price}
                onChange={value => setPriceRange(value)}
            /> */}



        </div >
    );

}