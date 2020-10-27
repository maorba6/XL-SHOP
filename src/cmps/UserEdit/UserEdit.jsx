import React, { useState, useEffect } from 'react'
import './UserEdit.scss'
export default function UserEdit(props) {

    const [state, setState] = useState({ editedUser: JSON.parse(JSON.stringify(props.user)) })
    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        console.log({ value }, state.editedUser.emailSends);

        if (field === 'emailSends') {
            if (value === 'true') setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: false } }))
            else setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: true } }))

        } else {
            setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))
        }
    }

    useEffect(() => {
        setState(state => ({ ...state, editedUser: { ...state.editedUser, emailSends: false } }))
        console.log(state.editedUser.emailSends);
        return () => {
        }
    }, [])

    return (
        <div>
            <form className="user-edit flex column" onSubmit={(ev) => props.saveUser(ev, state.editedUser, 'details')}>
                <div className="fname rtl">
                    <label > שם:</label>
                    <input className="app-input" type="text" name="fname" value={state.editedUser.fname} onChange={(ev) => handleChange(ev)} />
                </div>
                <div className="lname rtl">
                    <label > שם משפחה:</label>
                    <input className="app-input" type="text" name="lname" value={state.editedUser.lname} onChange={(ev) => handleChange(ev)} />
                </div>
                <div className="email-sends">
                    <input type="checkbox" name="emailSends" value={state.editedUser.emailSends} onChange={(ev) => handleChange(ev)} />
                    <label >  שלחו לי עדכונים למבצעים למייל </label>
                </div>
                <button className="app-btn" >שמור </button>
            </form>


        </div>
    )

}
