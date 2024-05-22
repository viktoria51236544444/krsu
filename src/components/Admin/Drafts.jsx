import React, { useEffect } from 'react';
import './concurs.css';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import "./Sidebar.css";
import { Link } from 'react-router-dom';

const Drafts = () => {
   
    return (
        <div class="oll_sistem">
            <div class="sidebar_container">
                <div className="sidebar" style={{ borderRight: '1px solid #ddd', paddingRight: '15px', display: 'flex', flexDirection: 'column', width: "15vw" }}>
                    <h5>КНАУ</h5>
                    <Nav className="flex-column">
                        <NavItem style={{ display: "flex", alignItems: "center", }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-grid-fill" viewBox="0 0 16 16">
                                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z" />
                            </svg>
                            <NavLink href="/concurs">Конкурсы</NavLink>
                        </NavItem>
                        <NavItem style={{ display: "flex", alignItems: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bounding-box-circles" viewBox="0 0 16 16">
                                <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2m2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2 2 0 0 1 1.437-1.437V3.937A2 2 0 0 1 12.063 2.5H3.937A2 2 0 0 1 2.5 3.937M14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                            </svg>
                            <NavLink href="/participants">Участники</NavLink>
                        </NavItem>
                        <NavItem style={{ display: "flex", alignItems: "center" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-layout-text-window-reverse" viewBox="0 0 16 16">
                                <path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                                <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z" />
                            </svg>
                            <NavLink href="/roles">Роли</NavLink>
                        </NavItem>
                        
                    </Nav>

                    <div style={{ marginTop: 'auto', marginBottom: '5vw', borderTop: '2px solid #ddd' }}>
                        <Link to={"/"}> <svg style={{ marginLeft: "2vw", marginTop: "1vw", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" />
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                        </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div class="navbar_container">

                <div class="navbar">
                    <form class="search-counter" role="search">
                        <div
                            class="search-counte-container"
                        >
                        </div>
                        <div class="search-counter-input">

                            <div class="search-counter-button">
                               
                                <div>
                                    <Tabs style={{ marginTop: "1.1vw", fontSize: "14px" }}
                                        defaultActiveKey="profile"
                                        id="fill-tab-example"
                                        className="mb-4"
                                        fill
                                    >
                                        <Link to={"/concurs"}><Tab eventKey="home" title="Черновики">
                                        </Tab></Link>
                                        <Link to={"/info"}>
                                        <Tab eventKey="profile" title="Опубликованные">
                                        </Tab></Link>
                                        <Tab eventKey="longer-tab" title="Завершенные">
                                        </Tab>
                                        <Tab eventKey="canceled" title="Отмененные">
                                        </Tab>
                                        <Tab eventKey="canceled" title="Архив">
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                            <div class="user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                <p>  @victoria@gmail.com</p></div>
                        </div>
                    </form>
                </div>
                <div class="container_information_client">
                    <div>
                        <div>
                            <input type="text" placeholder='Год' />
                        </div>
                        <div>
                            <input type="number" placeholder='Номер' />
                        </div>
                        <div>
                            <input type="text" placeholder='Способ закупки' />
                        </div>
                        <div>
                            <input type="text" placeholder='Предмет закупки' />
                        </div>
                        <div>
                            <input type="number" placeholder='Начало закупки' />
                        </div>
                        <div>
                            <input type="number" placeholder='Окночание закупки' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Drafts;
