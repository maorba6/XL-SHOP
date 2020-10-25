import React, { useState, useEffect } from 'react';
import 'react-input-range/lib/css/index.css'
import './Filter.scss'

export function Filter(props) {

    const [state, setState] = useState({
        categoryStyle: { display: 'none' },
        subcategoryStyle: { display: 'none' },
        colorsStyle: { display: 'none' },
        priceStyle: { display: 'none' },
        shirts: [{ he: 'חולצות פולו', en: 'Polo-Shirts' }, { he: 'טי שירט', en: 'T-Shirts' }, { he: 'מכופתרות', en: 'Button-Down-Shirts' }],
        pants: [{ he: 'מכנסי כותנה', en: 'Cotton-Pants' }, { he: 'גינסים', en: 'Jeans' }, { he: 'מכנסי אלגנט', en: 'Elegant-Pants' }],
        accessories: [
            { he: 'מעילים', en: 'Coats' }, { he: 'חליפות', en: 'Suits' }, { he: 'גרביים', en: 'Socks' }, { he: 'חגורות', en: 'Belts' },
            { he: 'תחתונים', en: 'Underpants' }, { he: 'גופיות', en: 'Tank - Tops' }, { he: 'עניבות', en: 'Ties' }, { he: 'מכנס טריקו', en: 'Tricot' },
            { he: 'מכנסי פוטר', en: 'Potter - Shorts', }, { he: 'סוודרים', en: 'Sweaters' }, { he: 'שליקס', en: 'Shlikes' }, { he: 'ברמודות', en: 'Bermudas' },
            { he: 'קרדיגן', en: 'Cardigans' }, { he: 'קפוצ\'ונים', en: 'Hoddies' }],

        filterBy: {
            name: '',
            category: '',
            color: '',
            subcategory: '',
            sortByPrice: ''
        },
        filterByHe: {
            name: '',
            category: '',
            color: '',
            subcategory: '',
            sortByPrice: ''
        },

    })

    useEffect(() => {
        props.setFilter('', state.filterBy)
    }, [state.filterBy])

    useEffect(() => {
        if (props.subcategory) {
            setState(state => ({ ...state, filterBy: { ...state.filterBy, subcategory: props.subcategory } }))
        }
    }, [props.subcategory])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        state.filterBy[field] = value
    }

    function setCategory(categoryEn, categoryHe) {
        console.log(!!categoryEn);
        if (!categoryEn) {
            setState(state => ({ ...state, filterBy: { ...state.filterBy, subcategory: '' } }))
            setState(state => ({ ...state, filterByHe: { ...state.filterByHe, subcategory: '' } }))
        }
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category: categoryEn } }))
        setState(state => ({ ...state, filterByHe: { ...state.filterByHe, category: categoryHe } }))
    }

    function setColor(colorEn, colorHe) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, color: colorEn } }))
        setState(state => ({ ...state, filterByHe: { ...state.filterByHe, color: colorHe } }))
    }
    function setSubCategory(subcategoryEn, subcategoryHe) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, subcategory: subcategoryEn } }))
        setState(state => ({ ...state, filterByHe: { ...state.filterByHe, subcategory: subcategoryHe } }))
    }
    function setPrice(sortByPriceEn, sortByPriceHe) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, sortByPrice: sortByPriceEn } }))
        setState(state => ({ ...state, filterByHe: { ...state.filterByHe, sortByPrice: sortByPriceHe } }))
    }

    function toggleColors() {
        if (state.colorsStyle.display === 'flex') {
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'flex' } }))
        }
    }

    function togglePrice() {
        if (state.priceStyle.display === 'flex') {
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'flex' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        }
    }

    function toggleCategory() {
        if (state.categoryStyle.display === 'flex') {
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'flex' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        }
    }

    function toggleSubCategory() {
        if (state.subcategoryStyle.display === 'flex') {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'flex' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        }
    }

    return (
        <form className="filter rtl  flex" onSubmit={(ev) => props.setFilter(ev, state.filterBy)} >
            <div className="flex  filter-container ">
                <div className="select flex column">
                    <label >שם מוצר</label>
                    <input className="btn-sort" name="name" type="text" placeholder="חפש" onChange={handleChange} />
                </div>
                <div className="select flex column">
                    <label > קטגוריה</label>
                    <button onClick={() => toggleCategory()} className='btn-sort'  >{state.filterByHe.category}</button>
                    <ul style={state.categoryStyle} className=" flex column" >
                        <li className={state.filterBy.category === '' ? 'active' : ''} onClick={() => setCategory('', '')} >הכל</li>
                        <li className={state.filterBy.category === 'shirts' ? 'active' : ''} onClick={() => setCategory('shirts', 'חולצות')} >חולצות</li>
                        <li className={state.filterBy.category === 'pants' ? 'active' : ''} onClick={() => setCategory('pants', 'מכנסיים')} >מכנסיים</li>
                        <li className={state.filterBy.category === 'accessories' ? 'active' : ''} onClick={() => setCategory('accessories', 'אביזרים')} >אביזרים</li>
                    </ul>
                </div>
                <div className="select flex column">
                    <label > תת-קטגוריה</label>
                    <button onClick={() => toggleSubCategory()} className='btn-sort'  >{state.filterByHe.subcategory}</button>
                    <ul style={state.subcategoryStyle} className="flex column">
                        {state.filterBy.category && state[state.filterBy.category].map(c => {
                            return <li key={c.en} className={state.filterBy.subcategory === c.en ? 'active' : ''} onClick={() => setSubCategory(c.en, c.he)} > {c.he}    </li>
                        })}
                    </ul>
                </div>
                <div className="select flex column">
                    <label > צבע</label>
                    <button onClick={() => toggleColors()} className='btn-sort' >{state.filterByHe.color}</button>
                    <ul style={state.colorsStyle} className="colors-container flex ">
                        <li title="ירוק" onClick={() => setColor('green', 'ירוק')} className="opt option-green" ></li>
                        <li title="גינס" onClick={() => setColor('jeans', 'גי\'נס')} className="opt option-jeans" ></li>
                        <li title="שחור" onClick={() => setColor('black', 'שחור')} className="opt option-black" ></li>
                        <li title="כחול" onClick={() => setColor('blue', 'כחול')} className="opt option-blue"></li>
                        <li title="לבן" onClick={() => setColor('white', 'לבן')} className="opt option-white" ></li>
                        <li title="ורוד" onClick={() => setColor('pink', 'ורוד')} className="opt option-pink"></li>
                        <li title="חום" onClick={() => setColor('brown', 'חום')} className="opt option-brown"></li>
                        <li title="בז'" onClick={() => setColor('beige', 'בז\'')} className="opt option-beige"></li>
                        <li title="בורדו" onClick={() => setColor('maroon', 'בורדו')} className="opt option-maroon"></li>
                        <li title="אפור" onClick={() => setColor('gray', 'אפור')} className="opt option-gray"></li>
                        <li title="תכלת" onClick={() => setColor('lightblue', 'תכלת')} className="opt option-lightblue"></li>
                        <li title="ירוק בהיר" onClick={() => setColor('lightgreen', 'ירוק בהיר')} className="opt option-lightgreen"></li>
                    </ul>
                </div>
                <div className="select flex column">
                    <label >מחיר</label>
                    <button onClick={() => togglePrice()} className='btn-sort'  >{state.filterByHe.sortByPrice}</button>
                    <ul style={state.priceStyle} className=" flex column" >
                        <li className={state.filterBy.sortByPrice === 'Low-To-High' ? 'active' : ''} onClick={() => setPrice('Low-To-High', 'נמוך לגבוה')} >נמוך לגבוה</li>
                        <li className={state.filterBy.sortByPrice === 'High-To-Low' ? 'active' : ''} onClick={() => setPrice('High-To-Low', 'גבוה לנמוך')} >גבוה לנמוך</li>
                    </ul>
                </div>
            </div>
        </form >
    );

}