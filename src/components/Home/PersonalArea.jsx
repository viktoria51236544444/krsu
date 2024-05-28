import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from './Footer';

const PersonalArea = () => {
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        const loadUserInfoFromLocalStorage = () => {
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfos(storedUserInfo);
            }
        };

        loadUserInfoFromLocalStorage();
    }, []);

    if (userInfos.length === 0) {
        return (
            <Container className="personal-area-container" style={{ marginTop: '20px' }}>
                <Card>
                    <Card.Body className="text-center">
                        <p style={{ color: '#666', fontSize: '18px' }}>Данные о пользователе не найдены.</p>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="personal-area-container" style={{ marginTop: '20px',  }}>
            {userInfos.map((userInfo, index) => (
                <Card key={index} className="mb-3" style={{border: "none"}}>
                    <Card.Body>
                        <Row>
                            <Col md={6}>
                                <p className="info-title"><strong>ФИО:</strong></p>
                                <p>{userInfo.fio}</p>
                                <p className="info-title"><strong>Электронная почта:</strong></p>
                                <p>{userInfo.email}</p>
                                <p className="info-title"><strong>ИНН:</strong></p>
                                <p>{userInfo.inn}</p>
                                <p className="info-title"><strong>Организация:</strong></p>
                                <p>{userInfo.name_organization}</p>
                                <p className="info-title"><strong>Тип организации:</strong></p>
                                <p>{userInfo.type_organization}</p>
                                <p className="info-title"><strong>Позиция:</strong></p>
                                <p>{userInfo.position}</p>
                                <p className="info-title"><strong>Статус:</strong></p>
                                <p style={{ color: '#06d200' }}>{userInfo.status_name}</p>
                            </Col>
                            <Col md={6}>
                                <p className="info-title"><strong>Электронная почта менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_email}</p>
                                <p className="info-title"><strong>ФИО менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_fio}</p>
                                <p className="info-title"><strong>Номер телефона менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_phone_number}</p>
                                <p className="info-title"><strong>Рабочий номер телефона:</strong></p>
                                <p>{userInfo.manager_work_phone_number}</p>
                                <p className="info-title"><strong>Адрес:</strong></p>
                                <p>{userInfo.address}</p>
                                <p className="info-title"><strong>Фактический адрес:</strong></p>
                                <p>{userInfo.fact_address}</p>
                                <p className="info-title"><strong>Название банка:</strong></p>
                                <p>{userInfo.banc_name}</p>
                                <p className="info-title"><strong>БИК:</strong></p>
                                <p>{userInfo.bik}</p>
                                <p className="info-title"><strong>Депозитный счет:</strong></p>
                                <p>{userInfo.deposit_account}</p>
                                <p className="info-title"><strong>ПИН менеджера:</strong></p>
                                <p>{userInfo.pin_manager}</p>
                                <p className="info-title"><strong>Юридический адрес:</strong></p>
                                <p>{userInfo.ur_address}</p>
                                {userInfo.web_site && (
                                    <>
                                        <p className="info-title"><strong>Веб-сайт:</strong></p>
                                        <p>{userInfo.web_site}</p>
                                    </>
                                )}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default PersonalArea;
