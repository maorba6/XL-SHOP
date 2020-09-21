import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import trash from '../../assets/trash.png';
import { connect } from 'react-redux';


import './Preview.scss'

function _Preview(props) {
    const { item, removeItem } = props
    const user = JSON.parse(props.user)


    return (
        <div className="preview flex">
            {user && user.isAdmin && <p className="delete-item" onClick={() => removeItem(item._id)} src={trash}>X</p>}
            <div className="flex img-container">
                <Link to={`item/${item._id}`} >
                    <img className="img-item" src={item.imgUrl} />
                </Link>
            </div>
            <p className="item-price">price: ${item.price}</p>
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