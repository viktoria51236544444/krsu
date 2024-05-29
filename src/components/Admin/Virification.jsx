import React, {useEffect, useState} from 'react';
import './concurs.css';
import {Button, Table, Modal} from 'react-bootstrap';
import {UseRegister} from '../../Context/ContextProviderRegister';
import Sidebar from './Sidebar';
import {Link} from 'react-router-dom';
import {Power} from "phosphor-react";
import {BsPaperclip} from "react-icons/bs";


const Virification = () => {
    const {users3, getByStatus2, updateUserStatus, getByStatus, diactiveContest} = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    const [userId, setUserId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');

    useEffect(() => {
        getByStatus2(1);
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        handleDeactivate()
    }

    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowModal(true);
    }

    const handleDeactivate = () => {
        const data = {
            status: 3,
            comment: comment,
            userId: userId
        };
        diactiveContest(data);
        getByStatus2();
        setShowModal(false);
        setComment('');
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    if (!users3) {
        return <div>Loading...</div>;
    }


    const userRole = localStorage.getItem('role');

    return (
        <div className="oll_sistem">
            <Sidebar/>
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
                            <Link to={"/participants"}>
                                <button className="tab-button" onClick={() => getByStatus(2)}
                                        style={{ color: "#333333", background: "#F0F0F0" }}>Не верифицированные
                                </button>
                            </Link>
                            <Link to={"/verf"}>
                                <button className="tab-button" onClick={() => getByStatus2(1)}
                                        style={{ color: "#0D6EFD", background: "White" }}>Верифицированные
                                </button>
                            </Link>
                            <Link to={"/deac"}>
                                <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}
                                        onClick={() => getByStatus(3)}>Деактивированные
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "flex",
                            textAlign: "center",
                            gap: '10px',
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div>{userEmail}</div>
                            <Link to={"/"}>
                                <button
                                    className="btn"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'transparent'
                                    }}
                                >
                                    <Power size={30} color="red" />
                                </button>

                            </Link>
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
                                        <th scope='col'>Файлы</th>
                                        <th scope='col'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users3.map((user, index) => (
                                        <tr key={index}>
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
                                                <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                                                    {user.files.length > 0 && user.files.map((file, index) => (
                                                        <>
                                                            <div className='d-flex flex-row gap-2'>
                                                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                                            <a target="_blank" rel="noopener noreferrer" download
                                                               href={file.path}>{file.file_name}</a>
                                                            </div>
                                                        </>
                                                    ))}
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                                                    {userRole !== 'Оператор' && (
                                                        <Button variant="danger" size="sm"
                                                                onClick={() => handleVerify(user.codeid)}>Деактивировать</Button>
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
                    <Modal.Title style={{fontSize: "18px"}}>Протокол</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder='заключение'
                        style={{height: 250}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: '0 20px',
                        width: '100%'
                    }}>
                        <p>(будет отправлен на почту)</p>
                        <Button variant="danger" size="sm" onClick={handleCloseModal}>
                            Деактивировать
                        </Button>
                    </div>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Virification;
