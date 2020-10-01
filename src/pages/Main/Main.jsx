import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem, setFilter } from '../../actions/itemActions'
import { setUser } from '../../actions/userActions'
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
        this.props.setUser()
    }

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }

    setFilter = (filterBy) => {
        console.log(filterBy);
        this.props.setFilter(filterBy)
        this.props.loadItems()
    }

    render() {
        let { items, user } = this.props
        user = JSON.parse(user)
        return (
            <main >
                { user && user.isAdmin && < Link className="btn" to="/item/edit" replace={true}  >   Add Item</Link>}
                <Filter setFilter={this.setFilter}></Filter>
                { items && <List items={items} removeItem={this.removeItem} ></List>}
            </main >
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
    setUser

}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)