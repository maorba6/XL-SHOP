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
            {user.orders.map(order => {
                return <div className="order" key={order.id}>
                    <div >order sent at:{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div >status:{order.status}</div>
                    <div>items: <List items={order.items} toggleLike={toggleLike}></List></div>
                    <div>total price:{order.totalPrice}</div>
                </div>
            })}

            {/* { !!user.orders.length && <button className="app-btn" onClick={() => clearOrders()}>clear orders</button>} */}
        </section>
    )
}
