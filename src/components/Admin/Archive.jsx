import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Nav, NavItem, NavLink, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { FileArrowDown } from "@phosphor-icons/react";

const Archive = () => {
    const { contestFilter, count, getCounts } = UseRegister()
    const [contestList, setContestList] = useState([]);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    useEffect(() => {
        getContestList();
        getCounts()
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

    console.log(contestList)
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
                    <div >
                        <div className="pills-outline">
                            <Link to={"/concurs"} className="tab-link" ><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики [{count.draft_count}]</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные  [{count.deactivated_count}]</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button">Архив [{count.archived_count}]</button></Link>
                        </div>

                    </div>
                    <div style={{ display: "flex", textAlign: "center", gap: '1vw' }}>
                        <div>{userEmail}</div>
                        <Link to={"/"}>
                            <Button
                                variant="primary"
                                className="rounded-circle"
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <i className="bi bi-box-arrow-right"></i>
                            </Button>

                        </Link>
                    </div>
                </div>
                <div >
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card">
                            <div className="card-body">
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
                                                    <th>{contest.contest_name}</th>
                                                    <td>{contest.contest_description}</td>
                                                    <td>{contest.start_date}</td>
                                                    <td>{contest.formatted_end_date}</td>
                                                    <td>{contest.format_purchase}</td>
                                                    <td>{contest.method_purchase}</td>
                                                    <td>{contest.type_purchase}</td>
                                                    <td>{contest.year}</td>
                                                    <th>{contest.planned_summ} сом</th>
                                                    <td>
                                                        {contest.files.length > 0 && contest.files.map((file, index) => (
                                                            <div key={index} style={{ marginRight: '10px', display: "flex", flexDirection: "row", gap: 10 }}>

                                                                <a href={file.path}  target="_blank"
                                                                   rel="noopener noreferrer" download  style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                                    <span>{file.file_name}</span>
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
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Archive;
