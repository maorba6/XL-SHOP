import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveUser, setUser } from '../../actions/userActions'
//cmps
import UserAccount from '../../cmps/UserAccount/UserAccount'
import UserOrders from '../../cmps/UserOrders/UserOrders'
import UserFavs from '../../cmps/UserFavs/UserFavs'
import UserEdit from '../../cmps/UserEdit/UserEdit'

import './Profile.scss'
function _Profile(props) {
    let [current, setCurrent] = useState('account')
    const { user } = props
    const history = useHistory()

    useEffect(() => {

        return () => {
        }
    })

    function saveUser(ev, editedUser, type) {
        ev.preventDefault()
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
    async function toggleLike(ev, liked, item) {
        ev.preventDefault()
        if (!user) return
        if (liked) {
            const index = user.favs.findIndex(i => i._id === item._id)
            user.favs.splice(index, 1)
        } else {
            user.favs.push(item)
        }
        await props.saveUser(user)
        await props.setUser()
    }


 async   function clearOrders() {
        user.orders = []
        await props.saveUser(user)
        await props.setUser()
    }

    return (
        <div>
            {user && <h1 className="profile-welcome">welcome {user.fname + ' ' + user.lname}</h1>}
            <div className="flex profile">
            <nav className="nav-profile flex">
                <button className="profile-btn" onClick={() => setCurrent('account')}>My Account</button>
                <button className="profile-btn" onClick={() => setCurrent('edit')}>Edit User</button>
                <button className="profile-btn" onClick={() => setCurrent('orders')}>My Orders</button>
                <button className="profile-btn" onClick={() => setCurrent('favs')}>My Favorites</button>
            </nav>
            <div className="flex profile-section">
            {user && current === 'account' && <UserAccount user={user} saveUser={saveUser} />}
            {user && current === 'edit' && <UserEdit user={user} saveUser={saveUser} />}
            {user && current === 'orders' && <UserOrders user={user} toggleLike={toggleLike} clearOrders={clearOrders} />}
            {user && current === 'favs' && <UserFavs user={user} toggleLike={toggleLike} />}
            </div>
            </div>
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
    setUser
}
export const Profile = connect(mapStateProps, mapDispatchToProps)(_Profile)
