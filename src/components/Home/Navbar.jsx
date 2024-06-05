import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "./image/кнау.png";
import { API } from '../../helpers/const';


function NavScrollExample() {
    const [activeTab, setActiveTab] = useState("");
    const [email, setEmail] = useState(null);
    const [id, setCodeid] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActiveTab(location.pathname);

        const token = localStorage.getItem('authToken');
        if (token) {
            const codeid = localStorage.getItem('codeid');
            setCodeid(codeid);
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail && !codeid) {
                setEmail(userEmail);
            } else if (codeid) {
                setEmail(userEmail);
                const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!storedUserInfo) {
                    getUserInfo(codeid);
                }
            }
        } else {
            setEmail(null);
        }
    }, [location]);

    const signout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти из аккаунта?");
        if (confirmed) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('codeid');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('role');
            setEmail(null);
            console.log('User signed out');
            navigate('/');
        }
    };

    const getUserInfo = async (codeid) => {
        try {
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!storedUserInfo) {
                const { data } = await axios.get(`${API}api/users/getUserInfo/${codeid}`);
                console.log(data.user.user);
                localStorage.setItem('userInfo', JSON.stringify(data.user.user));
                setIsAdmin(data.user.user.role === 'Администратор');
            }
        } catch (error) {
            console.log('Ошибка при получении информации о пользователе:', error);
        }
    };

    const handlePersonaClick = () => {
        const userInfo = localStorage.getItem('userInfo');
        console.log(userInfo);
        if (userInfo) {
            navigate('/persona');
        } else {
            const codeid = localStorage.getItem('codeid');
            if (codeid) {
                console.log(codeid);
                getUserInfo(codeid);
                navigate('/persona');
            }
        }
    };

    const handleEmailClick = () => {
        const storedRole = localStorage.getItem('role');
        if (isAdmin || storedRole === 'Администратор') {
            navigate('/concurs');
        }
    };

    const isNavBarHidden = ["/concurs", "/participants", "/roles", "/public", "/completed", "/canceled", "/archive", "/act", "/verf", "/deac", "/reports"].includes(activeTab);

    return (
        !isNavBarHidden && (
            <Navbar expand="lg" className="border-bottom shadow-none" style={{ padding: "10px 15px", height: "5rem", backgroundColor: "#9b9b9b9b" }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="text-white">
                        <img style={{ width: "30px" }} src={logo} alt="logo" />
                        <span>КНАУ им. К.И. Скрябина</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0 custom-dropdown-menu" navbarScroll>
                            <NavDropdown title="Объявления" id="navbarScrollingDropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    to="/ads"
                                    className={`nav-link ${activeTab === "/ads" ? "active" : ""}`}
                                    style={{
                                        color: activeTab === "/ads" ? '#0D6EFD' : 'white',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    Все объявления
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    to="/cancele"
                                    className={`nav-link  ${activeTab === "/cancele" ? "active" : ""}`}
                                    style={{
                                        color: activeTab === "/cancele" ? '#0D6EFD' : 'white',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    Деактивированные объявления
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link
                                as={Link}
                                to="/info"
                                className={`nav-link ${activeTab === "/info" ? "active" : ""}`}
                                style={{ color: 'white' }}
                            >
                                Информация о заключенных договорах
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/contact"
                                className={`nav-link ${activeTab === "/contact" ? "active" : ""}`}
                                style={{ color: 'white' }}
                            >
                                Контакты и реквизиты
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/regulatory"
                                className={`nav-link ${activeTab === "/regulatory" ? "active" : ""}`}
                                style={{ color: 'white' }}
                            >
                                Нормативно правовые акты
                            </Nav.Link>
                            {email && +id !== 1 && (
                                <Nav.Link onClick={handlePersonaClick} className="nav-link" style={{ color: 'white' }}>
                                    Личный кабинет
                                </Nav.Link>
                            )}
                        </Nav>
                        <Form className="d-flex align-items-center">
                            {email ? (
                                <>
                                    <span style={{ marginRight: "10px", cursor: "pointer", color: 'white' }} onClick={handleEmailClick}>{email}</span>
                                    <Button variant="primary" className="rounded-pill" onClick={signout}>Выход</Button>
                                </>
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <Link to="/auth" style={{ textDecoration: "none", color: 'white' }}>
                                        <Button variant="outline-primary" className="rounded-pill">Войти</Button>
                                    </Link>
                                    <Link to="/register" style={{ textDecoration: "none", color: 'white' }}>
                                        <Button variant="primary" className="rounded-pill">Регистрация</Button>
                                    </Link>
                                </div>
                            )}
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    );
}

export default NavScrollExample;
