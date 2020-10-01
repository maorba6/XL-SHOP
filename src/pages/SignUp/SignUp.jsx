import React, { Component, createRef } from 'react'
import userService from '../../services/userService'
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions'
import hidePassword from '../../assets/img/hide-password.png'
import showPassword from '../../assets/img/show-password.png'
import './SignUp.scss'


class _SignUp extends Component {

  state = {
    user: {
      password: '',
      email: '',
      fname: '',
      lname: '',
      emailSends: false
    },
    elIsAgreeTerms: false,
    inputType: 'password',
    togglePassword: showPassword

  }



  toggleShowPassword = () => {
    if (this.state.inputType === 'password') {
      this.setState({ inputType: 'text', togglePassword: hidePassword })
    }
    else {
      this.setState({ inputType: 'password', togglePassword: showPassword })
    }
  }

  signup = async (ev) => {
    ev.preventDefault()
    console.log('terms', this.state.elIsAgreeTerms, 'mail', this.state.user.emailSends);

    //add validation to email check if exist
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
    await userService.signup(this.state.user)
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
            <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="text" />
          </div>
          <div>
            <label>Password</label>
            <input className="signup-form-group" name="password" value={user.password} onChange={this.handleChange} type={inputType} />
          </div>
          <img className="img-togglePassword" onClick={this.toggleShowPassword} src={togglePassword} />

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