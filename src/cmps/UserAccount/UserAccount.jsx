import React, { useState, useEffect } from 'react'
import './UserAccount.scss'
//imgs
import hidePassword from '../../assets/img/hide-password2.png'
import showPassword from '../../assets/img/show-password.png'
import './UserAccount.scss'
export default function UserAccount(props) {

    const [state, setState] = useState({
        editedUser: JSON.parse(JSON.stringify(props.user)),
        inputType: 'password',
        togglePassword: showPassword
    })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))
    }

    function toggleShowPassword() {
        if (state.inputType === 'password') {
            setState(state => ({ ...state, inputType: 'text', togglePassword: hidePassword }))
        }
        else {
            setState(state => ({ ...state, inputType: 'password', togglePassword: showPassword }))
        }
        console.log('end', state);
    }

    useEffect(() => {
        return () => {
            setState(state => ({ ...state, editedUser: { ...state.editedUser, currPass: 'hhh' } }))
            setState(state => ({ ...state, editedUser: { ...state.editedUser, newPass: '' } }))
            setState(state => ({ ...state, editedUser: { ...state.editedUser, newPassConfirm: '' } }))
        }

    }, [])
    return (
        <div>
            <form onSubmit={(ev) => props.saveUser(ev, state.editedUser, 'account')}>
                <div className="change-account flex">
                    <div className="change-email">
                        <div className="email">
                            <label> email:</label>
                            <input className="app-input" type="email" name="email" value={state.editedUser.email} onChange={(ev) => handleChange(ev)} />
                        </div>
                    </div>
                    <div className="change-password">
                        <div className="curr-pass">
                            <label>   current password:</label>
                            <input className="app-input" type={state.inputType} name="currPass" value={state.editedUser.currPass || ''} onChange={(ev) => handleChange(ev)} />
                        </div>
                        <div className="new-pass">
                            <label>  new password:</label>
                            <input className="app-input" type={state.inputType} name="newPass" value={state.editedUser.newPass || ''} onChange={(ev) => handleChange(ev)} />
                        </div>
                        <div className="confirm">
                            <label> confirm new pasword:</label>
                            <input className="app-input" type={state.inputType} name="newPassConfirm" value={state.editedUser.newPassConfirm || ''} onChange={(ev) => handleChange(ev)} />
                        </div>
                        <img className="img-togglePassword" onClick={() => toggleShowPassword()} src={state.togglePassword} />
                    </div>
                </div>
                <button>save password/email</button>
            </form>

        </div>
    )
}
