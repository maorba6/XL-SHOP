import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
//icons-svgs
import { ReactComponent as LocationSvg } from '../../assets/img/location.svg';
import { ReactComponent as EmailSvg } from '../../assets/img/email.svg';
import { ReactComponent as PhoneSvg } from '../../assets/img/phone.svg';
import { ReactComponent as WhatsappSvg } from '../../assets/img/whatsapp.svg'
import './Footer.scss'
export function Footer() {


    return (
        <footer className="flex column">
            <div className="flex content">
                <div className="contact-us">
                    <h3>Contact Us</h3>
                    <ul >
                        <li>
                            <EmailSvg className="svg"></EmailSvg>
                            <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">Email Us</a>
                        </li>
                        <li>
                            <WhatsappSvg className="svg"></WhatsappSvg>
                            <a target="_blank" href="https://wa.link/s69g6e">Send Whatsapp</a>
                        </li>
                        <li>
                            <PhoneSvg className="svg"></PhoneSvg>
                            <label> Business Phone: 089461751</label>
                        </li>
                        <li>
                            <LocationSvg className="svg"></LocationSvg>
                            <label >   Address :  רחוב בילו 23 מול הקניון (רחובות)</label>
                        </li>
                    </ul>
                </div>


                <div className="categories">
                    <h3>Top Categories</h3>
                    <ul>
                        <li> <Link to="/shop/polo-shirts">Polo Shirts </Link>  </li>
                        <li> <Link to="/shop/t-shirts">T-Shirts </Link>  </li>
                        <li> <Link to="/shop/elegeant-pants">Elegenat Pants </Link>  </li>
                        <li> <Link to="/shop/coats">Coats </Link>  </li>
                        <li> <Link to="/shop/belts">Belts </Link>  </li>
                    </ul>
                </div>
                <div className="pages">
                    <h3>Main Pages</h3>
                    <ul>
                        <li> <Link to="/">home </Link>  </li>
                        <li> <Link to="/profile">profile </Link>  </li>
                        <li> <Link to="/shop">shop</Link>  </li>
                        <li> <Link to="/cart">cart</Link>  </li>
                        <li> <Link to="/login">login </Link>  </li>
                    </ul>
                </div>
            </div>
            <div className="copyrights">
                ©  copyrights here
                </div>

        </footer>



    );
}