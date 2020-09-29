import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import emptyHeart from '../../assets/cart-icons/empty-heart.png';
import blackHeart from '../../assets/cart-icons/black-heart.png';

import { connect } from 'react-redux';


import './Preview.scss'

function _Preview(props) {
    const { item, removeItem } = props
    const user = JSON.parse(props.user)


    return (
        <div className="preview flex">
            {user && user.isAdmin && <p className="delete-item" onClick={() => removeItem(item._id)} >X</p>}
            <Link to={`/item/${item._id}`} >
                <img className="img-item" src={item.imgUrls[0]} />
                <div className="flex column">
                    <label className="item-name">{item.name}</label>
                    <div className="flex space-between img-price">
                        <p className="item-price"> ${item.price}</p>
                        <img className="heart-img" src={emptyHeart} alt="LOVE" />
                        {/* <img className="heart-img" src={blackHeart} alt="LOVE"/> */}
                        {/* TODO! if in wishlist show colored else show empty */}
                    </div>
                </div>
            </Link>
        </div>
    );
}


function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
}
export const Preview = connect(mapStateProps, mapDispatchToProps)(_Preview)