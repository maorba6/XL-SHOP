import React, { Component, createRef } from 'react'
import userService from '../../services/userService'
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions'
import './SignUp.scss'
import InputPassword from '../../cmps/InputPassword/InputPassword';


class _SignUp extends Component {

  state = {
    user: {
      password: '',
      email: '',
      fname: '',
      lname: '',
      emailSends: false,
    },
    elIsAgreeTerms: false,
  }


  signup = async (ev) => {
    ev.preventDefault()
    const { password, email, fname, lname } = this.state.user
    const isPasswordValid = this.validatePassword(password)
    if (!isPasswordValid) {
      console.log('password is too weak'); // add msg in website
      return
    }
    if (!email || !fname || !lname || !this.state.elIsAgreeTerms) {
      console.log('fill all and agree to terms');
      return
    }
    const user = await userService.signup(this.state.user)
    console.log({ user });
    if (!user) {
      console.log('mail alreadt exist');
      return
      //maor add here msg that email exist
    }
    this.props.setUser()
    this.props.history.push('/')

  }

  handleChange = ({ target }) => {
    const field = target.name
    if (field === "elIsAgreeTerms") {
      this.setState({ [field]: target.checked })
    } else if (field === "emailSends") {
      this.setState(({ user }) => ({ user: { ...user, [field]: target.checked } }))
    } else {
      const value = target.type === 'number' ? +target.value : target.value
      this.setState(({ user }) => ({ user: { ...user, [field]: value } }))
    }
  }

  validatePassword(password) {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    return strongRegex.test(password)
  }



  render() {
    const { user, elIsAgreeTerms, inputType, togglePassword } = this.state
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
            <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="email" />
          </div>
          <InputPassword handleChange={this.handleChange} user={user} />


          <label>
            <input name="elIsAgreeTerms" value={elIsAgreeTerms} onChange={this.handleChange} className="form-checkbox" type="checkbox" /> I agree to the
            <button className="button-link">terms of service</button> and
            <button className="button-link">privacy policy.</button>
          </label>
          <label>
          </label>
          <input name="emailSends" value={user.emailSends} onChange={this.handleChange} className="form-checkbox" type="checkbox" /> Yes, send me deals, discounts and updates!
          <button className="signup-button">Sign Up</button>
        </form>
      </section>
    )
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
export const SignUp = connect(mapStateProps, mapDispatchToProps)(_SignUp)