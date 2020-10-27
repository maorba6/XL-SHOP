import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

import './UserOrders.scss'
//cmps
import { List } from '../../cmps/List/List'

export default function UserOrders(props) {
    const { user } = props

    const history = useHistory();

    function goShop() {
        history.push('/shop')
    }



    return (
        <section className="flex user-orders">
            {!user.orders.length &&
                <div className="no-orders">
                    <h1>אין כרגע הזמנות ברשימה</h1>
                    <h3>בקניית מוצרים , הם יופיע כאן</h3>
                    <button className="app-btn" onClick={() => goShop()}>לחנות</button>
                </div>}
            <div className="orders-list">
                {!!user.orders.length && user.orders.map(order => {
                    return <div className="order" key={order.id}>
                        <img src={order.items[0].imgUrls[0]} alt="" />
                        <div className="flex column">
                            <div className="order-details rtl">
                                <p>נוצר ב: {new Date(order.createdAt).toLocaleDateString('en-GB')}</p>
                                <p className="order-id">  <label >מספר הזמנה:</label>{order.id}</p>
                                <p>כמות מוצרים: {order.items.length}</p>
                                <p>סכום כולל: ₪{order.totalPrice}</p>
                                <Link to={`/order/${order.id}`}>פירוט הזמנה</Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </section>
    )
}
