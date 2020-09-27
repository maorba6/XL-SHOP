import React, { Component } from 'react';
import userService from '../../services/userService'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions'
import hidePassword from '../../assets/img/hide-password.png'
import showPassword from '../../assets/img/show-password.png'

import './Login.scss'
class _Login extends Component {

    state = {
        user: {
            password: '',
            email: ''
        },
        inputType: 'password',
        togglePassword: showPassword
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ user }) => ({ user: { ...user, [field]: value } }))
    }

    login = async (ev) => {
        ev.preventDefault()
        const user = await userService.login(this.state.user)
        if (user) {
            this.props.history.push('/')
            this.props.setUser()
        }
        else console.log('email or password wrong');
    }

    toggleShowPassword = () => {
        if (this.state.inputType === 'password') {
            this.setState({ inputType: 'text', togglePassword: hidePassword })
        }
        else {
            this.setState({ inputType: 'password', togglePassword: showPassword })
        }
    }
    render() {
        const { user, inputType, togglePassword } = this.state
        return (
            <section className="flex signup-section">
                <form className="flex signup-form" onSubmit={(ev) => this.login(ev)}>
                    <div className="name">
                        <label>Email</label>
                        <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="text" />
                    </div>
                    <div className="password">
                        <label>Password</label>
                        <input className="signup-form-group" name="password" value={user.password} onChange={this.handleChange} type={inputType} />

                        <img className="img-togglePassword" onClick={this.toggleShowPassword} src={togglePassword} />
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



function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    setUser
}
export const Login = connect(mapStateProps, mapDispatchToProps)(_Login)