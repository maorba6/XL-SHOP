import React, { Component } from 'react';
import userService from '../../services/userService'
import { Link } from "react-router-dom";
import './Login.scss'
export class Login extends Component {

    state = {
        user: {
            password: '',
            email: ''
        }
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ user }) => ({ user: { ...user, [field]: value } }))
    }

    login = async (ev) => {
        ev.preventDefault()
        console.log('login');
        await userService.login(this.state.user)
        this.props.history.push('/')
    }
    render() {
        const { user } = this.state
        return (
            <section className="flex signup-section">
                <form className="flex signup-form" onSubmit={(ev) => this.login(ev)}>
                    <div className="name">
                        <label>Email</label>
                        <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input className="signup-form-group" name="password" value={user.password} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="btns">
                        <button className="signin-button">Login</button>
                    </div>
                    <div className="no-account">
                        <p>Don’t have an account?</p>
                        <Link to="/signup">Sign Up </Link>
                    </div>
                </form>
            </section>
        );
    }
}