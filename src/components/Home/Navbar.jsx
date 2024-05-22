import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function NavScrollExample() {
    const [activeTab, setActiveTab] = useState("");
    const [email, setEmail] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActiveTab(location.pathname);

        const token = localStorage.getItem('authToken');
        if (token) {
            const codeid = localStorage.getItem('codeid');
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail && !codeid) {
                setEmail(userEmail);
            } else if (codeid) {
                setEmail(userEmail); 
                // Проверяем, что userInfo ещё не сохранён в localStorage
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
                const { data } = await axios.get(`http://212.112.105.196:3457/api/users/getUserInfo/${codeid}`);
                localStorage.setItem('userInfo', JSON.stringify(data.user.user));
            }
        } catch (error) {
            console.log('Ошибка при получении информации о пользователе:', error);
        }
    };
    

    const handlePersonaClick = () => {
        const codeid = localStorage.getItem('codeid');
        if (codeid) {
            navigate('/persona');
        }
    };

    const isNavBarHidden = ["/concurs", "/participants", "/roles", "/public", "/completed"].includes(activeTab);

    return (
        !isNavBarHidden && (
            <Navbar expand="lg" className="bg-white border-bottom">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="text-dark">КНАУ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavDropdown title="Объявления" id="navbarScrollingDropdown">
                                <NavDropdown.Item as={Link} to="/ads" className={`nav-link ${activeTab === "/ads" ? "active" : ""}`}>Всего объявлений</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/cancele" className={`nav-link ${activeTab === "/cancele" ? "active" : ""}`}>
                                    Отмененные объявления
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/info" className={`nav-link ${activeTab === "/info" ? "active" : ""}`}>
                                Информация о заключенных договорах
                            </Nav.Link>
                            <Nav.Link as={Link} to="/contact" className={`nav-link ${activeTab === "/contact" ? "active" : ""}`}>
                                Контакты и реквизиты
                            </Nav.Link>
                            <Nav.Link as={Link} to="/regulatory" className={`nav-link ${activeTab === "/regulatory" ? "active" : ""}`}>
                                Нормативный правовой акт
                            </Nav.Link>
                            {email && (
                                <Nav.Link onClick={handlePersonaClick} className="nav-link">Личный кабинет</Nav.Link>
                            )}
                        </Nav>
                        <Form className="d-flex align-items-center">
                            {email ? (
                                <>
                                    <span style={{ marginRight: "10px" }}>{email}</span>
                                    <Button variant="outline-dark" onClick={signout}>Выход</Button>
                                </>
                            ) : (
                                <div style={{display :"flex", alignItems :"center", gap: "1rem"}}>
                                    <Link to="/auth" style={{ textDecoration: "none", color: 'black' }}><p>Войти</p></Link>
                                    <Link to="/register" style={{ textDecoration: "none", color: 'black' }}><p>Регистрация</p></Link>
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
