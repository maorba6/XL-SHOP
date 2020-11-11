import React, { Component } from 'react';
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem } from '../../actions/itemActions'
import MultiOptions from '../../cmps/MultiOptions/MultiOptions'
import UploadImg from '../../cmps/UploadImg/UploadImg'
import Swal from 'sweetalert2'

import './Edit.scss'

class _Edit extends Component {

    state = {
        item: null,
        isClrsSaved: false,
        isSizesSaved: false,
        shirts: ['Polo-Shirts', 'T-Shirts', 'Button-Down-Shirts', 'Sweaters',],
        pants: ['Elegant-Pants', 'Jeans', 'Cotton-Pants', 'Dagmach-Pants', 'Potter-Pants', 'Tricot-Pants', 'Bermudas'],
        accessories: ['Socks', 'Belts', 'Underpants', 'Nose-Handkerchiefs', 'Ties', 'Shlikes'],
        jackets: ['Coats', 'Sweatshirt', 'Cardigans', 'Jackets', 'Suits', 'Hoddies']
    }

    async componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/shop')
            return
        }
        const user = this.props.user
        if (!user.isAdmin) {
            this.props.history.push('/shop')
        }
        const { id } = this.props.match.params
        await this.props.loadItem(id)
        await this.props.loadItems()
        this.setState({ item: this.props.item, imgUrls: this.props.item.imgUrls })
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ item }) => ({ item: { ...item, [field]: value } }))
    }

    componentDidUpdate() {
        const user = this.props.user
        if (!user.isAdmin) {
            this.props.history.push('/')
        }
    }
    saveItem = async (ev) => {
        ev.preventDefault()
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: ' בגד נשמר'
        })
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

    onUploadImg = (imgUrl) => {
        let { imgUrls } = this.state.item
        imgUrls.push(imgUrl)
        this.setState(({ item }) => ({ item: { ...item, imgUrls } }))

    }

    removeImg = (ev, imgUrl) => {
        ev.preventDefault()
        let imgUrls = this.state.item.imgUrls
        const idx = imgUrls.findIndex(currImg => imgUrl === currImg)
        imgUrls.splice(idx, 1)
        this.setState(({ item }) => ({ item: { ...item, imgUrls } }))
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
            <form className="edit flex rtl" onSubmit={this.saveItem} >
                <div className="details">
                    <div className="name">
                        <span> שם:</span>
                        <input className="app-input" type="text" name="name" value={item.name} onChange={this.handleChange} />
                    </div>
                    <div className="subCategory">
                        <span >קטגוריה: </span>
                        <select className="app-input" name="category" value={item.category} onChange={this.handleChange} >
                            <option value="shirts">חולצות</option>
                            <option value="pants">מכנסיים</option>
                            <option value="accessories">אביזרים</option>
                            <option value="jackets">ג'קטים</option>
                        </select>
                    </div>
                    <div className="subCategory">
                        <span >תת קטגוריה: </span>
                        <select className="app-input" name="subcategory" value={item.subcategory} onChange={this.handleChange} >
                            {this.state[item.category].map(sub => {
                                return <option key={sub} value={sub}>{sub}</option>
                            })}
                        </select>
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
                        <span >מחיר: </span>
                        <input className="app-input" type="number" name="price" value={item.price} onChange={this.handleChange} />
                    </div>
                    <UploadImg uploadImg={this.onUploadImg} ></UploadImg>

                    <div className="flex wrap">
                        {item.imgUrls.map(imgUrl => {
                            return <div key={imgUrl}>
                                <img src={imgUrl} />
                                <button onClick={(ev) => this.removeImg(ev, imgUrl)}>X</button>
                            </div>
                        })}
                    </div>
                    <button className="app-btn">שמור פריט</button>
                </div>

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