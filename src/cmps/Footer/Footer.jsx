import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
//icons-svgs
import { ReactComponent as LocationSvg } from '../../assets/img/location.svg';
import { ReactComponent as EmailSvg } from '../../assets/img/email.svg';
import { ReactComponent as PhoneSvg } from '../../assets/img/phone.svg';
import { ReactComponent as WhatsappSvg } from '../../assets/img/whatsapp.svg'
import './Footer.scss'
import { useState } from 'react';
export function Footer() {

    const [style, setStyle] = useState({
        svgFirst: { fill: 'white', cursor: 'default' }, labelFirst: { color: 'white', cursor: 'default' },
        svgSecond: { fill: 'white', cursor: 'default' }, labelSecond: { color: 'white', cursor: 'default' }
    })
    // setState(state => ({ ...state, editedUser: { ...state.editedUser, [field]: value } }))

    function hover(color, cursor, idx) {
        if (idx === '1') {
            setStyle(style => ({ ...style, svgFirst: { ...style.svg, fill: color, cursor } }))
            setStyle(style => ({ ...style, labelFirst: { ...style.label, color, cursor } }))
        } else {
            setStyle(style => ({ ...style, svgSecond: { ...style.svg, fill: color, cursor } }))
            setStyle(style => ({ ...style, labelSecond: { ...style.label, color, cursor } }))
        }
    }


    return (
        <footer className="flex column rtl">
            <div className="flex content">
                <div className="contact-us">
                    <h3> צור קשר</h3>
                    <ul  >
                        <li  >
                            <a onMouseOver={() => hover('#f79898', 'pointer', '1')} onMouseOut={() => hover('white', 'default', '1')}
                                target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">
                                <EmailSvg style={style.svgFirst} className="svg"></EmailSvg>
                                <label style={style.labelFirst} > לשליחת מייל  </label>
                            </a>
                        </li>
                        <li >
                            <a onMouseOver={() => hover('#f79898', 'pointer', '2')} onMouseOut={() => hover('white', 'default', '2')}
                                target="_blank" href="https://wa.link/s69g6e">
                                <WhatsappSvg style={style.svgSecond} className="svg"></WhatsappSvg>

                                <label style={style.labelSecond}  >  שלח הודעת וואצפ </label></a>
                        </li>
                        <li>
                            <PhoneSvg className="svg"></PhoneSvg>
                            <label>  טלפון העסק: 089461751 </label>
                        </li>
                        <li>
                            <LocationSvg className="svg"></LocationSvg>
                            <label >   כתובת :  רחוב בילו 23 מול הקניון (רחובות)</label>
                        </li>
                    </ul>
                </div>


                <div className="categories">
                    <h3> קטגרויות מובילות</h3>
                    <ul>
                        <li> <Link to="/shop/Polo-Shirts"> חולצות פולו </Link>  </li>
                        <li> <Link to="/shop/T-Shirts"> טי-שירט </Link>  </li>
                        <li> <Link to="/shop/Elegeant-Pants">מכנסי אלגנט </Link>  </li>
                        <li> <Link to="/shop/Coats">מעילים </Link>  </li>
                        <li> <Link to="/shop/Belts">חגורות </Link>  </li>
                        <li> <Link to="/shop/Ties">עניבות </Link>  </li>
                        <li> <Link to="/shop/Jeans">גי'נסים </Link>  </li>
                    </ul>
                </div>
                <div className="pages">
                    <h3>עמודים ראשיים </h3>
                    <ul>
                        <li> <Link to="/">בית </Link>  </li>
                        <li> <Link to="/profile/wishlist">פרופיל </Link>  </li>
                        <li> <Link to="/shop">חנות</Link>  </li>
                        <li> <Link to="/cart">עגלת קניות</Link>  </li>
                        <li> <Link to="/login">התחברות </Link>  </li>
                    </ul>
                </div>
            </div>
            <div className="copyrights">
            ©  זכויות יוצרים למידות גדולות 
                </div>


        </footer>



    );
}