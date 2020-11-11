import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { loadItems, removeItem } from '../../actions/itemActions'
//imgs
import shirt from '../../assets/samples/shirt-test.jpeg';
//components
import { List } from '../../cmps/List/List'
import { setUser, saveUser } from '../../actions/userActions'
import './Home.scss'
//services
import utilService from '../../services/utilService'
import userService from '../../services/userService';
class _Home extends Component {
    state = {
        types: [
            {
                str: { he: 'חולצות', en: "shirts" },
                img: shirt
            },

            {
                str: { he: 'מכנסיים', en: 'pants' },
                img: shirt
            },
            {
                str: { he: 'ג\'קטים', en: 'jackets' },
                img: shirt
            },
            {
                str: { he: 'אביזרים', en: 'accessories' },
                img: shirt
            },
        ],
        zion: null
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.loadItems()
        this.getZion()
    }


    async getZion() {
        const zion = await userService.getZion()
        this.setState(state => ({ ...state, zion }))

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

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }

    render() {
        const { items, user } = this.props
        const { zion } = this.state
        return (
            <section className="home rtl">
                { zion && <div style={{ backgroundImage: `url(${this.state.zion.mainImg})` }} className="hero-background"></div>}
                {/* {this.state.zion && <img className="hero-background" src={this.state.zion.mainImg} />} */}
                <h2>קטגוריות</h2>
                <div className="types flex">
                    {this.state.types.map((type, idx) => {
                        return <Link key={type.str.en} to={'shop/' + type.str.en} className="browse-type">
                            {zion && <img src={zion.mainCategories[idx]} />}
                            <h3 className="tag">{type.str.he}</h3>
                        </Link>
                    })}
                </div>
                <h3>הפרטים הנמכרים ביותר  </h3>
                { items && <List toggleLike={this.toggleLike} removeItem={this.removeItem} items={items.slice(0 - 4)} ></List>}
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
    removeItem,
    loadItems,
    setUser,
    saveUser
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Home = connect(mapStateProps, mapDispatchToProps)(_Home)