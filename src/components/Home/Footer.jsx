import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';
import { FacebookLogo, InstagramLogo, TelegramLogo, YoutubeLogo } from "@phosphor-icons/react";
import logo from "./image/кнау.png";

const Footer = () => {
    const location = useLocation();
    
   
    const hiddenFooterRoutes = ["/concurs", "/participants", "/roles", "/public", "/completed", "/canceled", "/archive", "/act", "/verf", "/register", "/auth"];

    const isFooterHidden = hiddenFooterRoutes.includes(location.pathname);

    return (
        !isFooterHidden && (
            <footer className="footer">
                <div className="footer-container">
                    <div className='logo-container'>
                        <img src={logo} alt="logo" className='logo-image'/>
                        <h4>КНАУ им. К.И. Скрябина</h4>
                    </div>
                    <div className='contacts'>
                        <div className='contacts_inner'>
                            <div className="footer-block">
                                <h5>Телефон</h5>
                                <p>+996(555)-954-120</p>
                                <p>+996(552)-708-701</p>
                            </div>
                            <div className="footer-block">
                                <h5>Почта</h5>
                                <p>altynsuleimankg@gmail.com</p>
                                <p>admin@333.kg</p>
                            </div>
                        </div>
                    </div>
                    <div className='contacts'>
                        <div className='contact-title'>
                            <h4>Больше о нас </h4>
                        </div>
                        <div className='contacts_inner'>
                            <div className='social'>
                                <a href="https://www.instagram.com/knau_official/">
                                    <InstagramLogo size={34} color="#000"/>
                                </a>
                                <a href="https://www.facebook.com/knau.kg">
                                    <FacebookLogo size={34} color="#000"/>
                                </a>
                                <a href="https://www.youtube.com/channel/UCgpUMPYsegaiqZce_nBLgzg">
                                    <YoutubeLogo size={34} color="#000"/>
                                </a>
                                <a href="https://t.me/knaukg">
                                    <TelegramLogo size={34} color="#000"/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='copiright'>
                    <p>Все Права Защищены © 2024 - Кыргызский Национальный Аграрный Университет</p>
                </div>
            </footer>
        )
    );
};

export default Footer;
