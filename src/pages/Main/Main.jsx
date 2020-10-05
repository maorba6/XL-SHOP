import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem, setFilter } from '../../actions/itemActions'
import { setUser, saveUser } from '../../actions/userActions'
import './Main.scss'

class _Main extends Component {

    componentDidMount() {
        const { type } = this.props.match.params
        let filterBy = null
        if (type) {
            filterBy = {
                type,
                category: '',
                name: ''
            }
        }
        this.setFilter(filterBy)
        this.props.loadItems()
        // this.props.setUser()
    }
    toggleLike = async (ev, liked, item) => {
        ev.preventDefault()
        if (liked) {
            const index = this.props.user.favs.findIndex(i => i._id === item._id)
            this.props.user.favs.splice(index, 1)
            console.log(this.props.user.favs);
        } else {
            this.props.user.favs.push(item)
        }
        await this.props.saveUser(this.props.user)
        await this.props.setUser()
    }

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }

    setFilter = (filterBy) => {
        this.props.setFilter(filterBy)
        this.props.loadItems()
    }

    componentDidUpdate() {
    }

    render() {
        let { items, user } = this.props
        return (
            <main>
                { user && user.isAdmin && < Link className="btn" to="/item/edit" replace={true}  >   Add Item</Link>}
                <Filter setFilter={this.setFilter}></Filter>
                { items && <List items={items} toggleLike={this.toggleLike} removeItem={this.removeItem} ></List>}
            </main>
        )
    }
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