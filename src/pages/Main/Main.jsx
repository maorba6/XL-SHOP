import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem, setFilter } from '../../actions/itemActions'
import { setUser, saveUser } from '../../actions/userActions'
import './Main.scss'
//services
import utilService from '../../services/utilService'
function _Main(props) {

    const [state, setState] = useState({ category: '' })

    useEffect(() => {
        const { category } = props.match.params
        console.log({ category });
        setState({ category })
        return () => {
            props.setFilter(null)
        }
    }, [props.match.params])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    async function toggleLike(ev, liked, item) {
        ev.preventDefault()
        if (!props.user) {
            utilService.swal('center', 2500, 'error', 'נא להתחבר ')
            return
        }
        if (liked) {
            const index = props.user.favs.findIndex(i => i._id === item._id)
            props.user.favs.splice(index, 1)
        } else {
            props.user.favs.push(item)
        }
        await props.saveUser(props.user)
        await props.setUser()
    }

    async function removeItem(id) {
        await props.removeItem(id)
    }

    function setFilter(ev, filterBy) {
        if (ev) {
            ev.preventDefault()
        }
        props.setFilter(filterBy)
        props.loadItems()
    }


    let { items, user } = props
    const { category } = state
    return (
        <main>
            <Filter category={category} setFilter={setFilter}></Filter>
            { user && user.isAdmin && < Link className="app-btn" to="/item/edit" replace={true}  >  הוסף מוצר</Link>}
            { items && <List items={items} toggleLike={toggleLike} removeItem={removeItem} ></List>}
        </main>

    )
}


function mapStateProps(state) {

    return {
        items: state.itemReducer.items,
        filterBy: state.itemReducer.filterBy,
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    loadItems,
    setFilter,
    removeItem,
    setUser,
    saveUser
}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)