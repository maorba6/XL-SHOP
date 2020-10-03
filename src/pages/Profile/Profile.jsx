import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveUser } from '../../actions/userActions'
//cmps
import UserAccount from '../../cmps/UserAccount/UserAccount'
import UserOrders from '../../cmps/UserOrders/UserOrders'
import UserFavs from '../../cmps/UserFavs/UserFavs'
import UserEdit from '../../cmps/UserEdit/UserEdit'

import './Profile.scss'
function _Profile(props) {
    let [current, setCurrent] = useState('account')
    const user = props.user
    const history = useHistory()

    useEffect(() => {
        console.log(user);
        if (!user) history.push('/')
        return () => {
        }
    })

    function saveUser(ev, editedUser, type) {
        ev.preventDefault()

        console.log({ editedUser, user, type });
        if (type === 'details') {
            props.saveUser(editedUser)
            history.push('/')
            return
        }
        // all pass  true and email  stay same so  save user
        if (editedUser.newPass && editedUser.currPass && editedUser.newPassConfirm) {
            if (editedUser.email !== user.email) {
                console.log('cannot change email and password at the same time');
                return
            }
            const isPasswordValid = validatePassword(editedUser.newPass)
            if (!isPasswordValid) {
                console.log('password is too weak'); // add msg in pass weak
                return
            }
            props.saveUser(editedUser)
            history.push('/')
            // email diffrent and all password are false then save user
        } else if ((editedUser.email !== user.email) && (!editedUser.newPass && !editedUser.currPass && !editedUser.newPassConfirm)) {
            props.saveUser(editedUser)
            history.push('/')
            // not all pass fills
        } else {
            console.log('not all passwords are filled');
        }

    }

    //at least 8 digits , 1 capital letter 1 not 
    function validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password)
    }




    return (
        <div>
            {user && <h1>welcome {user.fname + ' ' + user.lname}</h1>}
            <nav>
                <button onClick={() => setCurrent('account')}>My Account</button>
                <button onClick={() => setCurrent('edit')}>Edit User</button>
                <button onClick={() => setCurrent('orders')}>My Orders</button>
                <button onClick={() => setCurrent('favs')}>My Favorites</button>
            </nav>
            {user && current === 'account' && <UserAccount user={user} saveUser={saveUser} />}
            {user && current === 'edit' && <UserEdit user={user} saveUser={saveUser} />}
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
    saveUser
}
export const Profile = connect(mapStateProps, mapDispatchToProps)(_Profile)
