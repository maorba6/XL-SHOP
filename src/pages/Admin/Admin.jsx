import React, { useState, useEffect } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'

import userService from '../../services/userService'
import './Admin.scss'
export function _Admin(props) {

    const [msg, setMsg] = useState({ text: '', title: '' })

    useEffect(() => {
        if (!props.user || !props.user.isAdmin) {
            props.history.push('/')
        }
    }, [props.user])


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setMsg(msg => ({ ...msg, [field]: value }))
    }



    function sendMails() {
        userService.sendMails(msg) // maor add msg to user that mail send
        setMsg({ text: '', title: '' })
    }

    return (
        <div>
            <h1> this is admin page</h1>
            <div className="msg flex column">
                <input type="text" name="title" value={msg.title} onChange={handleChange} />
                <textarea value={msg.text} name="text" cols="30" rows="10" onChange={handleChange} ></textarea>
            </div>
            <button onClick={() => sendMails()}>send mails</button>
            <h3>you can't write numvers or the mail will sent wrong</h3>
        </div>
    )
}


function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    saveUser,
    setUser,
}

export const Admin = connect(mapStateProps, mapDispatchToProps)(_Admin)
