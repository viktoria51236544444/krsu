import React, { useEffect, useState } from 'react';
import './concurs.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';
import './Sidebar.css';
import axios from 'axios';
import Sidebar from './Sidebar';


const Participants = () => {
    const { users, getUserList } = UseRegister();
    const [selectedIndex, setSelectedIndex] = useState(null); 
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getUserList();
    }, []);

    const getUserInfo = async (codeId, index) => {
        try {
            const { data } = await axios.get(`http://212.112.105.196:3457/api/users/getUserInfo/${codeId}`);
            setSelectedIndex(index);
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
            <Sidebar />
            <div className="navbar_container">

                <div style={{ background: 'white', display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6vw", }}>
                    <div >
                        <div className="pills-outline">
                            <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Неверифицированные</button>
                            <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Верифицированные</button>
                            <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Деактивированные</button>

                        </div>

                    </div>
                    <div>
                        <div>
                            admin@gmail.com
                        </div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive mt-4">
                                <Table striped bordered hover>
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
                                            <tr key={user.codeid} data-codeid={user.codeid} onClick={() => getUserInfo(user.codeid, index)}>
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
                                </Table>
                            </div>
                        </div>
                    </div>
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
