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
//services
import utilService from '../../services/utilService'
class _Home extends Component {
    state = {
        types: [

            {
                str: { he: 'טי שירט', en: "T-Shirts" },
                img: shirt
            },

            {
                str: { he: 'מעילים', en: 'Coats' },
                img: shirt
            },
            {
                str: { he: 'עניבות', en: 'Ties' },
                img: shirt
            },
            {
                str: { he: 'גינסים', en: 'Jeans' },
                img: shirt
            },
        ]
    }

    componentDidMount() {

        this.props.loadItems()
    }


    toggleLike = async (ev, liked, item) => {
        ev.preventDefault()
        if (!this.props.user) {
            utilService.swal('center', 2500, 'error', 'נא להתחבר ')
            return
        }
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
        console.log({ items });
        return (
            <section className="home rtl">
                <div className="hero-background"></div>
                <h2>קטגוריות</h2>
                <div className="types flex">
                    {this.state.types.map(type => {
                        return <Link key={type.str.en} to={'shop/' + type.str.en} className="browse-type">
                            <img src={type.img} />
                            <h3 className="tag">{type.str.he}</h3>
                        </Link>
                    })}
                </div>
                <h3>הפרטים הנמכרים ביותר  </h3>
                { items && <List toggleLike={this.toggleLike} items={items.slice(items.length - 8)} ></List>}
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