import './SignUp.scss'
import React from 'react'

export function SignUp() {
    return (
        <section class="flex signup-section">
        <form class="flex signup-form">
          <h2>Let’s get started</h2>
          <div class="flex">
            <div class="form-halfRow">
              <label>First Name</label>
              <input  type="text" />
            </div>
            <div class="form-halfRow">
              <label>Last Name</label>
              <input  type="text" />
            </div>
          </div>
          <p class="signup-form-caption">Enter your name as it appears on your drivers license</p>
          <div>
            <label>Email</label>
            <input  class="signup-form-group" type="email" />
          </div>
          <div>
            <label>Password</label>
            <input  class="signup-form-group" type="password" />
          </div>
          <label>
            <input class="form-checkbox" type="checkbox" /> I agree to the
            <button class="button-link">terms of service</button> and
            <button class="button-link">privacy policy.</button>
          </label>
          <label>
          </label>
            <input class="form-checkbox" type="checkbox" /> Yes, send me deals, discounts and updates!
          <button class="signup-button">Sign Up</button>
        </form>
      </section>
    )
}
