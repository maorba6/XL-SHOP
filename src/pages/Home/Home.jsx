import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { loadItems } from '../../actions/itemActions'
//imgs
import img1 from '../../assets/1.jpeg';
import pants from '../../assets/samples/pants-test.jpeg';
import shirt from '../../assets/samples/shirt-test.jpeg';
import shoes from '../../assets/shoes.jpeg';
//
import { Preview } from '../../cmps/Preview/Preview'
import { List } from '../../cmps/List/List'
import './Home.scss'
class _Home extends Component {
    state = {
        types: [
            {
                str: "shirts",
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
        this.props.loadItems()
    }
    render() {
        const { items } = this.props
        console.log(items);
        return (
            <section className="home">
                <div className="hero-background">
                    {/* <h1>Welcome User</h1> */}
                </div>
                <div>
                    {/* banner maybe 5% discount for buy in website somethin like that */}
                </div>
                <div className="types flex">
                    {this.state.types.map(type => {return <div>
                        
                        <Link key={type.str} to={type.str} className="browse-type"> <img src={type.img} /> <div className="tag">{type.str}</div></Link>
                    </div> })}
                </div>
                <h3>Top Rated</h3>
                {items&&<List items={items.slice( items.length-3)} ></List>}
                <h2>BROWSE BY CATEGORY</h2>
                {/* MAKE IT WORK BY CATEGORY */}
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