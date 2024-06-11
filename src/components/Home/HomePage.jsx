import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './homePage.css';
import Footer from './Footer';

const HomePage = () => {
    return (
        <Container className="home-container">
            <Row className="justify-content-start align-items-start text-center">
                <Col>
                    <h1 className="home-title">Добро пожаловать на портал Закупок КНАУ им. К.И. Скрябина!</h1>
                </Col>
            </Row>
            <Row className="justify-content-center align-items-center text-center">
                <Col xs={12} md={6} className="order-md-last">
                    <Card className="map-card">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78694.71539150541!2d74.48373497128125!3d42.862081595046654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb6301e663e2d%3A0x623be3ff09d65a63!2z0JrRi9GA0LPRi9C30YHQutC40Lkg0L3QsNGG0LjQvtC90LDQu9GM0L3Ri9C5INCw0LPRgNCw0YDQvdGL0Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgg!5e0!3m2!1sru!2skg!4v1716933453453!5m2!1sru!2skg"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Card>
                </Col>
                <Col xs={12} md={6} className="order-md-first">
                    <Card className="description-card">
                        <Card.Body>
                            <Card.Text>
                                <h6>Закупки Кыргызского национального аграрного университета им. К.И. Скрябина</h6>
                            </Card.Text>
                            <Card.Text className='cardtext-p'>
                                Здесь вы найдете всю необходимую информацию о текущих закупках и тендерах, проводимых университетом. Мы стремимся к прозрачности и эффективности в процессе закупок, чтобы обеспечить нашему университету необходимое оборудование, услуги и материалы для успешной научной и учебной деятельности.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
