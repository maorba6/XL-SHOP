import React, { useEffect, useState } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import userService from '../../services/userService'
import Swal from 'sweetalert2'

//svgs
import { ReactComponent as DeleteSvg } from '../../assets/img/delete.svg';
import { ReactComponent as EditSvg } from '../../assets/img/edit.svg';

//services
import utilService from '../../services/utilService';


//cmps
import '../Cart/Cart.scss'

function _Cart(props) {
    const { user } = props

    const history = useHistory();
    const [order, setOrder] = useState({
        id: makeId(),
        createdAt: '',
        items: [],
        totalPrice: 0,
        address: '',
        phoneNumber: ''
    })

    useEffect(() => {
        if (user) {
            let totalPrice = 0
            user.cart.forEach(item => {
                totalPrice += Number(item.price)
                setOrder(order => ({ ...order, totalPrice }))
            })
            setOrder(order => ({ ...order, items: JSON.parse(JSON.stringify(user.cart)) }))
            setOrder(order => ({ ...order, createdAt: Date.now() }))
        }
    }, [user])

    async function removeFromCart(itemId) {
        const idx = user.cart.findIndex(item => item._id === itemId)
        user.cart.splice(idx, 1)
        await props.saveUser(user)
        await props.setUser()
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setOrder(order => ({ ...order, [field]: value }))
    }

    async function buyCart() {

        if (!order.address || !order.phoneNumber || !order.items.length) {
            utilService.swal('center', 2500, 'error', 'נא למלא מספר טלפון,כתובת ולוודא שבחרת פריטים ')

            return
        }
        user.cart = []

        user.orders.unshift(order)
        await props.saveUser(user)
        await props.setUser()
        userService.sendMailToOwner(user._id, order.id)
        Swal.fire({
            icon: 'success',
            title: 'ההזמנה נשלחה',
            // text: '',
            // footer: '<a href>Why do I have this issue?</a>'
        })
        history.push('/')

    }




    function makeId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

    function goShop() {
        history.push('/shop')
    }

    return (
        <div className="flex cart-container">

            {user && !user.cart.length &&
                <div className="empty-cart rtl">
                    <h2>עגלת הקניות שלך ריקה</h2>
                    <h3> בהוספת מוצר לעגלת הקניות תוכל לראות אותו כאן</h3>
                    <button className="app-btn rtl" onClick={() => goShop()}>לחנות</button>
                </div>}

            {user &&
                <div className="items-list-cart flex column">
                    {user.cart.map(item => {
                        return <div className="cart-preview-container flex" key={makeId()}>
                            <Link to={`/item/${item._id}`} >
                                <img className="test-img" src={item.imgUrls[0]} />
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
                                    ₪{item.price}
                                </p>
                            </div>
                            <div className="cancel-edit-cart-item">
                                <DeleteSvg className="delete-svg" onClick={() => removeFromCart(item._id)}></DeleteSvg>
                            </div>
                        </div>
                    })}
                </div>}


            {props.user && <div className="buy-now rtl">
                <h2>
                    סיכום הזמנה
                    </h2>
                <p>
                    {user.cart.length} כמות מוצרים
                    </p>
                <div className="address">
                    <label >כתובת</label>
                    <input className="app-input" type="text" name="address" value={order.address} onChange={handleChange} />

                </div>
                <div className="phone">
                    <label >מספר פלאפון</label>
                    <input className="app-input" type="number" name="phoneNumber" value={order.phoneNumber} onChange={handleChange} />

                </div>
                <p className="rtl">
                    סכום: ₪{order.totalPrice}
                </p>
                <div className="rtl bold">
                   משלוחים לרחובות והסביבה, לכל הארץ בתיאום מראש,
                    ,משלוח מסכום של 300 ש"ח חינם
                    ,דמי משלוח בפחות מ-300 ש"ח יהיו בסך 45 ש"ח
                    ,החזרת מוצר וביטול עיסקה עד חודש עם הגעה למקום פיזית עם המוצר
                </div>
                <button onClick={buyCart}>   הזמן עכשיו </button>
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
    saveUser,
    setUser,
}

export const Cart = connect(mapStateProps, mapDispatchToProps)(_Cart)
