import React from 'react'
import './UserOrders.scss'
//cmps
import { List } from '../../cmps/List/List'

export default function UserOrders(props) {
    const { user,toggleLike } = props
    return (
        <section>
            {user.orders.map(order => {
                return <div className="order" key={order.id}>
                    <div >order sent at:{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div >status:{order.status}</div>
                    <div>items: <List items={order.items} toggleLike={toggleLike}></List></div>
                    <div>total price:{order.totalPrice}</div>
                </div>
            })}


        </section>
    )
}
