import React, { useEffect } from 'react';
import whatsapp from '../../assets/social-icons/whatsapp.png'
import facebook from '../../assets/social-icons/facebook-color.png'
import instagram from '../../assets/social-icons/instagram-color.png'
import './Footer.scss'
export function Footer() {
    

    return (
        <footer>
            <h1>footer</h1>
            <div className="social">
                <img src={whatsapp} />
                <img src={facebook} />
                <img src={instagram} />
            </div>
            {/* <div className="colors">
                        <span>colors: </span>
                        <ul >
                            {item.colors.map(color => {
                                return <li key={color} value={color}>{color}<button onClick={(ev) => this.removeColor(ev, color)}>x</button></li>
                            })}
                            <button>+</button>
                        </ul>
                    </div>
                    <div className="sizes">
                        <span>sizes: </span>
                        <ul >
                            {item.sizes.map(size => {
                                return <li key={size} value={size}>{size}<button onClick={(ev) => this.removeSize(ev, size)}>x</button></li>
                            })}
                            <button>+</button>
                        </ul>
                    </div> */}
        </footer>



    );
}