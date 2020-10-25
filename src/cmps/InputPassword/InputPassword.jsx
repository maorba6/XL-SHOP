import React, { useState } from 'react'
import './InputPassword.scss'
//imgs
import hidePassword from '../../assets/img/hide-password2.png'
import showPassword from '../../assets/img/show-password.png'
import { ReactComponent as InfoSvg } from '../../assets/img/info.svg';

export default function InputPassword(props) {

    const [state, setState] = useState({
        inputType: 'password',
        togglePassword: showPassword,
        showTerms: false
    })

    function toggleShowPassword() {
        if (state.inputType === 'password') {
            setState({ inputType: 'text', togglePassword: hidePassword, showTerms: state.showTerms })
        }
        else {
            setState({ inputType: 'password', togglePassword: showPassword, showTerms: state.showTerms })
        }
    }

    function toggleShowPassTerms(ev) {
        ev.preventDefault()
        setState({ showTerms: !state.showTerms, inputType: state.inputType, togglePassword: state.togglePassword })
        console.log({ state });
    }


    return (
        <div className="password">
            {state.showTerms && <p className="pass-terms">
                הסיסמא חייבת להכיל לפחות 8 תווים, מספרים, אות אחת קטנה ואות גדולה באנגלית.
                </p>}
            <label className="label-password">     סיסמא  <InfoSvg title="info" className="svg" onClick={(ev) => toggleShowPassTerms(ev)}>     </InfoSvg> </label>
            <div className="password-container flex">
                <input className="input-password" name="password" value={props.user.password} onChange={(ev) => props.handleChange(ev)} type={state.inputType} />
                <img className="img-togglePassword" onClick={() => toggleShowPassword()} src={state.togglePassword} />
            </div>
        </div>
    )
}
