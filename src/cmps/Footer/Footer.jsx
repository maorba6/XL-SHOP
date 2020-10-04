import React, { useEffect } from 'react';
import whatsapp from '../../assets/social-icons/whatsapp.png'
import facebook from '../../assets/social-icons/facebook-color.png'
import instagram from '../../assets/social-icons/instagram-color.png'
import './Footer.scss'
export function Footer() {
    

    return (
        <footer>
         
            <div className="contact-footer">
                    <h2>Find Us</h2>
                    <ul>
                        <li>
                            <a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=zion71il@gmail.com&su=&body=נא להשאיר פרטי קשר שנוכל לחזור אליכם ">Email Us</a>
                        </li>
                        <li>
                            <a target="_blank" href="https://wa.link/s69g6e">Send Whatsapp</a>
                        </li>
                        <li>
                            Business Phone: 089461751
                        </li>
                        <li>
                            Address :  רחוב בילו 23 מול הקניון (רחובות)
                        </li>
                    </ul>
                    
                </div>
        </footer>



    );
}