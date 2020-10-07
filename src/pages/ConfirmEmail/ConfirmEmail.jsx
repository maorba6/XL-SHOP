import React from 'react'
import { useEffect } from 'react'
import userService from '../../services/userService'
import './ConfirmEmail.scss'

export function ConfirmEmail(props) {


    useEffect(() => {

        (async () => {
            const { token } = props.match.params
            userService.confirmEmail(token)
        })()

    }, [])





    return (
        <div>
            <h1>your email confirmed, you can now login </h1>
        </div>
    )
}
