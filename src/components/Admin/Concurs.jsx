import React, {useState, useEffect} from 'react';
import {Accordion, Button, Form} from 'react-bootstrap';
import {UseRegister} from '../../Context/ContextProviderRegister';
import axios from 'axios';
import {Nav, NavItem, NavLink, Table} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Concurs = () => {
    const {addConcurs, spPurchase, updateContestStatus,  contestFilter} = UseRegister();
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
            const {data} = await axios.get('http://212.112.105.196:3457/api/contest/getContestList');
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
        const {name, value, files} = e.target;
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
            <div class="sidebar_container">
                <div className="sidebar" style={{
                    borderRight: '1px solid #ddd',
                    paddingRight: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    width: "15vw"
                }}>
                    <h5>КНАУ</h5>
                    <Nav className="flex-column">
                        <NavItem style={{display: "flex", alignItems: "center",}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 class="bi bi-grid-fill" viewBox="0 0 16 16">
                                <path
                                    d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/>
                            </svg>
                            <NavLink href="/concurs">Конкурсы</NavLink>
                        </NavItem>
                        <NavItem style={{display: "flex", alignItems: "center"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 class="bi bi-bounding-box-circles" viewBox="0 0 16 16">
                                <path
                                    d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2m2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2 2 0 0 1 1.437-1.437V3.937A2 2 0 0 1 12.063 2.5H3.937A2 2 0 0 1 2.5 3.937M14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                            <NavLink href="/participants">Контрагенты</NavLink>
                        </NavItem>
                        <NavItem style={{display: "flex", alignItems: "center"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                 class="bi bi-layout-text-window-reverse" viewBox="0 0 16 16">
                                <path
                                    d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5m-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"/>
                                <path
                                    d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1zM1 4v10a1 1 0 0 0 1 1h2V4zm4 0v11h9a1 1 0 0 0 1-1V4z"/>
                            </svg>
                            <NavLink href="/roles">Роли</NavLink>
                        </NavItem>

                    </Nav>

                    <div style={{marginTop: 'auto', marginBottom: '5vw', borderTop: '2px solid #ddd'}}>
                        <Link to={"/"}>
                            <svg style={{marginLeft: "2vw", marginTop: "1vw", cursor: "pointer"}}
                                 xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                      d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"/>
                                <path fill-rule="evenodd"
                                      d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                            </svg>
                        </Link>
                    </div>
                </div>

            </div>
            <div className="navbar_container">
                <div class="navbar">
                    <form class="search-counter" role="search">
                        <div class="search-counter-container" style={{justifyContent: "space-between"}}>
                            <div class="search-counter-button">
                                <Link to={"/concurs"}>
                                    <button style={{color: "blue"}}>Черновики</button>
                                </Link>
                                <Link to={"/public"}>
                                    <button>Опубликованные</button>
                                </Link>
                                <Link to="/completed">
                                    <button onClick={() => contestFilter(3)}>Завершенные</button>
                                </Link>
                                <button class="tablinks" onclick="openTab(event, 'canceled')">Отмененные</button>
                                <button class="tablinks" onclick="openTab(event, 'archive')">Архив</button>
                                <button class="tablinks" onclick="openTab(event, 'add')">Добавить нормативный правовой
                                    акт
                                </button>
                            </div>
                            <div class="user">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                     class="bi bi-person" viewBox="0 0 16 16">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                <p> @victoria@gmail.com</p>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container_information_client">

                </div>
                <div className="">
                    <svg onClick={handleShow} style={{ margin: "0.5vw" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
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

                    <div className="table-responsive">
                        <Table striped bordered hover>
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
                                                        <span style={{ visibility: 'hidden' }}>{file.path}</span>
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
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Concurs;
