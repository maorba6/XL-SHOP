import React, { useEffect } from 'react';
import whatsapp from '../../assets/img/whatsapp.png'
import phone from '../../assets/img/phone.png'
import address from '../../assets/img/address.png'
import email from '../../assets/img/email.png'
import facebook from '../../assets/social-icons/facebook-color.png'
import instagram from '../../assets/social-icons/instagram-color.png'
import './Footer.scss'
export function Footer() {


    return (
        <footer>

            <div className="contact-footer">
                <h2>contact Us</h2>
                <ul className="">
                    <li>
                        <img src={email} />
                        <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">Email Us</a>
                    </li>
                    <li>
                        <img src={whatsapp} />
                        <a target="_blank" href="https://wa.link/s69g6e">Send Whatsapp</a>
                    </li>
                    <li>
                        <img src={phone} />
                      <label> Business Phone: 089461751</label>
                        </li>
                    <li>
                        <img src={address} />
                     <label >   Address :  רחוב בילו 23 מול הקניון (רחובות)</label>
                        </li>
                </ul>

            </div>
        </footer>



    );
}