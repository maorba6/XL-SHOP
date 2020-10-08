import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem, setSameCategoryItems, removeItem } from '../../actions/itemActions'
import { saveUser } from '../../actions/userActions'
import Swal from 'sweetalert2'

//components
import { List } from '../../cmps/List/List'
import ImgCarousel from '../../cmps/ImgCarousel/ImgCarousel'
import ReactLoading from 'react-loading';
import './Details.scss'

class _Details extends Component {

    state = {
        item: null,
        itemToBuy: null,
        chosenSize: null,
        chosenColor: null,
        sameCategoryItems: [],
        location: this.props.history.location.pathname
    }

    setItem = async () => {
        const { id } = this.props.match.params
        await this.props.loadItem(id)
        this.setState({ item: this.props.item })
        this.setState({ itemToBuy: this.props.item })
        await this.props.setSameCategoryItems(this.state.item.category, this.state.item._id)
        this.setState({ sameCategoryItems: this.props.sameCategoryItems })
    }

    async componentDidMount() {
        console.log('created');
        this.setItem()
        // const unlisten = this.props.history.listen((location, action) => {
        //     console.log('listen');
        //     this.setState({ location: location.pathname }, async () => {
        //         this.setItem()
        //     })
        //     unlisten()
        // });

    }

    componentDidUpdate() {
        // const unlisten = this.props.history.listen((location, action) => {
        //     console.log('listen');
        //     this.setState({ location: location.pathname }, async () => {
        //         this.setItem()
        //     })
        //     unlisten()
        // });
    }
    setColor(color) {
        this.setState(({ itemToBuy }) => ({ itemToBuy: { ...itemToBuy, color } }))
        this.setState({ chosenColor: color })
    }

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }




    setSize(size) {
        this.setState(({ itemToBuy }) => ({ itemToBuy: { ...itemToBuy, size } }))
        this.setState({ chosenSize: size })
    }

    async addToCart() {
        const itemToCart = this.state.itemToBuy
        if (!itemToCart.size || !itemToCart.color){
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: 'Please choose size and color '
            })
            return
        } 
        delete itemToCart.colors
        delete itemToCart.sizes
        this.props.user.cart.push(itemToCart)
        await this.props.saveUser(this.props.user)
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Item added to cart '
        })
    }


    render() {
        const { item, chosenSize, chosenColor, sameCategoryItems } = this.state
        const { user } = this.props
        if (!item) return <ReactLoading type={'cubes'} color={'#C2F970'} height={300} width={450} />
        return (
            <section className="item-details flex column ">
                <div className="flex">
                    <ImgCarousel imgs={item.imgUrls}></ImgCarousel>
                    <div className="details">
                        <h1 className="details-item-name">
                            {item.name}
                        </h1>
                        <div className="detail price"> ${item.price} </div>
                        {/* <div className="detail">  {item.brand}</div> */}
                        <div className="category">
                            <span>  {item.category}</span>
                        </div>
                        <div className="size ">
                            <div className=" detail pick">pick size: {chosenSize}</div>
                            {item.sizes.map(size => {
                                return <button onClick={() => this.setSize(size)} key={size} className={"option option-size " + (size === chosenSize)}>{size}</button>
                            })}
                        </div>
                        <div className="color ">
                            <div className="detail pick">pick color :{chosenColor}</div>
                            {item.colors.map(color => {
                                return <button onClick={() => this.setColor(color)} key={color} className={'option option-' + color + (color === chosenColor)}></button>
                            })}
                        </div>
                        <button onClick={() => this.addToCart()} className="signin-button">Add To Cart</button>
                        {user && user.isAdmin && <Link to={`/item/edit/${item._id}`} >Edit </Link>}
                    </div>
                </div>
                <div>
                    <h2>You might like</h2>
                    <List className="flex" items={sameCategoryItems} removeItem={this.removeItem}  ></List>
                </div>
            </section>
        )
    }
}


_Details.propTypes = {
    user: PropTypes.object
};



function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem,
        user: state.userReducer.user,
        sameCategoryItems: state.itemReducer.sameCategoryItems
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItem,
    loadItems,
    saveItem,
    removeItem,
    setSameCategoryItems,
    saveUser

}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Details = connect(mapStateProps, mapDispatchToProps)(_Details)