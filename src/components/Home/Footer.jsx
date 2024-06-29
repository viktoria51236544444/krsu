import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./footer.css";
import {
  FacebookLogo,
  InstagramLogo,
  TelegramLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import logo from "./image/knau.png";

const Footer = () => {
  const location = useLocation();

  const hiddenFooterRoutes = [
    "/concurs",
    "/participants",
    "/roles",
    "/public",
    "/completed",
    "/canceled",
    "/archive",
    "/act",
    "/verf",
    "/register",
    "/auth",
    "/deac",
    "/reports"
  ];
  const isFooterHidden = hiddenFooterRoutes.includes(location.pathname);

  return (
    !isFooterHidden && (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-block">
            <div className="logo-container">
              <img src={logo} alt="logo" className="logo-image" />
              <h4>КНАУ им. К.И. Скрябина</h4>
            </div>
          </div>
          <div className="footer-block">
            <div className="contacts">
              <div className="contacts_inner">
                <div className="footer-block">
                  <h5>Контакты</h5>
                  <p>+996(555)-954-120</p>
                  <p>+996(552)-708-701</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-block">
            <div className="contacts">
              <div className="contacts_inner">
                <div className="footer-block">
                  <h5>Почта</h5>
                  <p className="email__footer">altynsuleimankg@gmail.com</p>
                  <p className="admin333">admin@333.kg</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-block">
            <div className="contacts">
              <div className="contacts_inner">
                <div className="footer-block">
                  <h5>Объявления</h5>
                  <NavLink
                    to={"/ads"}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    className="admin333"
                  >
                    Все объявления
                  </NavLink>
                  <NavLink
                    to={"/cancele"}
                    className="email__footer"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Деактивированные объявления
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="copyright__inner">
            <p>
              Все права защищены © 2024 - Кыргызский Национальный Аграрный
              Университет им. К.И. Скрябина
            </p>
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
