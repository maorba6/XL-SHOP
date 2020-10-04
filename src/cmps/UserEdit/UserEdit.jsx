import React, { useState, useEffect } from 'react'
import './UserEdit.scss'
export default function UserEdit(props) {

    const [state, setState] = useState({ editedUser: JSON.parse(JSON.stringify(props.user)) })
    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))
    }

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <div>
            <form className="flex column" onSubmit={(ev) => props.saveUser(ev, state.editedUser,'details')}>
                <div className="fname">
                    first name:
                     <input className="app-input" type="text" name="fname" value={state.editedUser.fname} onChange={(ev) => handleChange(ev)} />
                </div>
                <div className="lname">
                    last name:
                     <input className="app-input" type="text" name="lname" value={state.editedUser.lname} onChange={(ev) => handleChange(ev)} />
                </div>
                <button >save </button>
            </form>


        </div>
    )

}
