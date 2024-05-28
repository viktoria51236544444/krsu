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
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
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
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseVerifyModal = () => {
        setShowVerifyModal(false);
    }

    const handleCloseDeactivateModal = () => {
        setShowDeactivateModal(false);
    }

    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowVerifyModal(true);
    }

    const handleSendVerifyData = () => {
        const data = {
            status: 1,
            comment: comment,
            userId: userId
        };
        updateUserStatus(data);
        getByStatus();
        setShowVerifyModal(false);
        setComment('');
    }

    const handleDeactivate = (codeId) => {
        setUserId(codeId);
        setShowDeactivateModal(true);
    }

    const handleSendDeactivateData = () => {
        const data = {
            status: 3,
            comment: comment,
            userId: userId
        };
        updateUserStatus(data);
        getByStatus2();
        setShowDeactivateModal(false);
        setComment('');
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    if (!users2) {
        return <div>Loading...</div>;
    }

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
                                            user.status === 2 && (
                                                <tr key={user.codeid} data-codeid={user.codeid} onClick={() => getUserInfo(user.codeid, index)}>
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
                                                            {userRole !== 'Оператор' && (
                                                                <>
                                                                    <Button variant="success" size="sm" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleVerify(user.codeid);
                                                                    }}>Верифицировать</Button>
                                                                    <Button variant="danger" size="sm" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeactivate(user.codeid);
                                                                    }}>Деактивировать</Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>


                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showVerifyModal} onHide={handleCloseVerifyModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Подтверждение (будет отправлено на почту)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder='письмо контрагенту'
                    />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="success" size='sm' onClick={handleSendVerifyData}>
                        Верифицировать
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeactivateModal} onHide={handleCloseDeactivateModal}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Протокол (будет отправлен на почту)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder='заключение'
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={handleSendDeactivateData}>
                        Деактивировать
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Participants;
