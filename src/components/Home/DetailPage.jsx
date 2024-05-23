import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Row, Col, ListGroup} from 'react-bootstrap';
import './detailStyle.css'
import axios from "axios";
import {CloudArrowDown} from "@phosphor-icons/react";

const DetailPage = () => {
    const {id} = useParams();

    const [contestDetails, setContestDetails] = useState([])
    const [detailUsers, setDetailUsers] = useState([])

    useEffect(() => {
        getContestDetails()
        getOrdersByContest()
    }, [])


    const getContestDetails = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/contest/getContestDetails/${id}`)
            console.log(response.data.result.data[0])
            if (response.status === 200) {

                const result = response.data.result.data
                setContestDetails(result)
            } else {
                alert('Данные не найдены')
            }
        } catch (error) {
            alert("Произошла ошибка")
        }
    }

    const getOrdersByContest = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/orders/getOrderDetails/${id}`)
            console.log(response.data.result.data)

            if (response.status === 200) {
                const result = response.data.result.data
                setDetailUsers(result)
            } else {
                alert('Данные не найдены')
            }
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <Container fluid className="mt-4">
            <h4 className="mb-4">Детали конкурса</h4>
            <Row>
                <Col md={6}>
                    {contestDetails.map((contest, index) => (
                        <>
                            <ListGroup variant="flush" key={index}>
                                <ListGroup.Item><span
                                    className="title_text">Название организации:</span> {contest.contest_name}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Номер:</span> {contest.codeid + contest.year + index + 1}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Предмет закупки:</span> {contest.contest_description}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Способ закупки:</span> {contest.method_purchase}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Формат закупки:</span> {contest.format_purchase}
                                </ListGroup.Item>
                                <ListGroup.Item><span className="title_text">Тип закупки:</span> {contest.type_purchase}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Планируемая сумма:</span> {contest.planned_summ} сом</ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Статус конкурса:</span> {contest.status_contest}
                                </ListGroup.Item>
                                <ListGroup.Item><span
                                    className="title_text">Окончание закупки:</span> {new Date(contest.end_date).toLocaleDateString()}
                                </ListGroup.Item>
                            </ListGroup>

                            {contest.files.map((file, index) => (
                                <>
                                    <table className="table w-100">
                                        <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Наименование файла</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td style={{display: 'flex', gap: 10, alignItems: "center"}}>
                                                <a href={file.path} download>{file.file_name}</a>
                                                <CloudArrowDown size={28} color="#404040"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </>
                            ))}
                        </>
                    ))}
                </Col>
            </Row>
            <hr className="mt-4 mb-4"/>
            <div>
                <Row>
                    {detailUsers && detailUsers.length > 0 && detailUsers?.map((user, index) => (
                        <>
                            <div key={index}>
                                <h3>Участники</h3>
                                <div>
                                    <table className="table w-100">
                                        <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Имя участника</th>
                                            <th>Должность</th>
                                            <th>Комментарий</th>
                                            <th>Название банка</th>
                                            <th>Файлы</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{user.finalUser.user.fio}</td>
                                            <td>{user.finalUser.user.position}</td>
                                            <td>{user.cover_later}</td>
                                            <td>{user.finalUser.user.banc_name}</td>
                                            <td>{user.finalUser?.file.map((file)=>(<><a href={file.path}>{file.file_name}</a></>))}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default DetailPage;
