import React from 'react'
import { connect } from 'react-redux'

import '../Cart/Cart.scss'

 function _Cart(props) {
    const user = props.user
    return (
        <div>
           {props.user && <div>
            {user.cart.map(item => {
            return <div>
                <img className="test-img" key={item._id} src={item.imgUrls[0]} />
                <p>
                    price:{item.price}
                </p>
            </div>})}
        </div>} 


        
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
