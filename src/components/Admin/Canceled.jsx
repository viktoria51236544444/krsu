import React, { useEffect, useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Nav, NavItem, NavLink, Table, Modal } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import { FileArrowDown } from "@phosphor-icons/react";
import DetailModal from "../Home/DetailModal";
import {Power} from "phosphor-react";
import {BsPaperclip} from "react-icons/bs";

const Canceled = () => {
    const { compled, contestFilter, updateContestStatus, getOrderDetails, count, getCounts } = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    const [finalContestModal, setFinalContestModal] = useState(false);
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);
    const [show2, setShow2] = useState(false);
    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };

    const  handleCloseFinalModal = () => {
        setFinalContestModal(false)
    }

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedContestId, setSelectedContestId] = useState(null);
    useEffect(() => {
        contestFilter(4);
        getCounts()
    }, []);

    const handleClick = () => {
        const arheve = {
            contest_id: selectedId,
            contest_status: 5
        };
        updateContestStatus(arheve);
        getCounts()
        contestFilter(4)
    }

    const [selectedId, setSelectedId] = useState(null)
    const handleAcrhive = (codeid) => {
        setSelectedId(codeid)
       setFinalContestModal(true)
    }
    const [comment, setComment] = useState('')
    const watchDetails = (codeid, comment) => {
        getOrderDetails(codeid)
        setComment(comment)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
    }
    const navigate = useNavigate()
    const signout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти из аккаунта?");
        if (confirmed) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('codeid');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('role');
            console.log('User signed out');
            navigate('/');
        }
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
                    <div >
                        <div className="pills-outline">
                            <Link to={"/concurs"} className="tab-link" ><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики [{count.draft_count}]</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные [{count.deactivated_count}]</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив [{count.archived_count}]</button></Link>
                        </div>

                    </div>
                    <div style={{ display: "flex", textAlign: "center", gap: '10px', justifyContent: "center", alignItems: "center" }}>
                        <div>{userEmail}</div>
                            <button
                                onClick={signout}
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
                    </div>
                </div>
                <div >
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
                                                <th>Протокол</th>
                                                <th>Действия</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        { compled && compled
                                            .filter(contest => {
                                                console.log('Contest:', contest);
                                                return contest.contest_status === 4;
                                            })
                                                .map((contest, index) => (
                                                    <tr key={contest.codeid}>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{index + 1}</td>
                                                        <th onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.contest_name}</th>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.contest_description}</td>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.format_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.method_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.type_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.year}</td>
                                                        <th onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.planned_summ}</th>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.start_date}</td>
                                                        <td onClick={() => watchDetails(contest.codeid, contest.coment)}>{contest.formatted_end_date}</td>
                                                        <td>
                                                            {contest.files.length > 0 && contest.files.map((file, index) => (
                                                                <div key={index} style={{
                                                                    marginRight: '10px',
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    gap: 10
                                                                }}>
                                                                    <div className='d-flex flex-row gap-2'>
                                                                        <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                                                        <a target="_blank" rel="noopener noreferrer"
                                                                           download
                                                                           href={file.path}>{file.file_name}</a>
                                                                    </div>
                                                                </div>
                                                            ))}

                                                        </td>
                                                        <td style={{color: "#dc3545"}}>{contest.coment}</td>
                                                        <td>
                                                            <Button variant="success" size="sm"
                                                                    onClick={() => handleAcrhive(contest.codeid)}
                                                                    style={{width: 70}}>В архив</Button>
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

            <DetailModal show={showDetailModal} onHide={handleCloseDetails} contestId={selectedContestId}
                         comment={comment}/>

            <Modal backdrop="static" show={finalContestModal} onHide={handleCloseFinalModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Подтверждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Вы действительно хотите сохранить конкурс а архиве?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClick} size="sm" >
                        Архивировать
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}




export default Canceled
