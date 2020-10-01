import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { setUser } from '../../actions/userActions'
import userService from '../../services/userService'
import { NavLink, useHistory } from 'react-router-dom'
import './Header.scss'
function _Header(props) {
    const history = useHistory();

    useEffect(() => {
        props.setUser()
        return () => {
        }
    })

    async function logout() {
        await userService.logout()
        props.setUser()
        history.push('/')
    }

    return (
        <header className="header">
            <div><NavLink className="logo" activeClassName='active-path' to="/" exact >Logo</NavLink></div>
            <ul className="flex">
                {!props.user && <li><NavLink to="/login" exact >Login</NavLink></li>}
                {props.user && <button onClick={() => logout()}>Logout</button>}
                <li><NavLink to="/shop" exact >Shop</NavLink></li>
                {props.user && <li><NavLink to="/profile"  >Profile</NavLink></li>}
            </ul>
        </header>
    );
}


function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    setUser
}
export const Header = connect(mapStateProps, mapDispatchToProps)(_Header)