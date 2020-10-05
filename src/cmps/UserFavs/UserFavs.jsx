import React from 'react'
import { List } from '../../cmps/List/List'

import './UserFavs.scss'
export default function UserFavs(props) {

    const { user, toggleLike } = props
    return (
        <div>

            <List items={user.favs} toggleLike={toggleLike}  ></List>

        </div>
    )
}
