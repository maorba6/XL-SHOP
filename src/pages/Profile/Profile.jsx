import React, { useState } from 'react'
import UserAccount from '../../cmps/UserAccount/UserAccount'
import UserOrders from '../../cmps/UserOrders/UserOrders'
import UserFavs from '../../cmps/UserFavs/UserFavs'
import { connect } from 'react-redux'
import { setUser } from '../../actions/userActions'


import './Profile.scss'
function _Profile(props) {
    let [current, setCurrent] = useState('account')
    const user = JSON.parse(props.user)
    return (
        <div>
            {user && <h1>welcome {user.fname + ' ' + user.lname}</h1>}
            <nav>
                <button onClick={() => setCurrent('account')}>my account</button>
                <button onClick={() => setCurrent('orders')}>my orders</button>
                <button onClick={() => setCurrent('favs')}>my favorites</button>
            </nav>
            {user && current === 'account' && <UserAccount user={user} />}
            {user && current === 'orders' && <UserOrders user={user} />}
            {user && current === 'favs' && <UserFavs user={user} />}
        </div>
    )
}

function mapStateProps(state) {
    return {

        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    setUser
}
export const Profile = connect(mapStateProps, mapDispatchToProps)(_Profile)
