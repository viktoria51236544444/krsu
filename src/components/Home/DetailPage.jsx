import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";
import { CloudArrowDown } from "@phosphor-icons/react";
import { UseRegister } from '../../Context/ContextProviderRegister';
import DetailModal from "./DetailModal";
import { API } from '../../helpers/const';

const DetailPage = () => {
    const { id } = useParams();
    const { wonContest } = UseRegister();

    const [contestDetails, setContestDetails] = useState([]);
    const [detailUsers, setDetailUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [winnerComment, setWinnerComment] = useState('');

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setIsAdmin(userRole === 'Администратор');

        getContestDetails();
        getOrdersByContest();
    }, []);

    const getContestDetails = async () => {
        try {
            const response = await axios.get(`${API}api/contest/getContestDetails/${id}`);
            if (response.status === 200) {
                const result = response.data.result.data;
                setContestDetails(result);
            } else {
                alert('Данные не найдены');
            }
        } catch (error) {
            alert("Произошла ошибка");
        }
    };

    const getOrdersByContest = async () => {
        try {
            const response = await axios.get(`${API}api/orders/getOrderDetails/${id}`);
            if (response.status === 200) {
                const result = response.data.result.data;
                setDetailUsers(result);
            } else {
                alert('Данные не найдены');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const handleSelectWinner = (user) => {
        setSelectedWinner(user);
        setShowModal(true);
    };

    const handleWinnerCommentChange = (e) => {
        setWinnerComment(e.target.value);
    };

    const handleWonContest = async () => {
        try {
            await wonContest({
                user_id: selectedWinner.finalUser.user.codeid,
                contest_id: id,
                message: winnerComment
            });
            alert('Победитель назначен успешно!');
            setShowModal(false);
        } catch (error) {
            alert('Произошла ошибка при назначении победителя');
        }
    };

    return (
        <Container fluid className="mt-4">

            <Row style={{marginLeft: "2vw"}}>
                <Col md={6} >
                    {contestDetails.map((contest, index) => (
                        <ListGroup variant="flush" key={index} className="mb-3">
                            <h4 className="title_text">{contest.contest_description}</h4>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Название организации:</span>
                                <span style={{ fontSize: "18px" }}>{contest.contest_name}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Номер:</span>
                                <span style={{ fontSize: "18px" }}>{contest.codeid + contest.year + index + 1}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Способ закупки:</span>
                                <span style={{ fontSize: "18px" }}>{contest.method_purchase}</span>
                            </div>
                            <div style={{ color: "gray", marginTop: "1vw" }}>
                                <p>Наименование файла</p>
                                {contest.files.map((file, idx) => (
                                    <div className="table w-100" key={idx}>

                                        <div style={{ display: "flex", alignItems: "center" }}>

                                            <span>{idx + 1}.</span>
                                            <span style={{ display: 'flex', gap: 10, alignItems: "center" }}>
                                                <a href={file.path} download>{file.file_name}</a>
                                                <CloudArrowDown size={40} color="#404040" />
                                            </span>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ListGroup>
                    ))}
                </Col>
                <Col md={6}>
                    {contestDetails.map((contest, index) => (
                        <ListGroup variant="flush" key={index} className="mb-3">
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Формат закупки:</span>
                                <span style={{ fontSize: "18px" }}>{contest.format_purchase}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Тип закупки:</span>
                                <span style={{ fontSize: "18px" }}>{contest.type_purchase}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Планируемая сумма:</span>
                                <span style={{ fontSize: "18px" }}>{contest.planned_summ} сом</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Статус конкурса:</span>
                                <span style={{ fontSize: "18px" }}>{contest.status_contest}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                <span style={{ color: "gray" }} className="title_text">Окончание закупки:</span>
                                <span style={{ fontSize: "18px" }}>{new Date(contest.end_date).toLocaleDateString()}</span>
                            </div>
                        </ListGroup>
                    ))}
                </Col>
            </Row>


            <div style={{width: "96vw", marginLeft: "2vw" }}>
                <Row>
                    <h3>Участники</h3>
                    {detailUsers && detailUsers.length > 0 && (
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">

                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-bordered first w-100">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Имя участника</th>
                                                    <th>Должность</th>
                                                    <th>Мотивационное письмо</th>
                                                    <th>Название банка</th>
                                                    <th>Файлы</th>
                                                    <th>Действия</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailUsers.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.finalUser.user.fio}</td>
                                                        <td>{user.finalUser.user.position}</td>
                                                        <td>{user.cover_later}</td>
                                                        <td>{user.finalUser.user.banc_name}</td>
                                                        <td>
                                                            {user.finalUser?.file.map((file, fileIdx) => (
                                                                <div key={fileIdx}><a href={file.path}>{file.file_name}</a></div>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {isAdmin && (
                                                                <Button variant="primary" size="sm" onClick={() => handleSelectWinner(user)}>Назначить победителем</Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Row>
            </div>


            <Modal backdrop="static" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Назначение победителя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="winnerComment">
                        <Form.Label>Комментарий</Form.Label>
                        <Form.Control as="textarea" rows={3} value={winnerComment} onChange={handleWinnerCommentChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Закрыть</Button>
                    <Button variant="primary" onClick={handleWonContest}>Назначить</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
};

export default DetailPage;
