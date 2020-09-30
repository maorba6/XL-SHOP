import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem } from '../../actions/itemActions'
import ImgCarousel from '../../cmps/ImgCarousel/ImgCarousel'
import './Details.scss'

class _Details extends Component {

    state = {
        item: null,
        itemToBuy: null,
        chosenSize: null,
        chosenColor: null
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.loadItem(id)
        // await this.props.loadItems()
        this.setState({ item: this.props.item })
        this.setState({ itemToBuy: this.props.item })
    }

    componentDidUpdate() {
    }


    setColor(color) {
        this.setState(({ itemToBuy }) => ({ itemToBuy: { ...itemToBuy, color } }))
        this.setState({ chosenColor: color })
    }


    setSize(size) {
        this.setState(({ itemToBuy }) => ({ itemToBuy: { ...itemToBuy, size } }))
        this.setState({ chosenSize: size })


    }
    addToCart() {
        const itemToCart = this.state.itemToBuy
        delete itemToCart.colors
        delete itemToCart.sizes
        //need to call addtocard from action etc...
    }


    render() {
        const { item, chosenSize, chosenColor } = this.state
        const user = JSON.parse(this.props.user)
        if (!item) return <div>Loading...</div>
        return (
            <section className="item-details flex ">
                {/* {item.imgUrls.map(imgUrl => <img className="details-img" src={imgUrl} key={imgUrl} />)} */}
                <ImgCarousel imgs={item.imgUrls}></ImgCarousel>
                <div className="details">
                    <h1 className="details-item-name">
                        {item.name}
                    </h1>
                    <div className="detail price"> ${item.price} </div>
                    <div className="detail">  {item.brand}</div>
                    <div className="category">
                        <span>  {item.category}</span>
                    </div>
                    <div className="size ">
                        <div className=" detail pick">pick size</div>
                        {item.sizes.map(size => {
                            return <button onClick={() => this.setSize(size)} key={size} className={"option option-size " + (size === chosenSize)}>{size}</button>
                        })}
                    </div>
                    <div className="color ">
                        <div className="detail pick">pick color</div>
                        {item.colors.map(color => {
                            return <button onClick={() => this.setColor(color)} key={color} className={'option option-' + color + (color === chosenColor)}>{color}</button>
                        })}
                    </div>
                    <button onClick={() => this.addToCart()} className="signin-button">Add To Cart</button>
                    {user && user.isAdmin && <Link to={`/item/edit/${item._id}`} >Edit </Link>}
                </div>
            </section>
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
    saveItem,

}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Details = connect(mapStateProps, mapDispatchToProps)(_Details)