import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
//services
import utilService from '../../services/utilService';
//svg
import { ReactComponent as HeartColor } from '../../assets/img/heart-color2.svg';
import { ReactComponent as HeartWhite } from '../../assets/img/heart-white2.svg';
import { connect } from 'react-redux';
import './Preview.scss'
import { useState } from 'react';

function _Preview(props) {
    const { item, removeItem, user, toggleLike } = props
    let [liked, setLike] = useState(false)

    useEffect(() => {
        if (user) {
            setLike(false)
            user.favs.forEach(i => {
                if (i._id === item._id) {
                    setLike(true)
                }
            })
        }
    }, [user])


    function onRemoveItem(ev, itemId) {
        if (liked) {
            toggleLike(ev, liked, item)
        }
        removeItem(itemId)
    }

    return (
        <div className="preview flex">
            {user && user.isAdmin && <p className="delete-item" onClick={(ev) => onRemoveItem(ev, item._id)} >X</p>}
            <Link to={`/item/${item._id}`} >
                <img className="img-item" src={item.imgUrls[0]} />
                <div className="flex column">
                    <label className="item-name">{item.name}</label>
                    <div className="flex space-between img-price">
                        <p className="item-price rtl"> מחיר: ₪{item.price}</p>
                        {liked && <HeartColor className="heart-img red" onClick={(ev) => toggleLike(ev, liked, item)} ></HeartColor>}
                        {!liked && <HeartWhite className="heart-img " onClick={(ev) => toggleLike(ev, liked, item)} ></HeartWhite>}
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