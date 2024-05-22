import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

const DetailPage = () => {
    const { id } = useParams();
    const { publick, detailUsers } = UseRegister();
    const [contestDetails, setContestDetails] = useState(null);

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
            <h3 className="mb-4">Детали конкурса</h3>
            <Row>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item><span>Название конкурса:</span> {contestDetails.contest_name}</ListGroup.Item>
                        <ListGroup.Item><span>Описание конкурса:</span> {contestDetails.contest_description}</ListGroup.Item>
                        <ListGroup.Item><span>Способ закупки:</span> {contestDetails.method_purchase}</ListGroup.Item>
                        <ListGroup.Item><span>Формат закупки:</span> {contestDetails.format_purchase}</ListGroup.Item>
                        <ListGroup.Item><span>Тип закупки:</span> {contestDetails.type_purchase}</ListGroup.Item>
                        <ListGroup.Item><span>Окончание закупки:</span> {new Date(contestDetails.end_date).toLocaleDateString()}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <hr className="mt-4 mb-4" />
            <div>
                <h3>Участники</h3>
                <Row>
                    {detailUsers && detailUsers.length > 0 && detailUsers.map((detail, index) => (
                        <div key={index} >
                            {detail.users && detail.users.length > 0 && detail.users.map((user, userIndex) => (
                                <div key={userIndex}>
                                    <p><span>Название организации:</span> {user.name_organization}</p>
                                    <p><span>Имя директора:</span> {user.fio}</p>
                                    <p><span>Должность:</span> {user.position}</p>
                                 <hr />
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
