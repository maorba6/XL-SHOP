import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem, setSameCategoryItems, removeItem } from '../../actions/itemActions'
import { saveUser, setUser } from '../../actions/userActions'
import Swal from 'sweetalert2'
//services

import utilService from '../../services/utilService';

//components
import { List } from '../../cmps/List/List'
import ImgCarousel from '../../cmps/ImgCarousel/ImgCarousel'
import ReactLoading from 'react-loading';
import './Details.scss'

function _Details(props) {

    const [state, setState] = useState({
        item: null,
        itemToBuy: null,
        chosenSize: null,
        chosenColor: null,
        sameCategoryItems: [],
    })

    useEffect(() => {
        setItem()
    }, [])

    async function setItem() {
        const { id } = props.match.params
        await props.loadItem(id)
    }

    useEffect(() => {
        setState(state => ({ ...state, item: props.item, itemToBuy: props.item }))
        if (state.item) {
            (async () => {
                await props.setSameCategoryItems(state.item.category, state.item._id)
            })()
            return () => {
            }
        }
    }, [props.item, state.item])

    useEffect(() => {
        setState(state => ({ ...state, sameCategoryItems: props.sameCategoryItems }))
    }, [props.sameCategoryItems])

    useEffect(() => {
        setItem()
        props.loadItems()
    }, [props.match.params])

    function setColor(color) {
        setState(state => ({ ...state, itemToBuy: { ...state.itemToBuy, color } }))
        setState(state => ({ ...state, chosenColor: color }))

    }

    async function toggleLike(ev, liked, item) {
        ev.preventDefault()
        if (!props.user) return
        if (liked) {
            const index = props.user.favs.findIndex(i => i._id === item._id)
            props.user.favs.splice(index, 1)
        } else {
            props.user.favs.push(item)
        }
        await props.saveUser(props.user)
        await props.setUser()
    }

    async function removeItem(id) {
        await props.removeItem(id)
        setItem()
    }

    function setSize(size) {
        setState(state => ({ ...state, itemToBuy: { ...state.itemToBuy, size } }))
        setState(state => ({ ...state, chosenSize: size }))
    }

    async function addToCart() {
        if (!props.user) {
            utilService.swal('center', 2500, 'error', 'Please login')
            return
        }
        const itemToCart = state.itemToBuy
        if (!itemToCart.size || !itemToCart.color) {
            utilService.swal('center', 2500, 'error', 'Please choose size and color')
            return
        }
        delete itemToCart.colors
        delete itemToCart.sizes
        props.user.cart.push(itemToCart)
        await props.saveUser(props.user)
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Item added to cart '
        })
    }

    function tranlate(string) {
        let tranlation = null
        switch (string) {
            case 'shirts': tranlation = 'חולצות'
                break;
            case 'pants': tranlation = 'מכנסיים'
                break;
            case 'accessories': tranlation = 'אביזרים'

        }
        return tranlation
    }

    // shirts: [{ he: 'חולצות פולו', en: 'Polo-Shirts' }, { he: 'טי שירט', en: 'T-shirts' }, { he: 'מכופתרות', en: 'Button-Down-Shirts' }],
    // pants: [{ he: 'מכנסי כותנה', en: 'Cotton-Pants' }, { he: 'גינסים', en: 'jeans' }, { he: 'מכנסי אלגנט', en: 'Elegant-pants' }],
    // accessories: [
    //     { he: 'מעילים', en: 'Coats' }, { he: 'חליפות', en: 'Suits' }, { he: 'גרביים', en: 'Socks' }, { he: 'חגורות', en: 'Belts' },
    //     { he: 'תחתונים', en: 'Underpants' }, { he: 'גופיות', en: 'Tank - Tops' }, { he: 'עניבות', en: 'Ties' }, { he: 'מכנס טריקו', en: 'Tricot' },
    //     { he: 'מכנסי פוטר', en: 'Potter - shorts', }, { he: 'סוודרים', en: 'Sweaters' }, { he: 'שליקס', en: 'Shlikes' }, { he: 'ברמודות', en: 'Bermudas' },
    //     { he: 'קרדיגן', en: 'Cardigans' }, { he: 'קפוצ\'ונים', en: 'Hoddies' }],

    const { item, chosenSize, chosenColor, sameCategoryItems } = state
    const { user } = props

    if (!item)
        return <ReactLoading className="loading" type={'spokes'} color={'#aaa'} height={50} width={50} />
    return (
        <section className="item-details rtl flex column ">
            <div className="flex item-container">
                <ImgCarousel className="ltr" imgs={item.imgUrls}></ImgCarousel>
                <div className="details">
                    <h1 className="details-item-name">
                        {item.name}
                    </h1>
                    <div className="detail price"> ₪{item.price} </div>
                    <div className="category">
                        <span> קטגוריה:  {tranlate(item.category)}</span>
                    </div>
                    <div className="size ">
                        <div className=" detail pick">בחר מידה: {chosenSize}</div>
                        {item.sizes.map(size => {
                            return <button onClick={() => setSize(size)} key={size} className={"option option-size " + (size === chosenSize)}>{size}</button>
                        })}
                    </div>
                    <div className="color ">
                        <div className="detail pick"> בחר צבע : {chosenColor}</div>
                        {item.colors.map(color => {
                            return <button onClick={() => setColor(color)} key={color} className={'option option-' + color + (color === chosenColor)}></button>
                        })}
                    </div>
                    <button onClick={() => addToCart()} className="signin-button">  הוסף לעגלת קניות</button>
                    {user && user.isAdmin && <Link to={`/item/edit/${item._id}`} >ערוך מוצר </Link>}
                </div>
            </div>
            <div >
                <h2 className="title-like">אתה עשוי לאהוב  </h2>
                {<List className="flex" items={sameCategoryItems} removeItem={removeItem} toggleLike={toggleLike}   ></List>}
            </div>
        </section>
    )

}




function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem,
        user: state.userReducer.user,
        sameCategoryItems: state.itemReducer.sameCategoryItems
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItem,
    loadItems,
    saveItem,
    removeItem,
    setSameCategoryItems,
    saveUser,
    setUser
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Details = connect(mapStateProps, mapDispatchToProps)(_Details)