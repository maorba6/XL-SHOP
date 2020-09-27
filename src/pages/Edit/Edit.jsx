import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem } from '../../actions/itemActions'
import MultiOptions from '../../cmps/MultiOptions/MultiOptions'
import UploadImg from '../../cmps/UploadImg/UploadImg'
import './Edit.scss'

class _Edit extends Component {

    state = {
        item: null,
        isClrsSaved: false,
        isSizesSaved: false
    }

    async componentDidMount() {
        if (!this.props.user) {
            console.log('here', this.props.user);
            this.props.history.push('/shop')
            return
        }
        const user = JSON.parse(this.props.user)
        if (!user.isAdmin) {
            this.props.history.push('/shop')
        }
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

    componentDidUpdate() {
        const user = JSON.parse(this.props.user)
        if (!user.isAdmin) {
            this.props.history.push('/')
        }
    }
    saveItem = async (ev) => {
        ev.preventDefault()
        this.props.saveItem(this.state.item)
        this.props.loadItems()
        this.props.history.push('/shop')
    }


    saveColors = (ev, colors) => {
        ev.preventDefault()
        this.setState({ isClrsSaved: true })
        colors = colors.map(color => color.label)
        this.setState(({ item }) => ({ item: { ...item, colors } }))

    }

    saveSizes = (ev, sizes) => {
        ev.preventDefault()
        this.setState({ isSizesSaved: true })
        sizes = sizes.map(size => size.label)
        this.setState(({ item }) => ({ item: { ...item, sizes } }))
    }

    restartSavedClrs = () => {
        this.setState({ isClrsSaved: false })
    }

    restartSavedSizes = () => {
        this.setState({ isSizesSaved: false })
    }

    render() {
        const { item, isSizesSaved, isClrsSaved } = this.state
        let options = null
        if (item) {
            options = item.colors.map(color => {
                return { label: color, value: color }
            })
        } else return <div>Loading...</div>

        return (
            <form className="edit flex" onSubmit={this.saveItem} >
                <img src={item.imgUrl} />
                <div className="details">
                    <div className="type">
                        <span >Type: </span>
                        <select name="type" value={item.type} onChange={this.handleChange} >
                            <option value="shirt">Shirt</option>
                            <option value="pants">Pants</option>
                            <option value="shoes">Shoes</option>
                        </select>
                    </div>

                    <div className="category">
                        <span >category: </span>
                        <select name="category" value={item.category} onChange={this.handleChange} >
                            <option value="sport">Sport</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>
                    <div className="brand">
                        <span >brand: </span>
                        <input type="text" name="brand" value={item.brand} onChange={this.handleChange} />
                    </div>

                    <MultiOptions
                        clickedClrs={this.restartSavedClrs}
                        clickedSizes={this.restartSavedSizes}
                        isClrsSaved={isClrsSaved}
                        isSizesSaved={isSizesSaved}
                        saveColors={this.saveColors}
                        saveSizes={this.saveSizes}
                        item={item}
                    />

                    <div className="price">
                        <span >price: </span>
                        <input type="text" name="price" value={item.price} onChange={this.handleChange} />
                    </div>
                    <button>save item</button>
                </div>
                <UploadImg></UploadImg>
            </form>
        )
    }
}



function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem,
        user: state.userReducer.user,

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