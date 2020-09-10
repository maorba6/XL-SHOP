import React, { Component } from 'react'
import userService from '../../services/userService'
import './SignUp.scss'

export class SignUp extends Component {


  state = {
    user: {
      password: '',
      email: '',
      fname: '',
      lname: ''
    },

  }

  signup = (ev) => {
    ev.preventDefault()
    userService.signup(this.state.user)
    this.props.history.push('/')
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState(({ user }) => ({ user: { ...user, [field]: value } }))
  }

  render() {
    const { user } = this.state
    return (
      <section className="flex signup-section" >
        <form className="flex signup-form" onSubmit={(ev) => this.signup(ev)}>
          <h2>Let’s get started</h2>
          <div className="flex">
            <div className="form-halfRow">
              <label>First Name</label>
              <input type="text" name="fname" value={user.fname} onChange={this.handleChange} />

            </div>
            <div className="form-halfRow">
              <label>Last Name</label>
              <input type="text" name="lname" value={user.lname} onChange={this.handleChange} />
            </div>
          </div>
          <p className="signup-form-caption">Enter your name as it appears on your drivers license</p>
          <div>
            <label>Email</label>
            <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="text" />
          </div>
          <div>
            <label>Password</label>
            <input className="signup-form-group" name="password" value={user.password} onChange={this.handleChange} type="text" />
          </div>
          <label>
            <input className="form-checkbox" type="checkbox" /> I agree to the
            <button className="button-link">terms of service</button> and
            <button className="button-link">privacy policy.</button>
          </label>
          <label>
          </label>
          <input className="form-checkbox" type="checkbox" /> Yes, send me deals, discounts and updates!
          <button className="signup-button">Sign Up</button>
        </form>
      </section>
    )
  }
}
