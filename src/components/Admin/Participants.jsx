import React, { useEffect, useState } from 'react';
import './concurs.css';
import { Button, Modal, Table } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import Sidebar from './Sidebar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Participants = () => {
    const { users2, getUserList, updateUserStatus, getByStatus, getByStatus2 } = UseRegister();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(0);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString); 
        }
    }, []);

    useEffect(() => {
        getUserList();
        getByStatus(2);
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

    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowModal(true);
    }

    const handleSendData = () => {
        const data = {
            status: 1,
            comment: comment,
            userId: userId
        };
        updateUserStatus(data);
        getByStatus();
        setShowModal(false);
        setComment('');
    }

    const handleDeactivate = (codeId) => {
        setUserId(codeId);
        setShowModal(true);
    }

    const handleDeactivateConfirm = () => {
        const data = {
            status: 3,
            comment: comment,
            userId: userId
        };
        updateUserStatus(data);
        getByStatus2(); // Calling getByStatus2 with status -1
        setShowModal(false);
        setComment('');
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    if (!users2) {
        return <div>Loading...</div>;
    }

    // Проверяем роль пользователя из localStorage
    const userRole = localStorage.getItem('role');

    return (
        <div className="oll_sistem">
            <Sidebar />
            <div className="navbar_container">
                <div style={{
                    background: 'white',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.6vw",
                    overflowX: "auto",
                    maxWidth: "100%",
                }}>
                    <div>
                        <div className="pills-outline">
                            <button className="tab-button" onClick={() => getByStatus(2)} style={{ color: "#0D6EFD", background: "White" }}>Неверифицированные
                            </button>
                            <Link to={"/verf"}>
                                <button className="tab-button" onClick={() => getByStatus2(1)}
                                    style={{ color: "#333333", background: "#F0F0F0" }}>Верифицированные
                                </button>
                            </Link>
                            <Link to={"/deac"}>  <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }} onClick={() => getByStatus(3)}>Деактивированные</button></Link>
                        </div>
                    </div>
                    <div>
                    <div>{userEmail}</div> 
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive mt-4">
                                <Table striped bordered hover className="table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
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
                                            <th scope="col">Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users2.map((user, index) => (
                                            <tr key={user.codeid} data-codeid={user.codeid}
                                                onClick={() => getUserInfo(user.codeid, index)}>
                                                <td>{index + 1}</td>
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
                                                <td>
                                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                                        {/* Проверяем роль пользователя и скрываем кнопку для Оператора */}
                                                        {userRole !== 'Оператор' && (
                                                            <>
                                                                <Button variant="success" size="sm"
                                                                    onClick={() => handleVerify(user.codeid)}>Верифицировать</Button>
                                                                <Button variant="danger" size="sm" onClick={() => handleDeactivate(user.codeid)}>Деактивировать</Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
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
                    <Modal.Title>Введите комментарий</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSendData}>
                        Окей
                    </Button>
                    <Button variant="primary" onClick={handleDeactivateConfirm}>
                        Деактивировать
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Participants;
