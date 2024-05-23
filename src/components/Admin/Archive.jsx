import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Nav, NavItem, NavLink, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UseRegister } from '../../Context/ContextProviderRegister';

const Archive = () => {
    const { contestFilter } = UseRegister()
    const [contestList, setContestList] = useState([]);

    useEffect(() => {
        getContestList();
    }, []);

    const getContestList = async () => {
        try {
            const response = await axios.get('http://212.112.105.196:3457/api/contest/getContestList');
            const contests = response.data.result.data;
            setContestList(contests);
        } catch (error) {
            console.log('Ошибка при получении списка конкурсов:', error);
        }
    };

    return (
        <div className="oll_sistem">
            <Sidebar/>
            <div className="navbar_container">
                <div style={{ background: 'white', display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6vw", }}>
                    <div >
                        <div className="pills-outline">
                            <Link to={"/concurs"} className="tab-link" ><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button">Архив</button></Link>
                        </div>

                    </div>
                    <div>
                        <div>
                            email
                        </div>
                    </div>
                </div>
                <div className="container_information_client"></div>
                <div >
                    <div className="table-responsive mt-4">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Название</th>
                                    <th>Описание</th>
                                    <th>Дата публикации</th>
                                    <th>Дата окончания</th>
                                    <th>Формат</th>
                                    <th>Метод</th>
                                    <th>Статус</th>
                                    <th>Тип</th>
                                    <th>Год</th>
                                    <th>Планируемая сумма</th>
                                    <th>Файлы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contestList.map((contest, index) => (
                                    <tr key={contest.codeid}>
                                        <td>{index + 1}</td>
                                        <td>{contest.contest_name}</td>
                                        <td>{contest.contest_description}</td>
                                        <td>{contest.start_date}</td>
                                        <td>{contest.end_date}</td>
                                        <td>{contest.format}</td>
                                        <td>{contest.method}</td>
                                        <td>{contest.status}</td>
                                        <td>{contest.type}</td>
                                        <td>{contest.year}</td>
                                        <td>{contest.planned_summ}</td>
                                        <td>
                                            {contest.files.length > 0 && contest.files.map((file, index) => (
                                                <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                                    <a href={`http://212.112.105.196:3457/${file.path}`} download={file.name} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
                                                            <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                        </svg>
                                                        <span style={{ visibility: 'hidden' }}>{file.path}</span>
                                                    </a>
                                                </div>
                                            ))}
                                        </td>




                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Archive;
