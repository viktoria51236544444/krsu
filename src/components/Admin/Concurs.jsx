import React, { useState, useEffect } from 'react';
import { Accordion, Button, Form } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import axios from 'axios';
import { Nav, NavItem, NavLink, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Sidebar from './Sidebar';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Concurs = () => {
    const { addConcurs, spPurchase, updateContestStatus, contestFilter } = UseRegister();
    const [formData, setFormData] = useState({
        year: 0,
        purchase_format_id: 0,
        purchase_type_id: 0,
        purchase_method_id: 0,
        end_date: "",
        planned_summ: 0,
        contest_name: "",
        contest_description: "",
        files: [],
        start_date: '',
        contests: [],
    });

    useEffect(() => {
        getContestList();
        contestFilter()
    }, []);

    const getContestList = async () => {
        try {
            const { data } = await axios.get('http://212.112.105.196:3457/api/contest/getContestList');
            const contests = data.result.data.filter(contest => contest.status_contest === 'Черновик');
            setFormData(prevState => ({
                ...prevState,
                contests: contests
            }));
        } catch (error) {
            console.log('Ошибка при получении списка конкурсов:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name == "files") {
            setFormData(prevState => ({
                ...prevState,
                files
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSave = async () => {
        const endDate = new Date(formData.end_date);
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === 'files') {
                for (let i = 0; i < formData.files.length; i++) {
                    formDataToSend.append('files', formData.files[i])
                }
            } else if (key === 'end_date') {
                formDataToSend.append('end_date', endDate.toISOString());
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            await addConcurs(formDataToSend);
            console.log('Данные успешно отправлены на сервер!');
            getContestList();
            resetForm();
        } catch (error) {
            console.log('Ошибка при отправке данных на сервер:', error.message);
        }
    };

    const handlePublish = async (contestId) => {
        const publicData = {
            contest_id: contestId,
            contest_status: 2
        };

        try {
            await updateContestStatus(publicData);
            console.log(`Конкурс с ID ${contestId} успешно опубликован!`);
            getContestList();
            resetForm();
        } catch (error) {
            console.log('Ошибка при публикации конкурса:', error.message);
        }
    };

    const resetForm = () => {
        setFormData({
            year: 0,
            purchase_format_id: 0,
            purchase_type_id: 0,
            purchase_method_id: 0,
            end_date: "",
            start_date: '',
            contest_name: "",
            planned_summ: 0,
            contest_description: "",
            files: [],
            contests: formData.contests
        });
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className="oll_sistem">
            <Sidebar />
            <div className="navbar_container">
                <div style={{ background: 'white', display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6vw", }}>
                    <div >
                        <div className="pills-outline">
                            <Link to={"/concurs"} className="tab-link" ><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button">Черновики</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив</button></Link>
                        </div>

                    </div>
                    <div>
                        <div>
                            email
                        </div>
                    </div>
                </div>
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"  >
                    <div class="card"  >
                        <div class="card-header" style={{background: "white"}}> <svg onClick={handleShow} style={{ margin: "0.5vw" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg></div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered first">
                                    <thead>
                                        <tr>
                                            <th>Название организации</th>
                                            <th>Наименование закупки</th>
                                            <th>Формат</th>
                                            <th>Метод</th>
                                            <th>Тип </th>
                                            <th>Год</th>
                                            <th>Планируемая сумма</th>
                                            <th>Публикация</th>
                                            <th>Окончания</th>
                                            <th>Файлы</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.contests && formData.contests.map(contest => (

                                            <tr key={contest.codeid}>

                                                <td>{contest.contest_name}</td>
                                                <td>{contest.contest_description}</td>
                                                <td>{contest.format_purchase}</td>
                                                <td>{contest.method_purchase}</td>
                                                <td>{contest.type_purchase}</td>
                                                <td>{contest.year}</td>
                                                <td>{contest.planned_summ}</td>
                                                <td>{contest.start_date}</td>
                                                <td>{contest.formatted_end_date}</td>
                                                <td>
                                                    {contest.files.length > 0 && contest.files.map((file, index) => (
                                                        <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                                                            <a href={`http://212.112.105.196:3457/${file.path}`} download={file.name} style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16" style={{ cursor: 'pointer' }}>
                                                                    <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                                                                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                                </svg>
                                                                <span >{file.path}</span>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                        <Button variant="primary" size="small" onClick={() => handlePublish(contest.codeid)}>Опубликовать</Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} className="custom-modal" style={{ marginTop: "8vw" }}>
                    <Form style={{ padding: '1vw' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Group className="mb-3" controlId="year">
                                    <Form.Label>Год</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Год"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="planned_summ">
                                    <Form.Label>Планируемая сумма</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="сумма"
                                        name="planned_summ"
                                        value={formData.planned_summ}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="purchaseFormat">
                                    <Form.Select
                                        name="purchase_format_id"
                                        value={formData.purchase_format_id}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Выберите формат закупок</option>
                                        {spPurchase?.format &&
                                            Object.keys(spPurchase.format).map((key) => (
                                                <option key={key} value={spPurchase.format[key].codeid}>
                                                    {spPurchase.format[key].format_purchase}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="purchaseMethod">
                                    <Form.Select
                                        name="purchase_method_id"
                                        value={formData.purchase_method_id}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Выберите метод закупки</option>
                                        {spPurchase?.method &&
                                            Object.keys(spPurchase.method).map((key) => (
                                                <option key={key} value={spPurchase.method[key].codeid}>
                                                    {spPurchase.method[key].method_purchase}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Срок окончания (дата, время)</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="end_date"
                                        value={
                                            formData.end_date instanceof Date
                                                ? `${formData.end_date.toISOString().slice(0, 16)}`
                                                : new Date().toISOString().slice(0, 16)
                                        }
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="purchaseType">
                                    <Form.Select
                                        name="purchase_type_id"
                                        value={formData.purchase_type_id}
                                        onChange={handleChange}
                                    >
                                        <option value={0}>Выберите тип закупки</option>
                                        {spPurchase?.type &&
                                            Object.keys(spPurchase.type).map((key) => (
                                                <option key={key} value={spPurchase.type[key].codeid}>
                                                    {spPurchase.type[key].type_purchase}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="contestName">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Название организации"
                                        name="contest_name"
                                        value={formData.contest_name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <Form.Group className="mb-4" controlId="contestDescription">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Наименование закупки"
                                name="contest_description"
                                value={formData.contest_description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="files">
                            <Form.Control
                                type="file"
                                name="files"
                                multiple
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <div className="text-end">
                            <Button variant="primary" onClick={handleSave}>
                                Сохранить
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
        </div>

    );
}

export default Concurs;
