import React, { useEffect, useState } from 'react';
import './concurs.css';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';
import './Sidebar.css';
import axios from 'axios';
import { Nav, NavItem, NavLink } from 'react-bootstrap';


const Participants = () => {
    const { users, getUserList } = UseRegister();
    const [selectedIndex, setSelectedIndex] = useState(null); // Индекс выбранного пользователя для модального окна
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        getUserList();
    }, []);

    const getUserInfo = async (codeId, index) => {
        try {
            const { data } = await axios.get(`http://212.112.105.196:3457/api/users/getUserInfo/${codeId}`);
            setSelectedIndex(index); // Устанавливаем индекс выбранного пользователя
            setShowModal(true); 
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false); 
    }

    if (!users) {
        return <div>Loading...</div>
    }

    return (
        <div className="oll_sistem">
            <div class="sidebar_container"> 
                <div className="sidebar" style={{ borderRight: '1px solid #ddd', paddingRight: '15px', display: 'flex', flexDirection: 'column' }}> 
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
                            <NavLink href="/participants">Контрагенты</NavLink> 
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
                        <Link to={"/"}>     <svg style={{ marginLeft: "2vw", marginTop: "1vw", cursor: "pointer" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16"> 
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" /> 
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" /> 
                        </svg> 
                        </Link> 
                    </div> 
                </div> 
            </div>
            <div className="navbar_container">
                <div className="navbar">
                    <form className="search-counter" role="search">
                        <div className="search-counter-container" style={{ justifyContent: "space-between" }}>
                            <div className="search-counter-button">
                                <Link to="#"><button>Неверифицированный</button></Link>
                                <Link to="#"><button>Верифицированный</button></Link>
                                <Link to="#"><button>Деактивированные</button></Link>
                            </div>
                            <div className="user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                                <p> @victoria@gmail.com</p>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="container_information_client">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ФИО</th>
                                <th scope="col">Организация</th>
                                <th scope="col">ИНН</th>
                                <th scope="col">Адрес</th>
                                <th scope="col">Фактический адрес</th>
                                <th scope="col">Юридический адрес</th>
                                <th scope="col">Электронная почта</th>
                                <th scope="col">Телефон</th>
                                <th scope="col">Банк</th>
                                <th scope="col">БИК</th>
                                <th scope="col">Расчетный счет</th>
                                <th scope="col">Сайт</th>
                                <th scope="col">Должность</th>
                            </tr>
                        </thead>
                        <tbody >
                            {users.map((user, index) => (
                                <tr  key={user.codeid} data-codeid={user.codeid} onClick={() => getUserInfo(user.codeid, index)}>
                                    <td>{user.fio}</td>
                                    <td>{user.name_organization}</td>
                                    <td>{user.inn}</td>
                                    <td>{user.address}</td>
                                    <td>{user.fact_address}</td>
                                    <td>{user.ur_address}</td>
                                    <td>{user.email}</td>
                                    <td>{user.pin_manager}</td>
                                    <td>{user.banc_name}</td>
                                    <td>{user.bik}</td>
                                    <td>{user.deposit_account}</td>
                                    <td>{user.web_site}</td>
                                    <td>{user.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <h5>Информация о пользователе</h5>
                </Modal.Header>
                <Modal.Body>
                    {selectedIndex !== null && (
                        <div className='modal__detail-user'>
                            <p><strong >ФИО:</strong> {users[selectedIndex].fio}</p>
                            <p><strong>Организация:</strong> {users[selectedIndex].name_organization}</p>
                            <p><strong>ИНН:</strong> {users[selectedIndex].inn}</p>
                            <p><strong>Адрес:</strong> {users[selectedIndex].address}</p>
                            <p><strong>Фактический адрес:</strong> {users[selectedIndex].fact_address}</p>
                            <p><strong>Юридический адрес:</strong> {users[selectedIndex].ur_address}</p>
                            <p><strong>Электронная почта:</strong> {users[selectedIndex].email}</p>
                            <p><strong>Телефон:</strong> {users[selectedIndex].pin_manager}</p>
                            <p><strong>Банк:</strong> {users[selectedIndex].banc_name}</p>
                            <p><strong>БИК:</strong> {users[selectedIndex].bik}</p>
                            <p><strong>Расчетный счет:</strong> {users[selectedIndex].deposit_account}</p>
                            <p><strong>Сайт:</strong> {users[selectedIndex].web_site}</p>
                            <p><strong>Должность:</strong> {users[selectedIndex].position}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">Деактивировать</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Participants;
