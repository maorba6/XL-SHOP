import React from 'react'
import { useEffect } from 'react'
import userService from '../../services/userService'
import { useHistory } from 'react-router-dom'
import './ConfirmEmail.scss'

export function ConfirmEmail(props) {

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const { token, type } = props.match.params
            console.log({ token, type });
            if (type === 'forgot') {
                history.push(`/forgotPassword/${token}`)
            } else {
                const id = await userService.confirmEmail(token, type)
                console.log({ id });
                history.push('/login')
            }
        })()

    }, [])





    return (
        <div>
            <h1>your email confirmed, you can now login </h1>
        </div>
    )
}
