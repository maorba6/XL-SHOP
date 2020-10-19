import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import userService from '../../services/userService'
import { setUser } from '../../actions/userActions'
import './Header.scss'

//icons-svgs
import { ReactComponent as ShopSvg } from '../../assets/img/shop.svg';
import { ReactComponent as CartSvg } from '../../assets/img/cart.svg';
import { ReactComponent as MenuSvg } from '../../assets/img/menu.svg';
import { ReactComponent as ProfileSvg } from '../../assets/img/profile.svg';
//logo
import logo from '../../assets/logo.png'

function _Header(props) {
    const history = useHistory();

    const [showMenu, setToggle] = useState(false)

    useEffect(() => {
        props.setUser()
        return () => {
        }
    }, [])

    async function logout() {
        await userService.logout()
        props.setUser()
        history.push('/')
    }


    function toggleMenu() {
        console.log({ showMenu });
        setToggle(!showMenu)

    }

    return (
        <header className="header flex">
            <NavLink className="logo" activeClassName='active-path' to="/" exact ><img src={logo} /></NavLink>
            <div onClick={() => toggleMenu()} className={`screen ${showMenu ? 'menu-open' : ''}`}></div>

            <ul className="flex nav-header">
                {props.user && props.user.isAdmin && <li><NavLink className="admin" to="/admin" exact >admin</NavLink></li>}
                {!props.user && <li><NavLink to="/login" className="login" exact >Login</NavLink></li>}

                <li><NavLink to="/shop" exact ><ShopSvg className="svg" title="shop"></ShopSvg></NavLink></li>
                {props.user && <li><NavLink to="/cart"><CartSvg className="svg" title="cart"></CartSvg></NavLink></li>}
                {props.user && <li><ProfileSvg className="svg" title="profile" onClick={() => toggleMenu()}></ProfileSvg ></li>}
                {showMenu && <ul className="menu">
                    <li> <NavLink onClick={() => toggleMenu()} to="/profile/orders">  My Orders  </NavLink> </li>
                    <li> <NavLink onClick={() => toggleMenu()} to="/profile/wishlist">Wishlist </NavLink></li>
                    <li> <NavLink onClick={() => toggleMenu()} to="/profile/account">My Account </NavLink></li>
                    <li> <NavLink onClick={() => toggleMenu()} to="/profile/edit">Edit Profile </NavLink></li>

                    <li> <button onClick={() => logout()}>Logout </button></li>

                </ul>}




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