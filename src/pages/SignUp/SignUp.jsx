import React, { Component, createRef } from 'react'
import userService from '../../services/userService'
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions'
import './SignUp.scss'
import InputPassword from '../../cmps/InputPassword/InputPassword';
//services
import utilService from '../../services/utilService';

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
    // const isPasswordValid = this.validatePassword(password)
    // if (!isPasswordValid) {
    //   utilService.swal('center', 2500, 'error', 'סיסמא חלשה מידי')
    //   return
    // }
    if (!email || !fname || !lname) {
      utilService.swal('center', 2500, 'error', 'מלא את כל הפרטים')
      return
    }
    const user = await userService.signup(this.state.user)
    console.log({ user });
    if (!user) {
      utilService.swal('center', 2500, 'error', 'אימייל  קיים')
      return
    }
    utilService.swal('center', 2500, 'success', 'נא כנס למייל שלך לאשר את ההרשמה')
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
    const { user } = this.state
    return (
      <section className=" rtl flex signup-section" >
        <form className="flex signup-form" onSubmit={(ev) => this.signup(ev)}>
          <h2>  הרשמה</h2>
          <div className="flex">
            <div className="form-halfRow">
              <label>שם פרטי</label>
              <input type="text" name="fname" value={user.fname} onChange={this.handleChange} />

            </div>
            <div className="form-halfRow">
              <label>שם משפחה </label>
              <input type="text" name="lname" value={user.lname} onChange={this.handleChange} />
            </div>
          </div>
          <div>
            <label>אימייל</label>
            <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="email" />
          </div>
          <InputPassword handleChange={this.handleChange} user={user} />
          <label>
            <input name="emailSends" value={user.emailSends} onChange={this.handleChange} className="form-checkbox" type="checkbox" /> 
            שלחו לי עדכונים למבצעים למייל
          </label>
          <button className="signup-button">הרשמה</button>
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