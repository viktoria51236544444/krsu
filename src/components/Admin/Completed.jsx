import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import DetailModal from "../Home/DetailModal";
import {Power} from "phosphor-react";

const Completed = () => {
    const { compled, contestFilter, updateContestStatus, getOrderDetails, count, getCounts } = UseRegister();
    const [show2, setShow2] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };


    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedContestId, setSelectedContestId] = useState(null);

    useEffect(() => {
        contestFilter(3);
        getCounts()
    }, []);

    const handleClick = (contest_id) => {
        const arheve = {
            contest_id: contest_id,
            contest_status: 5
        };
        updateContestStatus(arheve);
        handleClose2()
        getCounts()
    }

    if (!compled) {
        return <div>Loading...</div>;
    }

    const watchDetails = (codeid) => {
        getOrderDetails(codeid)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
    };

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
                            <Link to="/concurs" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики  [{count.draft_count}]</button>
                            </Link>
                            <Link to="/public" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]</button>
                            </Link>
                            <Link to="/completed" className="tab-link">
                                <button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]</button>
                            </Link>
                            <Link to="/canceled" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные [{count.deactivated_count}]</button>
                            </Link>
                            <Link to="/archive" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив  [{count.archived_count}]</button>
                            </Link>
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
                <div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive mt-4">
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
                                                <th>Окончание</th>
                                                <th>Файлы</th>
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {compled
                                                .filter(contest => contest.contest_status === 3)
                                                .map((contest, index) => (
                                                    <tr key={contest.codeid}>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{index + 1}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.contest_name}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.contest_description}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.format_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.method_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.type_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.year}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.planned_summ}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.start_date}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.formatted_end_date}</td>
                                                        <td>
                                                            {contest.files && contest.files.length > 0 && contest.files.map((file, index) => (
                                                                <div key={index} style={{
                                                                    marginRight: '10px',
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    gap: 10
                                                                }}>

                                                                    <a href={`${file.path}`} target="_blank"
                                                                       rel="noopener noreferrer" download style={{
                                                                        textDecoration: 'none',
                                                                        color: 'inherit',
                                                                        display: 'inline-block'
                                                                    }}>
                                                                        <span>{file.file_name}</span>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            <Button variant="success" size="sm" onClick={handleShow2}>В
                                                                архив</Button>
                                                        </td>
                                                        <Modal show={show2} onHide={handleClose2}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title style={{fontSize: "18px"}}>Вы действительно
                                                                    хотите добавить в архив</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Footer>
                                                                <Button variant="success" size="sm"
                                                                        onClick={() => handleClick(contest.codeid)}>Подтвердить</Button>
                                                            </Modal.Footer>

                                                        </Modal>
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
            <DetailModal show={showDetailModal} onHide={handleCloseDetails} contestId={selectedContestId}
                         winner={true}/>
        </div>
    );
}

export default Completed;
