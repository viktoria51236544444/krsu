import React, { useEffect, useState } from 'react';
import './concurs.css';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';
import './Sidebar.css';
import axios from 'axios';
import Sidebar from './Sidebar';


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
            <Sidebar/>
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
