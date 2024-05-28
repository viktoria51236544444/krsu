import React from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';
import { FacebookLogo, InstagramLogo, TelegramLogo, YoutubeLogo } from "@phosphor-icons/react";
import logo from "./image/кнау.png";

const Footer = () => {
    const location = useLocation();
    
    const hiddenFooterRoutes = ["/concurs", "/participants", "/roles", "/public", "/completed", "/canceled", "/archive", "/act", "/verf", "/register", "/auth", "/deac"];
    const isFooterHidden = hiddenFooterRoutes.includes(location.pathname);

    return (
        !isFooterHidden && (
            <footer className="footer">
                <div className="footer-container">
                    <div className='footer-block'>
                        <div className='logo-container'>
                            <img src={logo} alt="logo" className='logo-image'/>
                            <h4>КНАУ им. К.И. Скрябина</h4>
                        </div>
                    </div>
                    <div className='footer-block'>
                        <div className='contacts'>
                            <div className='contacts_inner'>
                                <div className="footer-block">
                                    <h5>Телефон</h5>
                                    <p>+996(555)-954-120</p>
                                    <p>+996(552)-708-701</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='footer-block'>
                        <div className='contacts'>
                            <div className='contacts_inner'>
                                <div className="footer-block">
                                    <h5>Почта</h5>
                                    <p className='email__footer'>altynsuleimankg@gmail.com</p>
                                    <p className='admin333'>admin@333.kg</p>
                                </div>
                            </div>
                        </div>
                    </div>
                  
                </div>
                <div className="copyright">
                    
                    <p>Все Права Защищены © 2024 - Кыргызский Национальный Аграрный Университет</p>
                </div>
            </footer>
        )
    );
};

export default Footer;
