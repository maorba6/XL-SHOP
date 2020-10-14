import React from 'react'
import { useHistory } from 'react-router-dom'

import './UserOrders.scss'
//cmps
import { List } from '../../cmps/List/List'

export default function UserOrders(props) {
    const { user, toggleLike, clearOrders } = props

    const history = useHistory();

    function goShop() {
        history.push('/shop')
    }



    return (
        <section className="flex">
            {!user.orders.length &&
                <div>
                    <h1>you don't have orders yet</h1>
                    <h3> when you send order ,it will appear here with all details</h3>
                    <button className="app-btn" onClick={() => goShop()}>go shop</button>
                </div>}
                <div className="orders-list">
            {user.orders.map(order => {
                return <div className="order" key={order.id}>
                    <img src={order.items[0].imgUrls[0]} alt=""/>
                    <div className="flex column">
                        <div className="order-details">
                            <p>create at: {order.createdAt}</p>
                            <p className="text-he">{order.id} <label htmlFor="">:מספר הזמנה</label></p>
                            <p>Items: {order.items.length}</p>
                            <p>Total: {order.totalPrice}</p>
                            <a href="orders/details">פירוט הזמנה</a>
                        </div>
                    </div>
                </div>
            })}
            </div>

            {/* { !!user.orders.length && <button className="app-btn" onClick={() => clearOrders()}>clear orders</button>} */}
        </section>
    )
}
