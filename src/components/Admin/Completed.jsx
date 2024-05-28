import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Completed = () => {
    const { compled, contestFilter, updateContestStatus } = UseRegister();
    const [show2, setShow2] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString); 
        }
    }, []);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    useEffect(() => {
        contestFilter(3);
    }, []);

    const handleClick = (contest_id) => {
        const arheve = {
            contest_id: contest_id,
            contest_status: 5
        };
        handleClose2()
        updateContestStatus(arheve);
    }

    if (!compled) {
        return <div>Loading...</div>;
    }

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
                    <div>
                        <div className="pills-outline">
                            <Link to="/concurs" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики</button>
                            </Link>
                            <Link to="/public" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные</button>
                            </Link>
                            <Link to="/completed" className="tab-link">
                                <button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные</button>
                            </Link>
                            <Link to="/canceled" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные</button>
                            </Link>
                            <Link to="/archive" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив</button>
                            </Link>
                        </div>
                    </div>
                    <div>{userEmail}</div> 
                </div>
                <div>
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
                                                {/*<th>Файлы</th>*/}
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {compled
                                                .filter(contest => contest.contest_status === 3)
                                                .map((contest, index) => (
                                                    <tr key={contest.codeid}>
                                                        <td>{index + 1}</td>
                                                        <td>{contest.contest_name}</td>
                                                        <td>{contest.contest_description}</td>
                                                        <td>{contest.format_purchase}</td>
                                                        <td>{contest.method_purchase}</td>
                                                        <td>{contest.type_purchase}</td>
                                                        <td>{contest.year}</td>
                                                        <td>{contest.planned_summ}</td>
                                                        <td>{contest.start_date}</td>
                                                        <td>{contest.formatted_end_date}</td>
                                                        {/*<td>*/}
                                                        {/*    {contest.files.length > 0 && contest.files.map((file, index) => (*/}
                                                        {/*        <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>*/}
                                                        {/*            <a href={`${file.path}`} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>*/}
                                                        {/*                <span>{file.file_name}</span>*/}
                                                        {/*            </a>*/}
                                                        {/*        </div>*/}
                                                        {/*    ))}*/}
                                                        {/*</td>*/}
                                                        <td>
                                                            <Button variant="success" size="sm"  onClick={handleShow2}>В архив</Button>
                                                        </td>
                                                        <Modal show={show2} onHide={handleClose2}>
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Подтверждение</Modal.Title>
                                                            </Modal.Header>

                                                            <Modal.Body>Добавить в архив?</Modal.Body>
                                                            <Modal.Footer>
                                                                <Button variant="primary"
                                                                    onClick={() => handleClick(contest.codeid)} >Да</Button>
                                                            </Modal.Footer>

                                                        </Modal>
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
        </div>
    );
}

export default Completed;
