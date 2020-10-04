import React from 'react'
import { connect } from 'react-redux'

 function _Cart(props) {
    const user = props.user
    console.log(user);
    return (
        <div>
           {props.user && <div>{user.email}</div>} 
        </div>
    )
}

function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
}

export const Cart = connect(mapStateProps, mapDispatchToProps)(_Cart)
