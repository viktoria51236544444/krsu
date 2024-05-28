import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { FileArrowDown } from "@phosphor-icons/react";
import DetailModal from "../Home/DetailModal";
import {BsPaperclip} from "react-icons/bs";

const Public = () => {
    const { compled, contestFilter, updateContestStatus, getOrderDetails, count, getCounts } = UseRegister();
    const [showModal, setShowModal] = useState(false);
    const [reason, setReason] = useState('');
    const [selectedContestId, setSelectedContestId] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    useEffect(() => {
        contestFilter(2);
        getCounts()
    }, []);
    const [addAct, setAddAct] = useState({
        fileDescription: "Протокол досрочной деактивации конкурса",
        file: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setAddAct({ ...addAct, file: files[0] });
        } else {
            setAddAct({ ...addAct, [name]: value });
        }
    };

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
        getCounts()
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReason('');
    };

    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };

    const handleConfirmDeactivation = async () => {
        if (reason.trim() === '') {
            alert('Введите причину деактивации');
            return;
        }

        const formData = new FormData();
        formData.append("fileDescription", addAct.fileDescription);
        formData.append("file", addAct.file);
        formData.append('contest_id', selectedContestId)
        formData.append('contest_status', 4)
        formData.append('comment', reason)
        try {
            await updateContestStatus(formData);
            contestFilter(4);
            setShowModal(false);
            setReason('');
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!compled) {
        return <div>Loading...</div>;
    }

    const watchDetails = (codeid) => {
        getOrderDetails(codeid)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
    };

    // Проверяем роль пользователя из localStorage
    const userRole = localStorage.getItem('role');

    return (
        <div className="oll_sistem" style={{ maxWidth: "100vw" }}>
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
                            <Link to={"/concurs"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики [{count.draft_count}]</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные [{count.deactivated_count}]</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив [{count.archived_count}]</button></Link>
                        </div>
                    </div>
                    <div>
                    <div style={{ display: "flex", textAlign: "center", gap: '1vw' }}>
                        <div>{userEmail}</div>
                        <Link to={"/"}>
                            <Button
                                variant="primary"
                                className="rounded-circle"
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                            </Button>

                        </Link>
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
                                                        <td onClick={() => watchDetails(contest.codeid)}>{index + 1}</td>
                                                        <th onClick={() => watchDetails(contest.codeid)}>{contest.contest_name}</th>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.contest_description}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.format_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.method_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.type_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.year}</td>
                                                        <th onClick={() => watchDetails(contest.codeid)}>{contest.planned_summ}</th>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.start_date}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.formatted_end_date}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>
                                                            {contest.files.length > 0 && contest.files.map((file, index) => (
                                                                <div key={index} style={{ marginRight: '10px', display: "flex", flexDirection: "row", gap: 10 }}>
                                                                  
                                                                    <a href={`${file.path}`} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                                        <span>{file.file_name}</span>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", gap: "0.5vw" }}>
                                                                <Button variant="success" size="sm">Завершить</Button>
                                                                {userRole !== 'Оператор' && (

                                                                    <Button variant="danger" size="sm" onClick={() => handlePublish2(contest.codeid)}>Деактивировать</Button>
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
            </div>
            <DetailModal show={showDetailModal} onHide={handleCloseDetails}  contestId={selectedContestId}/>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Протокол</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Control
                        as="textarea"
                        placeholder=""
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                        <Form.Group className="mb-3" controlId="files" style={{ marginTop: "1vw" }}>
                            <Form.Label style={{ display: 'block' }}>
                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                Прикрепить файлы
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleChange}
                                multiple
                                style={{ display: "none" }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDeactivation} size="sm" disabled={!reason.trim()}>
                        Даективировать
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Public;
