import React from 'react'
import './UserAccount.scss'
export default function UserAccount({ user }) {
    console.log('udser:', user);
    return (
        <div>

            <form action="" className="flex column">

                <div className="fname">
                    first name:
                     <input type="text" name="" id="" value={user.fname} />
                </div>
                <div className="lname">
                    last name:
                     <input type="text" name="" id="" value={user.lname} />
                </div>
                <div className="email-sends">
                    email sends:
                 <input type="checkbox" value={user.emailSends} />
                </div>

            </form>


        </div>
    )
}
