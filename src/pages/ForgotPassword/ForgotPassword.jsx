import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import userService from '../../services/userService'

export function _ForgotPassword(props) {

    const [state, setState] = useState(
        {
            email: '',
            user: {
                id: null,
                newPass: '',
                confirmNewPass: ''
            }
        })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'email') {
            setState(state => ({ ...state, email: value }))
        } else {
            setState(({ user }) => ({ user: { ...user, [field]: value } }))
        }
    }

    function forgotPassword() {
        userService.forgotPassword(state.email)
    }


    function savePassword(ev) {
        ev.preventDefault()
        console.log(state.user);
        userService.savePassword(state.user)
    }


    useEffect(() => {
        const { id } = props.match.params
        if (typeof (id) === 'string') {
            setState(({ user }) => ({ user: { ...user, id } }))

        }

    }, [])


    return (
        <div>
            {state.user.id &&
                <form >
                    <div className="new-pass">
                        <label >new password</label>
                        <input className="app-input" type="text" name="newPass" value={state.user.newPass} onChange={handleChange} />

                    </div>
                    <div className="confirm-new-pass">
                        <label >confirm new password</label>
                        <input className="app-input" type="text" name="confirmNewPass" value={state.user.confirmNewPass} onChange={handleChange} />

                    </div>
                    <button onClick={(ev) => savePassword(ev)}>save password</button>
                </form>}
            {!state.user.id &&
                <div>
                    <label >email:</label>
                    <input className="app-input" type="email" name="email" value={state.email} onChange={handleChange} />
                    <button onClick={() => forgotPassword()}>send password to email</button>
                </div>
            }
        </div>
    )
}



function mapStateProps(state) {
    return {

    }
}
const mapDispatchToProps = {

}
export const ForgotPassword = connect(mapStateProps, mapDispatchToProps)(_ForgotPassword)
