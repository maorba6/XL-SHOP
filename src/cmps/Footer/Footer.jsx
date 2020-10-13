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
                    <ul  >
                        <li className="hover">
                            <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">
                                <EmailSvg className="svg"></EmailSvg>
                           Email Us</a>
                        </li>
                        <li className="hover">
                            <a target="_blank" href="https://wa.link/s69g6e">
                                <WhatsappSvg className="svg"></WhatsappSvg>
                           Send Whatsapp</a>
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
                        <li> <Link to="/shop/Polo-Shirts">Polo Shirts </Link>  </li>
                        <li> <Link to="/shop/T-Shirts">T-Shirts </Link>  </li>
                        <li> <Link to="/shop/Elegeant-Pants">Elegenat Pants </Link>  </li>
                        <li> <Link to="/shop/Coats">Coats </Link>  </li>
                        <li> <Link to="/shop/Belts">Belts </Link>  </li>
                        <li> <Link to="/shop/Ties">Ties </Link>  </li>
                        <li> <Link to="/shop/Jeans">Jeans </Link>  </li>
                    </ul>
                </div>
                <div className="pages">
                    <h3>Main Pages</h3>
                    <ul>
                        <li> <Link to="/">Home </Link>  </li>
                        <li> <Link to="/profile/wishlist">Profile </Link>  </li>
                        <li> <Link to="/shop">Shop</Link>  </li>
                        <li> <Link to="/cart">Cart</Link>  </li>
                        <li> <Link to="/login">Login </Link>  </li>
                    </ul>
                </div>
            </div>
            <div className="copyrights">
                ©  copyrights here
                </div>

        </footer>



    );
}