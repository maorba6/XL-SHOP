import React from 'react'
import { List } from '../../cmps/List/List'
import { useHistory } from 'react-router-dom'
import { removeItem } from '../../actions/itemActions'
import { connect } from 'react-redux'

import './UserFavs.scss'
function _UserFavs(props) {

    const { user, toggleLike } = props
    const history = useHistory();

    function goShop() {
        history.push('/shop')
    }

    async function removeItem(id) {
        console.log(id);
        await props.removeItem(id)
    }

    return (
        <section className="user-favs">
            {!user.favs.length && <div className="no-favs">
                <h1> רשימת המועדפים שלך ריקה</h1>
                {/* <h3>when you press like on item he will be saved here </h3> */}
                <button className="app-btn" onClick={() => goShop()}>לחנות</button>
            </div>}
            <List items={user.favs} toggleLike={toggleLike} removeItem={removeItem}  ></List>

        </section>
    )
}




function mapStateProps(state) {

    return {
    }
}
const mapDispatchToProps = {
    removeItem,
}
export const UserFavs = connect(mapStateProps, mapDispatchToProps)(_UserFavs)
