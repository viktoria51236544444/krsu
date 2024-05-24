import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import './detailStyle.css'
import axios from "axios";
import { CloudArrowDown } from "@phosphor-icons/react";

const DetailPage = () => {
    const { id } = useParams();

    const [contestDetails, setContestDetails] = useState([]);
    const [detailUsers, setDetailUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userRole = localStorage.getItem('role');
        setIsAdmin(userRole === 'Администратор');

        getContestDetails();
        getOrdersByContest();
    }, []);

    const getContestDetails = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/contest/getContestDetails/${id}`);
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
            const response = await axios.get(`http://212.112.105.196:3457/api/orders/getOrderDetails/${id}`);
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

    const handleSelectWinner = () => {
        alert('Selecting winner...');
    };

    return (
        <Container fluid className="mt-4">
            <h4 className="mb-4">Детали конкурса</h4>
            <Row>
                <Col md={6}>
                    {contestDetails.map((contest, index) => (
                        <ListGroup variant="flush" key={index}>
                            <ListGroup.Item><span className="title_text">Название организации:</span> {contest.contest_name}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Номер:</span> {contest.codeid + contest.year + index + 1}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Предмет закупки:</span> {contest.contest_description}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Способ закупки:</span> {contest.method_purchase}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Формат закупки:</span> {contest.format_purchase}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Тип закупки:</span> {contest.type_purchase}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Планируемая сумма:</span> {contest.planned_summ} сом</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Статус конкурса:</span> {contest.status_contest}</ListGroup.Item>
                            <ListGroup.Item><span className="title_text">Окончание закупки:</span> {new Date(contest.end_date).toLocaleDateString()}</ListGroup.Item>
                            {contest.files.map((file, idx) => (
                                <table className="table w-100" key={idx}>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Наименование файла</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td style={{ display: 'flex', gap: 10, alignItems: "center" }}>
                                                <a href={file.path} download>{file.file_name}</a>
                                                <CloudArrowDown size={28} color="#404040" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            ))}
                        </ListGroup>
                    ))}
                </Col>
            </Row>
            <hr className="mt-4 mb-4" />
            <div>
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
                                                                <Button variant="primary"size="sm"  onClick={handleSelectWinner}>Назначить победителем</Button>
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


        </Container>
    );
};

export default DetailPage;
