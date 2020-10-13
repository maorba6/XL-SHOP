import React, { useState, useEffect } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import './Filter.scss'

export function Filter(props) {

    const [state, setState] = useState({
        categoryStyle: { display: 'none' },
        subCategoryStyle: { display: 'none' },
        colorsStyle: { display: 'none' },
        priceStyle: { display: 'none' },
        shirtsCategory: ['polo-shirts', 't-shirts', 'button-down-shirts'],
        pantsCategory: ['Elegant-pants', 'Jeans', 'Cotton-pants'],
        acessoriesCategory: ['Coats', 'Suits', 'Socks', 'Belts', 'Underpants', 'Tank - Tops', 'Ties',
            'Tricot', 'Potter - shorts', 'Sweaters', 'Shlikes', 'Bermudas', 'Cardigans', 'Hoddies'],
        category: null,
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
        setState(state => ({ ...state, category }))
    }

    function setColor(color) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, color } }))
    }
    function setSubCategory(category) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category } }))
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

    function toggleCategory() {
        if (state.categoryStyle.display === 'flex') {
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'flex' } }))
        }
    }

    function toggleSubCategory() {
        if (state.subCategoryStyle.display === 'flex') {
            setState(state => ({ ...state, subCategoryStyle: { ...state.subCategoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subCategoryStyle: { ...state.subCategoryStyle, display: 'flex' } }))
        }
    }



    const category = state.category
    return (
        <div className="filter" >

            <div className="flex">
                <div className="category-select flex column">
                    <button onClick={() => toggleCategory()} className={state.categoryStyle.display === 'flex' ? 'active btn-sort' : 'btn-sort'} >category</button>
                    <ul style={state.categoryStyle} className=" flex column" >
                        <li onClick={() => setCategory('shirtsCategory')} >Shirts</li>
                        <li onClick={() => setCategory('pantsCategory')} >Pants</li>
                        <li onClick={() => setCategory('acessoriesCategory')} >Acessories</li>
                    </ul>
                </div>
                <div className="subcategory-select flex column">
                    <button onClick={() => toggleSubCategory()} className={state.subCategoryStyle.display === 'flex' ? 'active btn-sort' : 'btn-sort'} >Subcategory</button>
                    <ul style={state.subCategoryStyle} className="flex column">
                        {category && state[category].map(c => {
                            return <li key={c} onClick={() => setSubCategory(c)} > {c}    </li>
                        })}
                    </ul>
                </div>
                <div className="color-select flex column">
                    <button onClick={() => toggleColors()} className={state.colorsStyle.display === 'flex' ? 'active btn-sort' : 'btn-sort'} >Color</button>
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
                    <button onClick={() => togglePrice()} className={state.priceStyle.display === 'flex' ? 'active btn-sort' : 'btn-sort'} >Price</button>
                    <ul style={state.priceStyle} className=" flex column" >
                        <li onClick={() => setPrice('esc')} >Low To High</li>
                        <li onClick={() => setPrice('desc')} >High To Low</li>
                    </ul>
                </div>
            </div>
            {/* <div className="search">
                <span>name</span>
                <input className="app-input" name="name" type="text" placeholder="search" onChange={handleChange} />
            </div> */}



        </div >
    );

}