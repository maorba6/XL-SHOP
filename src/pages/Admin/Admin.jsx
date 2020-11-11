import React, { useState, useEffect } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import utilService from '../../services/utilService';
import userService from '../../services/userService'
import UploadImg from '../../cmps/UploadImg/UploadImg'

import './Admin.scss'
export function _Admin(props) {

    const [msg, setMsg] = useState({ text: '', title: '' })
    const { user } = props
    useEffect(() => {
        if (!user || !user.isAdmin) {
            props.history.push('/')
        }
    }, [props.user])


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setMsg(msg => ({ ...msg, [field]: value }))
    }



    function onUploadImg(imgUrl) {
        if (user.isAdmin) {
            console.log({ imgUrl });
            user.mainImg = imgUrl
            utilService.swal('center', 5000, 'warning', `לחץ שמור בסיום ההודעה `)
        }
    }

    function onUploadCategoriesImg(idx, imgUrl) {
        if (user.isAdmin) {
            user.mainCategories[idx] = imgUrl
            utilService.swal('center', 5000, 'warning', `לחץ שמור בסיום ההודעה `)
        }
        console.log({ user });
    }


    function sendMails() {
        userService.sendMails(msg)
        utilService.swal('center', 2500, 'success', 'מייל נשלח')
        setMsg({ text: '', title: '' })
    }

    return (
        <div className="admin-page rtl">
            <div className="msg flex column">
                <h1> This is Admin page</h1>
                <p>
                    ציון הדף הזה הוא בשביל שתוכל לשלוח מייל לכל המשתמשים שנרשמו והסכימו שתשלח להם אימייל אתה צריך לרשום נושא של האימייל תוכן ולשלוח בכפתור
                </p>
                <input type="text" placeholder="נושא לאימייל" name="title" value={msg.title} onChange={handleChange} />
                <textarea placeholder="תוכן לאימייל" value={msg.text} name="text" cols="30" rows="10" onChange={handleChange} ></textarea>
                <button className="app-btn" onClick={() => sendMails()}>שלח לכולם</button>
            </div>

            <div className="main-image-upload flex">
                <h3>שינוי תמונה ראשית </h3>
                <label >העלאת תמונה ראשית לעמוד בית</label>
                <UploadImg uploadImg={onUploadImg}></UploadImg>
                {user && <img src={user.mainImg} />}
                <button className="app-btn" onClick={() => props.saveUser(user)}>שמור </button>
            </div>
            <div>
                <h3>שינוי תמונות של הקטגוריות בעמוד בית</h3>
                <div className="categories-image-upload flex ">
                    <div>
                        <label >חולצות:</label>
                        <UploadImg uploadImg={(el) => onUploadCategoriesImg(0, el)}></UploadImg>
                        {user && <img src={user.mainCategories[0]} />}
                    </div>
                    <div>
                        <label >מכנסיים :</label>
                        <UploadImg uploadImg={(el) => onUploadCategoriesImg(1, el)}></UploadImg>
                        {user && <img src={user.mainCategories[1]} />}
                    </div>
                    <div>
                        <label >  ג'קטים:</label>
                        <UploadImg uploadImg={(el) => onUploadCategoriesImg(2, el)}></UploadImg>
                        {user && <img src={user.mainCategories[2]} />}
                    </div>
                    <div>
                        <label > אביזרים:</label>
                        <UploadImg uploadImg={(el) => onUploadCategoriesImg(3, el)}></UploadImg>
                        {user && <img src={user.mainCategories[3]} />}
                    </div>

                </div>
                <button className="app-btn" onClick={() => props.saveUser(user)}>שמור תמונות</button>
            </div>
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
