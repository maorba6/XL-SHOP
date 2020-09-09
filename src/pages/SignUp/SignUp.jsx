import './SignUp.scss'
import React from 'react'

export function SignUp() {
    return (
        <section className="flex signup-section">
        <form className="flex signup-form">
          <h2>Let’s get started</h2>
          <div className="flex">
            <div className="form-halfRow">
              <label>First Name</label>
              <input  type="text" />
            </div>
            <div className="form-halfRow">
              <label>Last Name</label>
              <input  type="text" />
            </div>
          </div>
          <p className="signup-form-caption">Enter your name as it appears on your drivers license</p>
          <div>
            <label>Email</label>
            <input  className="signup-form-group" type="email" />
          </div>
          <div>
            <label>Password</label>
            <input  className="signup-form-group" type="password" />
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
