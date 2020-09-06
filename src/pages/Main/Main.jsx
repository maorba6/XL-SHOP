import React, { Component } from 'react';
import { connect } from 'react-redux'

import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems } from '../../actions/itemActions'

import './Main.scss'

class _Main extends Component {

    componentDidMount() {
        this.props.loadItems()
    }
    render() {
        const { items } = this.props

        return (
            <main >
                <Filter></Filter>
                {items && <List items={items} ></List>}
            </main>
        )
    }

}


function mapStateProps(state) {
    return {
        items: state.itemReducer.items,
        // filterBy: state.contactReducer.filterBy,
        // user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    loadItems,
    // setFilter, 
    // removeItem,

}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)