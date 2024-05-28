import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";
import { UseRegister } from '../../Context/ContextProviderRegister';

const DetailModal = ({ show, onHide, contestId, comment, winner }) => {
    const { wonContest } = UseRegister();

    const [contestDetails, setContestDetails] = useState([]);
    const [detailUsers, setDetailUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [winnerComment, setWinnerComment] = useState('');
    const [winnerName, setWinnerName] = useState([])

    console.log(detailUsers)

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setIsAdmin(userRole === 'Администратор');

        getContestDetails();
        getOrdersByContest();
    }, [contestId]);

    const getContestDetails = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/contest/getContestDetails/${contestId}`);
            if (response.status === 200) {
                const result = response.data.result.data;
                setContestDetails(result);
            } else {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getOrdersByContest = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/orders/getOrderDetails/${contestId}`);
            console.log(response)
            if (response.status === 200) {
                const result = response.data.result.data;
                setDetailUsers(result);
            } else {
                alert('Данные не найдены');
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleSelectWinner = (user) => {
        setSelectedWinner(user);
        setShowWinnerModal(true);
    };

    const handleWinnerCommentChange = (e) => {
        setWinnerComment(e.target.value);
    };

    const handleWonContest = async () => {
        try {
            await wonContest({
                user_id: selectedWinner.finalUser.user.codeid,
                contest_id: contestId,
                message: winnerComment
            });
            setShowWinnerModal(false);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "18px" }}>Детали конкурса</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid className="mt-4">
                    <Row style={{ marginLeft: "2vw" }}>
                        <Col md={6}>
                            {contestDetails.map((contest, index) => (
                                <ListGroup variant="flush" key={index} className="mb-3">
                                    <h6 className="title_text">{contest.contest_description}</h6>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                        <span style={{ color: "gray" }}
                                            className="title_text">Название организации:</span>
                                        <span style={{ fontSize: "18px" }}>{contest.contest_name}</span>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                        <span style={{ color: "gray" }} className="title_text">Номер:</span>
                                        <span
                                            style={{ fontSize: "18px" }}>{contest.codeid + contest.year + index + 1}</span>
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
                                                        {/*<CloudArrowDown size={40} color="#404040" />*/}
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
                                        <span style={{ color: "gray" }}
                                            className="title_text">Статус конкурса:</span><span
                                                style={{
                                                    fontSize: "18px",
                                                    color: contest.contest_status === 4 ? "red" : (contest.contest_status === 3 ? "green" : "black")
                                                }}>{contest.status_contest}</span>

                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "1vw", marginTop: "1vw" }}>
                                        <span style={{ color: "gray" }} className="title_text">Окончание закупки:</span>
                                        <span style={{ fontSize: "18px" }}>
                                            {new Date(contest.end_date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {comment && (
                                        <>
                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "1vw",
                                                marginTop: "1vw"
                                            }}>
                                                <span style={{ color: "gray" }}
                                                    className="title_text">Причина завершения:</span>
                                                <span style={{ fontSize: "18px", color: 'red' }}>{comment}</span>
                                            </div>
                                        </>)}
                                </ListGroup>
                            ))}
                        </Col>

                    </Row>
                    <div style={{ width: "95%", margin: '0 auto' }}>
                        <Row>
                            <h6>Участники</h6>
                            {detailUsers && detailUsers.length > 0 && (
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="card" style={{ border: 'none' }}>
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
                                                            {isAdmin && !winner && (
                                                                <th>Действия</th>
                                                            )}
                                                            {winner && (
                                                                <th>Сумма победителя</th>
                                                            )}
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
                                                                        <div key={fileIdx}><a
                                                                            href={file.path}>{file.file_name}</a></div>
                                                                    ))}
                                                                </td>

                                                                {isAdmin && !winner && (
                                                                    <td>
                                                                        <Button
                                                                            variant="primary"
                                                                            size="sm"
                                                                            onClick={() => handleSelectWinner(user)}
                                                                        >
                                                                            Назначить победителем
                                                                        </Button>
                                                                    </td>
                                                                )}

                                                                {winner && (
                                                                    <td>
                                                                        <p style={{ color: 'green' }}>{user.summ} Сом</p>
                                                                    </td>
                                                                )}
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

                    <Modal show={showWinnerModal} onHide={() => setShowWinnerModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Назначение победителя</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="winnerComment">
                                <Form.Label>Комментарий</Form.Label>
                                <Form.Control as="textarea" rows={3} value={winnerComment}
                                    onChange={handleWinnerCommentChange} />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowWinnerModal(false)}>Закрыть</Button>
                            <Button variant="primary" onClick={handleWonContest}>Назначить</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default DetailModal;
