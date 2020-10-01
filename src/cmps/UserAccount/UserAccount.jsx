import React, { useState, useEffect } from 'react'

import './UserAccount.scss'
export default function UserAccount(props) {

    const [state, setState] = useState({ editedUser: JSON.parse(JSON.stringify(props.user)) })
    function handleChange({ target }) {
        const field = target.name
        if (field === 'emailSends') {
            setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: target.checked } }))
        } else {
            const value = target.type === 'number' ? +target.value : target.value
            setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))
        }
    }


    useEffect(() => {
        //temporary solution, need to find how set checlbox to true in chrome himself
        setState(state => ({ ...state, editedUser: { ...state.editedUser, 'emailSends': false } }))
        return () => {
        }
    }, [])



    return (
        <div>
            <form className="flex column" onSubmit={(ev) => props.saveUser(ev, state.editedUser)}>
                <div className="fname">
                    first name:
                     <input type="text" name="fname" value={state.editedUser.fname} onChange={(ev) => handleChange(ev)} />
                </div>
                <div className="lname">
                    last name:
                     <input type="text" name="lname" value={state.editedUser.lname} onChange={(ev) => handleChange(ev)} />
                </div>
                <div className="email-sends">
                    email sends:
                 <input type="checkbox" name="emailSends" value={state.editedUser.emailSends} onChange={(ev) => handleChange(ev)} />
                </div>
                <button >save </button>
            </form>


        </div>
    )
}
