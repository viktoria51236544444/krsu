import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from "./image/кнау.png"

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
            setCodeid(codeid)
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail && !codeid) {
                setEmail(userEmail);
            } else if (codeid) {
                setEmail(userEmail);
                const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!storedUserInfo) {
                    getUserInfo(codeid);
                } else {
                    setIsAdmin(storedUserInfo.role === 'Администратор');
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
                const { data } = await axios.get(`http://212.112.105.196:3457/api/users/getUserInfo/${codeid}`);
                console.log(data.user.user);
                localStorage.setItem('userInfo', JSON.stringify(data.user.user));
                setIsAdmin(data.user.user.role === 'Администратор');
            } else {
                setIsAdmin(storedUserInfo.role === 'Администратор');
            }
        } catch (error) {
            console.log('Ошибка при получении информации о пользователе:', error);
        }
    };

    const handlePersonaClick = () => {
        const userInfo = localStorage.getItem('userInfo');
        console.log(userInfo)
        if (userInfo) {
            navigate('/persona');
        } else {
            const codeid = localStorage.getItem('codeid');
            if (codeid) {
                console.log(codeid)
                getUserInfo(codeid);
                navigate('/persona');
            }
        }
    };

    const handleEmailClick = () => {
        if (isAdmin) {
            navigate('/concurs');
        }
    };

    const isNavBarHidden = ["/concurs", "/participants", "/roles", "/public", "/completed", "/canceled", "/archive", "/act", "/verf", "/deac"].includes(activeTab);

    return (
        !isNavBarHidden && (
            <Navbar expand="lg" className="bg-light border-bottom shadow-none" style={{ padding: "10px 15px", height: "3.5rem" }}>
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="text-dark">
                        <img style={{ width: "30px" }} src={logo} alt="logo" />
                        <span className='logoText'>КНАУ им. К.И. Скрябина</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <NavDropdown title="Объявления" id="navbarScrollingDropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    to="/ads"
                                    className={`nav-link ${activeTab === "/ads" ? "active" : ""}`}
                                    style={{
                                        color: activeTab === "/ads" ? '#0D6EFD' : 'black',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    Все объявления
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    to="/cancele"
                                    className={`nav-link ${activeTab === "/cancele" ? "active" : ""}`}
                                    style={{
                                        color: activeTab === "/cancele" ? '#0D6EFD' : 'black',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    Деактивированные объявления
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link
                                as={Link}
                                to="/info"
                                className={`nav-link ${activeTab === "/info" ? "active" : ""}`}
                            >
                                Информация о заключенных договорах
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/contact"
                                className={`nav-link ${activeTab === "/contact" ? "active" : ""}`}
                            >
                                Контакты и реквизиты
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/regulatory"
                                className={`nav-link ${activeTab === "/regulatory" ? "active" : ""}`}
                            >
                                Нормативно правовые акты
                            </Nav.Link>
                            {email && +id !== 1 && (
                                <Nav.Link onClick={handlePersonaClick} className="nav-link">
                                    Личный кабинет
                                </Nav.Link>
                            )}
                        </Nav>
                        <Form className="d-flex align-items-center">
                            {email ? (
                                <>
                                    <span style={{ marginRight: "10px", cursor: "pointer" }} onClick={handleEmailClick}>{email}</span>
                                    <Button variant="primary" className="rounded-pill" onClick={signout}>Выход</Button>
                                </>
                            ) : (
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                    <Link to="/auth" style={{ textDecoration: "none", color: 'black' }}>
                                        <Button variant="outline-primary" className="rounded-pill">Войти</Button>
                                    </Link>
                                    <Link to="/register" style={{ textDecoration: "none", color: 'black' }}>
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
