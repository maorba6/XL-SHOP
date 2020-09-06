import React, { Component } from 'react';
import { connect } from 'react-redux'

import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem } from '../../actions/itemActions'

import './Main.scss'

class _Main extends Component {

    componentDidMount() {
        this.props.loadItems()
    }

    removeItem = async (id) => {
        console.log(id);

        await this.props.removeItem(id)
    }


    render() {
        const { items } = this.props
        return (
            <main >
                <Filter></Filter>
                {items && <List items={items} removeItem={this.removeItem} ></List>}
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
    removeItem,

}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)