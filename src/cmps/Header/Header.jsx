import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import userService from '../../services/userService'
import { setUser } from '../../actions/userActions'
import './Header.scss'

//icons-svgs
import { ReactComponent as ShopSvg } from '../../assets/img/shop.svg';
import { ReactComponent as CartSvg } from '../../assets/img/cart.svg';
import { ReactComponent as MenuSvg } from '../../assets/img/menu.svg';
import { ReactComponent as ProfileSvg } from '../../assets/img/profile.svg';

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


    function toggleMenu(ev = '') {
        setToggle(!showMenu)

    }

    return (
        <header className="header flex">
            <NavLink className="logo" activeClassName='active-path' to="/" exact >Logo</NavLink>
            <div onClick={(ev) => toggleMenu(ev)} className={`screen ${showMenu ? 'menu-open' : ''}`}></div>

            <ul className="flex nav-header">
                {props.user && props.user.isAdmin && <li><NavLink to="/admin" exact >admin</NavLink></li>}
                {!props.user && <li><NavLink to="/login" exact >Login</NavLink></li>}
                {props.user && <button className="btn-logout" onClick={() => logout()}>Logout</button>}

                <li><NavLink to="/shop" exact ><ShopSvg className="svg" title="shop"></ShopSvg></NavLink></li>
                {props.user && <li><NavLink to="/profile"><ProfileSvg className="svg" title="profile"></ProfileSvg></NavLink></li>}
                {props.user && <li><NavLink to="/cart"><CartSvg className="svg" title="cart"></CartSvg></NavLink></li>}
                <li>  <MenuSvg className="btn-menu svg" onClick={() => toggleMenu()}></MenuSvg> </li>
                {showMenu && <ul className="menu">
                    <NavLink to="/shop"> shop</NavLink>
                    <NavLink to="/cart"> cart</NavLink>
                    <NavLink to="/profile"> profile</NavLink>
                    {!props.user && <NavLink to="/login"> login</NavLink>}
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