import React, { useEffect, useState } from 'react';
import './concurs.css';
import {Button, Modal, Table} from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import {Power} from "phosphor-react";

const Deactivazion = () => {
    const { users2, getByStatus, updateUserStatus} = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    const [showModal, setShowModal] = useState('')
    const [userId, setUserId] = useState(0);

    const [comment, setComment] = useState('');
    useEffect(() => {
        getByStatus(3);
    }, []);

    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    console.log(users2)
    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        handleDeactivate()
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleDeactivate = () => {
        const data = {
            status: 1,
            comment: comment,
            userId: userId
        };

        updateUserStatus(data);
        setShowModal(false);
        setComment('');
    }

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
                            <Link to={"/participants"}><button className="tab-button" onClick={() => getByStatus(2)} style={{ color: "white", background: "#0D6EFD" }} >Неверифицированные</button></Link>
                            <Link to={"/verf"}><button className="tab-button" style={{ color: "white", background: "#198754" }} onClick={() => getByStatus(1)}  >Верифицированные</button></Link>
                            <Link to={"/deac"}>  <button style={{ color: "black", background: "#ccc" }}  className="tab-button" onClick={() => getByStatus(3)}>Деактивированные</button></Link>
                        </div>
                    </div>
                    <div style={{ display: "flex", textAlign: "center", gap: '1vw' }}>
                        <div>{userEmail}</div>
                        <Link to={"/"}>
                            <button
                                className="btn btn-danger"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Power size={16} color="#fff" />
                            </button>

                        </Link>
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
                                            <th scope="col">Причина</th>
                                            <th scope="col"> Действие</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users2 && users2.length > 0 &&  users2.map((user, index) => (
                                            user.status ===3
                                            )&&(
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
                                                <td >
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <p style={{color: 'red'}}>{user.comment}</p>
                                                    { user.files.length > 0 && (
                                                        <a   target="_blank" rel="noopener noreferrer" download href={user.files[0].path}>{user.files[0].file_name}</a>
                                                    )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <Button variant="success" onClick={()=> {handleVerify(user.codeid)}}>Активировать</Button>

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
            <Modal show={showModal} onHide={handleCloseModal} className='modalVerification'>
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
                        <Button  variant="success" size="sm" onClick={handleCloseModal}>
                            Деактивировать
                        </Button>
                    </div>  

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Deactivazion;
