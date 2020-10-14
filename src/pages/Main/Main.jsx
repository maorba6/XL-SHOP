import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem, setFilter } from '../../actions/itemActions'
import { setUser, saveUser } from '../../actions/userActions'
import './Main.scss'

class _Main extends Component {

    state = {
        category: ''
    }

    componentDidMount() {
        const { category } = this.props.match.params
        this.setState({ category })
        this.props.loadItems()
    }

    toggleLike = async (ev, liked, item) => {
        ev.preventDefault()
        if (!this.props.user) return
        if (liked) {
            const index = this.props.user.favs.findIndex(i => i._id === item._id)
            this.props.user.favs.splice(index, 1)
        } else {
            this.props.user.favs.push(item)
        }
        await this.props.saveUser(this.props.user)
        await this.props.setUser()
    }

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }

    setFilter = (ev, filterBy) => {
        if (ev) {
            ev.preventDefault()
        }
        this.props.setFilter(filterBy)
        this.props.loadItems()
    }


    render() {
        let { items, user } = this.props
        const { category } = this.state
        return (
            <main>
                <Filter category={category} setFilter={this.setFilter}></Filter>
                { items && <List items={items} toggleLike={this.toggleLike} removeItem={this.removeItem} ></List>}
                { user && user.isAdmin && < Link className="app-btn" to="/item/edit" replace={true}  >   Add Item</Link>}
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