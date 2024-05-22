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
                        <div className="map-image-container">
                            <img src="https://img.freepik.com/premium-vector/grey-world-map-vector-illustration-flat-design_230610-1396.jpg" alt="Карта" className="map-image" />
                        </div>
                    </Card>
                </Col>
                <Col xs={12} md={6} className="order-md-first">
                    <Card className="description-card">
                        <Card.Body>
                            <Card.Text><h6>Закупки Кыргызского национального аграрного университета им. К.И. Скрябина</h6></Card.Text>
                            <Card.Text>
                                Здесь вы найдете всю необходимую информацию о текущих закупках и тендерах, проводимых университетом. Мы стремимся к прозрачности и эффективности в процессе закупок, чтобы обеспечить нашему университету необходимое оборудование, услуги и материалы для успешной научной и учебной деятельности.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Footer/>
            </Row>
           
        </Container>
        
    );
};

export default HomePage;
