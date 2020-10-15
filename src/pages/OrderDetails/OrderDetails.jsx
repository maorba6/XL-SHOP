import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

//scss
import './OrderDetails.scss'

function _OrderDetails(props) {
    const { id } = props.match.params

    useEffect(() => {
    const idx = props.user.orders.findindex(order=>order._id===id)
    console.log(idx);
        
    }, [props.user])
    // const idx = props.user.orders.findindex(order=>order._id===id)

    // console.log(idx);
    return (
        (props.user&&<div>
            {props.user.orders[0].items[0]._id}
        </div>)
    )
}


function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem,
        user: state.userReducer.user,
        sameCategoryItems: state.itemReducer.sameCategoryItems
    }
}

const mapDispatchToProps = {
   
}
export const OrderDetails = connect(mapStateProps, mapDispatchToProps)(_OrderDetails)
