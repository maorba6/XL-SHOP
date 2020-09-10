import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { loadItems } from '../../actions/itemActions'
//imgs
import img1 from '../../assets/1.jpeg';
import pants from '../../assets/pants.jpg';
import shirt from '../../assets/shirt.png';
import shoes from '../../assets/shoes.jpeg';
//
import { Preview } from '../../cmps/Preview/Preview'
import './Home.scss'
class _Home extends Component {
    state = {
        types: [
            {
                str: "shirt",
                img: shirt
            },
            {
                str: "pants",
                img: pants
            },
            {
                str: "shoes",
                img: shoes
            }
        ]
    }

    componentDidMount() {
        console.log(this.props);
        this.props.loadItems()
    }
    render() {
        const { items } = this.props
        return (
            <section className="home">
                <h1>welcome user</h1>
                <img className="front-img" src={img1} />
                <div className="types flex">
                    {this.state.types.map(type => {
                        return <Link key={type.str} to={type.str}> <img src={type.img} />  </Link>
                    })}
                </div>
                <h3>Top Rated</h3>
                <div className="top-items flex">
                    {items && items.slice(2).map(item =>
                        <Preview key={item._id} item={item} />)
                    }
                </div>
            </section>
        );
    }
}


function mapStateProps(state) {
    return {
        items: state.itemReducer.items,
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItems,
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Home = connect(mapStateProps, mapDispatchToProps)(_Home)