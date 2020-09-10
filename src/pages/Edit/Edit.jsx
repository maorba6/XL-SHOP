import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem } from '../../actions/itemActions'

import './Edit.scss'

class _Edit extends Component {

    state = {
        item: null
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.loadItem(id)
        await this.props.loadItems()
        this.setState({ item: this.props.item })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ item }) => ({ item: { ...item, [field]: value } }))
    }

    saveItem = async (ev) => {
        ev.preventDefault()
        this.props.saveItem(this.state.item)
        this.props.history.push('/shop')

    }
    render() {
        const { item } = this.state
        if (!item) return <div>Loading...</div>
        return (
            <form className="edit flex" onSubmit={this.saveItem} >
                <img src={item.imgUrl} />
                <div className="details">
                    <div className="type">
                        <span >category:</span>
                        <select name="type" value={item.type} onChange={this.handleChange} >
                            <option value="shirt">shirt</option>
                            <option value="pants">pants</option>
                            <option value="shoes">shoes</option>
                        </select>
                    </div>
                    <div className="price">
                        <span >price:</span>
                        <input type="text" name="price" value={item.price} onChange={this.handleChange} />
                    </div>
                    <div className="category">
                        <span >category:</span>
                        <select name="category" value={item.category} onChange={this.handleChange} >
                            <option value="sport">sport</option>
                            <option value="casual">casual</option>
                        </select>
                    </div>
                    <div className="brand">
                        <span >brand:</span>
                        <input type="text" name="brand" value={item.brand} onChange={this.handleChange} />
                    </div>
                    <div className="colors">
                        <span>colors:</span>
                        {item.colors.map(color => {
                            return <div key={color}> <input type="text" value={color} onChange={this.handleChange} /></div>
                        })}
                    </div>
                    <div className="sizes">
                        <span>sizes:</span>

                    </div>
                    <button>save item</button>
                </div>
            </form>
        )
    }
}



function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItem,
    loadItems,
    saveItem
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Edit = connect(mapStateProps, mapDispatchToProps)(_Edit)