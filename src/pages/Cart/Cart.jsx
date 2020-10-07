import React, { useEffect } from 'react'
import { useState } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import userService from '../../services/userService'
import '../Cart/Cart.scss'

function _Cart(props) {
    const { user } = props
    const history = useHistory();
    let [totalPrice, setPrice] = useState(0)

    useEffect(() => {
        if (user) {
            totalPrice = 0
            user.cart.forEach(item => {
                totalPrice += Number(item.price)
                setPrice(totalPrice)
            })
        }
    }, [user])

    async function removeFromCart(itemId) {
        const idx = user.cart.findIndex(item => item._id === itemId)
        user.cart.splice(idx, 1)
        await props.saveUser(user)
        await props.setUser()
    }

    async function buyCart() {
        const order = {
            id: makeId(),
            createdAt: Date.now(),
            items: JSON.parse(JSON.stringify(user.cart)),
            totalPrice
        }
        //     address,
        //     phoneNumber,
        user.cart = []
        user.orders.push(order)
        await props.saveUser(user)
        await props.setUser()
        userService.sendMailToOwner(user._id, order.id)
    }

    function makeId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

    function goShop() {
        history.push('/shop')
    }

    return (
        <div className="flex cart-container">

            {user && !user.cart.length &&
                <div>
                    <h1>your cart is empty</h1>
                    <h3> when you add item to your cart he will show up here</h3>
                    <button className="app-btn" onClick={() => goShop()}>lets start</button>
                </div>}

            {user &&
                <div className="items-list-cart flex column">
                    {user.cart.map(item => {
                        return <div className="cart-preview-container flex" key={item._id}>
                            <Link to={`/item/${item._id}`} >
                                <img className="test-img" src={item.imgUrls[0]} />
                            </Link>
                            <div className="item-details-cart flex column">
                                <p>
                                    {item.name}
                                </p>
                                <p>
                                    {item.color}
                                </p>
                                <p>
                                    {item.size}
                                </p>
                                <p>
                                    ${item.price}
                                </p>
                            </div>
                            <div className="cancel-edit-cart-item">
                                <button onClick={() => removeFromCart(item._id)}>X</button>
                                <Link to={`/item/${item._id}`}>edit</Link>
                            </div>
                        </div>
                    })}
                </div>}


            {props.user && <div className="buy-now">
                <h2>
                    Summary
                    </h2>
                <p>
                    {user.cart.length} items
                    </p>
                <p>
                    shipping :
                    </p>
                <p>
                    Total : ${totalPrice}
                </p>
                <button onClick={buyCart}>  Buy Now </button>
            </div>}

        </div>


    )
}

function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    saveUser,
    setUser,
}

export const Cart = connect(mapStateProps, mapDispatchToProps)(_Cart)
