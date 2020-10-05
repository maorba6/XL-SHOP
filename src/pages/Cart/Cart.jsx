import React,{useEffect} from 'react'
import { useState } from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import '../Cart/Cart.scss'

 function _Cart(props) {
    const user = props.user
    let [totalPrice,updatePrice] = useState(0)
    useEffect(() => {
        if(user){
            user.cart.forEach(item=>totalPrice+= +item.price)
            updatePrice(totalPrice)
        }
    }, [user])
    return (
        <div className="flex cart-container">
           {props.user && 
           <div className="items-list-cart flex column">
                {user.cart.map(item => {
                return <div className="cart-preview-container flex" key={item._id}> 
                    <Link  to={`/item/${item._id}`} >
                        <img className="test-img"  src={item.imgUrls[0]} />
                    </Link>
                    <div className="item-details-cart flex column">
                        <p>
                            {item.name}
                        </p>
                        <p>
                            {item.color}
                        </p>
                        <p>
                            {item.size}
                        </p>
                        <p>
                            ${item.price}
                         </p>
                    </div>
                    <div className="cancel-edit-cart-item">
                        <p>
                            X
                        </p>
                        <p>
                            EDIT
                        </p>
                    </div>
                </div>})}
                <button>BUY NOW</button>
        </div>} 

        
        {props.user &&  <div className="buy-now">
                    <h2>
                        Summary
                    </h2>
                    <p>
                        {user.cart.length} items
                    </p>
                    <p>
                        shipping : 
                    </p>
                    <p>
                        Total : {totalPrice}
                    </p>
                    <button>
                        Buy Now
                    </button>
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
