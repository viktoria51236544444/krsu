import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-block">
                    <h5>Контакты</h5>
                    <p>КНАУ им. К.И. Скрябина</p>
                </div>
                <div className="footer-block">
                    <h5>Телефон</h5>
                    <p>+123456789</p>
                    <p>+123456789</p>
                </div>
                <div className="footer-block">
                    <h5>Почта</h5>
                    <p>example@example.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
