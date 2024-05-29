import React, {useState, useEffect} from 'react';
import {Container, Row, Col, ListGroup, Button, Modal, Form} from 'react-bootstrap';
import axios from "axios";
import {UseRegister} from '../../Context/ContextProviderRegister';
import "./detailStyle.css"
import {BsPaperclip} from "react-icons/bs";

const DetailModal = ({show, onHide, contestId, comment, winner}) => {
    const {wonContest} = UseRegister();

    const [contestDetails, setContestDetails] = useState([]);
    const [detailUsers, setDetailUsers] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedWinner, setSelectedWinner] = useState(null);
    const [showWinnerModal, setShowWinnerModal] = useState(false);
    const [winnerComment, setWinnerComment] = useState('');

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

    console.log(contestDetails, "contestDetails");

    return (
        <Modal show={show} onHide={onHide} size="xl" className='parentModal'>
            <Modal.Header closeButton className='closeModal'/>
            <Modal.Body className='parentModal__inner'>
                <Container fluid className="mt-4">
                    <Row style={{marginRight: "2vw", marginLeft: "2vw", display: "flex", gap: 40}}>
                        <Col md={6} style={{width: "98%"}}>
                            {contestDetails?.map((contest, index) => (
                                <ListGroup variant="flush" key={index} className="mb-3">
                                    <div>
                                        <span style={{color: "gray"}} className="title_text"> Предмет закупки: </span>
                                        <span className='title_descr'>{contest.contest_description}</span>
                                    </div>

                                    {/*блок после tiile*/}
                                    <div>
                                        <table style={{width: "80%", borderCollapse: "collapse"}}>
                                            <tbody>
                                            <tr>
                                                <td className="title_text">Название организации:</td>
                                                <td className='title_descr'>{contest.contest_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="title_text">Номер:</td>
                                                <td className='title_descr'>{contest.codeid + contest.year + index + 1}</td>
                                            </tr>
                                            <tr>
                                                <td className="title_text">Способ закупки:</td>
                                                <td className='title_descr'>{contest.method_purchase}</td>
                                            </tr>
                                            {contestDetails.map((contest, index) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        <td className="title_text">Формат закупки:</td>
                                                        <td className='title_descr'>{contest.format_purchase}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="title_text">Тип закупки:</td>
                                                        <td className='title_descr'>{contest.type_purchase}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="title_text">Планируемая сумма:</td>
                                                        <td className='title_descr'>{contest.planned_summ} сом</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="title_text">Статус конкурса:</td>
                                                        <td className='title_descr' style={{
                                                            color: contest.contest_status === 4 ? "red" : (contest.contest_status === 3 ? "green" : "black")
                                                        }}>{contest.status_contest}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="title_text">Окончание закупки:</td>
                                                        <td className='title_descr'>{new Date(contest.end_date).toLocaleDateString()}</td>
                                                    </tr>
                                                    {comment && (
                                                        <tr>
                                                            <td className="title_text">Причина завершения:</td>
                                                            <td className='title_descr'
                                                                style={{fontSize: "18px", color: 'red'}}>{comment}</td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/*файлы ____________________________________*/}
                                    <div className='pushBlock'>
                                        {
                                            contest?.files?.length !== 0 &&
                                            <span style={{color: "gray"}}
                                                  className="title_text">Наименование файла:</span>
                                        }
                                        {contest?.files?.map((file, idx) => (
                                            <div className="table w-100" key={idx}>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    <span>{idx + 1}.</span>
                                                    <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />

                                                    <span style={{display: 'flex', alignItems: "center"}}>
                                                        <a href={file.path} target='_blank'
                                                           download>{file.file_name}</a>
                                                        {/*<CloudArrowDown size={40} color="#404040" />*/}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </ListGroup>
                            ))}
                        </Col>

                    </Row>
                    <div style={{width: "95%", margin: '0 auto', marginLeft: "2vw"}}>
                        <Row>
                            {detailUsers && detailUsers.length > 0 && (
                                <>
                                    <h6 style={{marginLeft: "1vw"}}>Участники</h6>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="card" style={{border: 'none'}}>
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
                                                                        <>
                                                                            <div className='d-flex flex-row gap-2'>
                                                                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                                                                <a target="_blank"
                                                                                   rel="noopener noreferrer" download
                                                                                   href={file.path}>{file.file_name}</a>
                                                                            </div>
                                                                        </>
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
                                                                        <p style={{color: 'green'}}>{user.summ} Сом</p>
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
                                </>

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
                                              onChange={handleWinnerCommentChange}/>
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
    )
        ;
};

export default DetailModal;
