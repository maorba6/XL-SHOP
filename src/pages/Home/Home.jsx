import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { loadItems } from '../../actions/itemActions'
//imgs
import shirt from '../../assets/samples/shirt-test.jpeg';
//components
import { List } from '../../cmps/List/List'
import { setUser, saveUser } from '../../actions/userActions'

import './Home.scss'
class _Home extends Component {
    state = {
        types: [
            {
                str: "Polo-Shirts",
                img: shirt
            },
            {
                str: "T-Shirts",
                img: shirt
            },
            {
                str: "Elegant-Pants",
                img: shirt
            },
            {
                str: "Coats",
                img: shirt
            },
            {
                str: "Belts",
                img: shirt
            },
            {
                str: "Bermuda",
                img: shirt
            },
            {
                str: "Ties",
                img: shirt
            },
            {
                str: "Jeans",
                img: shirt
            },
        ]
    }

    componentDidMount() {
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

    render() {
        const { items } = this.props
        return (
            <section className="home">
                {/* <div className="hero-background"></div> */}
                <div className="types flex">
                    {this.state.types.map(type => {
                        return <Link key={type.str} to={'shop/' + type.str} className="browse-type">
                            <img src={type.img} />
                            <div className="tag">{type.str}</div>
                        </Link>

                    })}
                </div>
                <h3>Top Rated</h3>
                { items && <List toggleLike={this.toggleLike} items={items.slice(items.length - 12)} ></List>}
                <h2>BROWSE BY CATEGORY</h2>
            </section >
        );
    }
}


function mapStateProps(state) {
    return {
        items: state.itemReducer.items,
        user: state.userReducer.user
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItems,
    setUser,
    saveUser
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Home = connect(mapStateProps, mapDispatchToProps)(_Home)