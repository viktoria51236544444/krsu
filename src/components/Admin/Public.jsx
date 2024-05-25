import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UseRegister } from '../../Context/ContextProviderRegister';
import {FileArrowDown} from "@phosphor-icons/react";

const Public = () => {
    const { compled, contestFilter, updateContestStatus, getOrderDetails } = UseRegister();
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [selectedContestId, setSelectedContestId] = useState(null);

    useEffect(() => {
        contestFilter(2);
    }, []);

    const handlePublish = async (contestId) => {
        const publicData = {
            contest_id: contestId,
            contest_status: 3,
            comment: ""
        };

        try {
            await updateContestStatus(publicData);
            contestFilter(3);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePublish2 = async (contestId) => {
        setSelectedContestId(contestId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReason('');
    };

    const handleConfirmDeactivation = async () => {
        if (reason.trim() === '') {
            alert('Введите причину деактивации');
            return;
        }

        const publicData = {
            contest_id: selectedContestId,
            contest_status: 4,
            comment: reason
        };

        try {
            await updateContestStatus(publicData);
            contestFilter();
            setShowModal(false);
            setReason('');
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!compled) {
        return <div>Loading...</div>;
    }

    return (
        <div className="oll_sistem" style={{ maxWidth: "100vw" }}>
            <Sidebar />
            <div className="navbar_container">
                <div style={{ background: 'white', display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6vw" }}>
                    <div>
                        <div className="pills-outline">
                            <Link to={"/concurs"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив</button></Link>
                        </div>
                    </div>
                    <div>
                        <div>
                            admin@gmail.com
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive mt-4" style={{ overflowX: 'auto' }}>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Название организации</th>
                                                <th>Наименование закупки</th>
                                                <th>Формат</th>
                                                <th>Метод</th>
                                                <th>Тип</th>
                                                <th>Год</th>
                                                <th>Планируемая сумма</th>
                                                <th>Публикация</th>
                                                <th>Окончания</th>
                                                <th>Файлы</th>
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {compled
                                                .filter(contest => contest.contest_status === 2)
                                                .map((contest, index) => (
                                                    <tr key={contest.codeid}>
                                                        <td>{index + 1}</td>
                                                        <th>
                                                            <Link to={`/detail/${contest.codeid}`} onClick={() => getOrderDetails(contest.codeid)}>
                                                                {contest.contest_name}
                                                            </Link>
                                                        </th>
                                                        <td>{contest.contest_description}</td>
                                                        <td>{contest.format_purchase}</td>
                                                        <td>{contest.method_purchase}</td>
                                                        <td>{contest.type_purchase}</td>
                                                        <td>{contest.year}</td>
                                                        <th>{contest.planned_summ}</th>
                                                        <td>{contest.start_date}</td>
                                                        <td>{contest.formatted_end_date}</td>
                                                        <td>
                                                            {contest.files.length > 0 && contest.files.map((file, index) => (
                                                                <div key={index} style={{ marginRight: '10px', display: "flex", flexDirection: "row", gap: 10}}>
                                                                    <FileArrowDown size={24} color='inherit' />
                                                                    <a href={`${file.path}`} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                                        <span>{file.file_name}</span>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "0.5vw" }}>
                                                                {/* <Button variant="success" size="sm" onClick={() => handlePublish(contest.codeid)}>Завершить</Button> */}
                                                                <Button variant="danger" size="sm" onClick={() => handlePublish2(contest.codeid)}>Деактивировать</Button>
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

            {/* Modal for Deactivation */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Причина деактивации</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        placeholder="Введите причину деактивации"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" onClick={handleConfirmDeactivation} size="sm" disabled={!reason.trim()}>
                        Подтвердить деактивацию
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Public;
