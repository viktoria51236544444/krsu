import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import './detailStyle.css'

const DetailPage = () => {
    const { id } = useParams();
    const { publick, detailUsers } = UseRegister();
    const [contestDetails, setContestDetails] = useState(null);

    console.log(contestDetails)
    useEffect(() => {
        if (publick && publick.length > 0) {
            const contest = publick.find(item => item.codeid.toString() === id);
            setContestDetails(contest);
        }
    }, [id, publick]);

    if (!contestDetails) {
        return <div className="container">Loading...</div>;
    }

    return (
        <Container fluid className="mt-4">
            <h4 className="mb-4">Детали конкурса</h4>
            <Row>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><span className="title_text">Название организации:</span> {contestDetails.contest_name}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Предмет закупки:</span> {contestDetails.contest_description}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Способ закупки:</span> {contestDetails.method_purchase}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Формат закупки:</span> {contestDetails.format_purchase}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Тип закупки:</span> {contestDetails.type_purchase}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Планируемая сумма:</span> {contestDetails.planned_summ} сом</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Статус конкурса:</span> {contestDetails.status_contest}</ListGroup.Item>
                        <ListGroup.Item><span className="title_text">Окончание закупки:</span> {new Date(contestDetails.end_date).toLocaleDateString()}</ListGroup.Item>
                        
                    </ListGroup>
                </Col>
            </Row>
            <hr className="mt-4 mb-4" />
            <div>
                <Row>
                    {detailUsers && detailUsers.length > 0 && detailUsers.map((detail, index) => (
                        <div key={index}>
                            <h3>Участники</h3>
                            {detail.users && detail.users.length > 0 && detail.users.map((user, userIndex) => (
                                <div key={userIndex}>
                                    <p><span>Название организации:</span> {user.name_organization}</p>
                                    <p><span>Имя директора:</span> {user.fio}</p>
                                    <p><span>Должность:</span> {user.position}</p>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default DetailPage;
