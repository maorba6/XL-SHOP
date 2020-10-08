import React from 'react'
import { useState } from 'react'

export function ForgotPassword() {

    const [email, setEmail] = useState('')

    function handleChange({ target }) {
        const { value } = target
        console.log(value);
        setEmail(value)
    }



    return (
        <div>
            <label >email:</label>
            <input className="app-input" type="email" name="email" value={email} onChange={handleChange} />

        </div>
    )
}
