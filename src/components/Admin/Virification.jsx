import React, { useEffect, useState } from 'react';
import './concurs.css';
import { Button, Table } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

const Virification = () => {
    const { users3, getByStatus2 } = UseRegister();

    const [userId, setUserId] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }


    useEffect(() => {
        getByStatus2(1);
    }, []);

    if (!users3) {
        return <div>Loading...</div>;
    }



    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowModal(true);
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
                            <Link to={"/participants"}><button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }} >Неверифицированные</button></Link>
                            <Link to={"/verf"}><button className="tab-button" onClick={() => getByStatus2(1)} style={{ color: "#0D6EFD", background: "White" }} >Верифицированные</button></Link>
                            <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Деактивированные</button>
                        </div>
                    </div>
                    <div>
                        <div>admin@gmail.com</div>
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
                                                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                                        <Button variant="danger" size="sm" onClick={handleVerify}>Деактивировать</Button>
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
        </div>
    );
}

export default Virification;
