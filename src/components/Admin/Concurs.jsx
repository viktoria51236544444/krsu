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
import { FileArrowDown, FileX, PencilSimpleLine } from "@phosphor-icons/react";
import { BsPaperclip } from 'react-icons/bs';
import {Power} from "phosphor-react";

const Concurs = () => {
    const { addConcurs, spPurchase, updateContestStatus, contestFilter, count, getCounts } = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);
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
        fileNames: [],
        start_date: '',
        contests: [],
    });

    useEffect(() => {
        getContestList();
        getCounts()
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
        if (name === "files") {
            const fileNames = Array.from(files).map(file => file.name);
            setFormData(prevState => ({
                ...prevState,
                files,
                fileNames
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleChangeUpdateDate = (e) => {
        const { name, value, files } = e.target;
        if (name === "files") {
            const fileList = Array.from(files);
            setUpdateFormData(prevState => ({
                ...prevState,
                files: fileList
            }));
        } else {
            setUpdateFormData(prevState => ({
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
            setShow(false)
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
        handleClose2()
        try {
            await updateContestStatus(publicData);
            console.log(`Конкурс с ID ${contestId} успешно опубликован!`);
            getContestList();
            resetForm();
            getCounts()
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
    const [updateModal, setUpdateModal] = useState(false);
    const [closeModal, setCloseModal] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const closeUpdateModal = () => setUpdateModal(false)
    const closeModalHide = () => setCloseModal(false)
    const [show2, setShow2] = useState(false);
    console.log(show2);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [updateFormData, setUpdateFormData] = useState({
        codeid: 0,
        contest_description: '',
        contest_name: '',
        end_date: '',
        files: [],
        purchase_format_id: 1,
        purchase_method_id: 1,
        planned_summ: 0,
        purchase_type_id: 1,
        year: 2024,
        deleted_files: []
    })

    const onRemove = (index) => {
        const updatedFiles = [...updateFormData.files];
        const removedFile = updatedFiles.splice(index, 1)[0];
        setUpdateFormData(prevState => {
            const deletedFiles = Array.isArray(prevState.deleted_files) ? prevState.deleted_files : [];
            return {
                ...prevState,
                files: updatedFiles,
                deleted_files: [...deletedFiles, removedFile.codeid]
            };
        });
    };


    const onRemove2 = (index) => {
        const updated = [...formData.files];
        const updatedFileName = [...formData.fileNames]
        updated.splice(index, 1);
        updatedFileName.splice(index, 1);

        setFormData(prevState => ({
            ...prevState,
            files: updated,
            fileNames: updatedFileName
        }));
    };



    const handleOpenModal = async (codeid) => {
        setUpdateModal(true)
        const response = await axios.get(`http://212.112.105.196:3457/api/contest/getContestDetails/${codeid}`)

        if (response.status === 200) {
            const data = response.data.result.data[0]
            setUpdateFormData(data)
        } else {
            alert('Произошла ошибка при загрузке данных')
        }
    }

    const updateContestData = async () => {
        try {
            const endDate = new Date(updateFormData.end_date);
            const formDataToSend = new FormData();

            console.log(formDataToSend)
            for (const key in updateFormData) {
                if (key === 'files') {
                    for (let i = 0; i < updateFormData.files.length; i++) {
                        formDataToSend.append('files', updateFormData.files[i])
                    }
                } else if (key === 'end_date') {
                    formDataToSend.append('end_date', endDate.toISOString());
                } else {
                    formDataToSend.append(key, updateFormData[key]);
                }
            }
            await axios.post('http://212.112.105.196:3457/api/contest/updateContest', formDataToSend)
            setUpdateModal(false)

        } catch (error) {
            console.log(error)
        }
    }

    console.log(formData)
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
                            <Link to={"/concurs"} className="tab-link">
                                <button style={{ color: "#0D6EFD", background: "White" }}
                                    className="tab-button">Черновики [{count.draft_count}]
                                </button>
                            </Link>
                            <Link to={"/public"} className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button"
                                    onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]
                                </button>
                            </Link>
                            <Link to="/completed" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button"
                                    onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]
                                </button>
                            </Link>
                            <Link to="/canceled" className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button"
                                    onClick={() => contestFilter(4)}>Деактивированные [{count.deactivated_count}]
                                </button>
                            </Link>
                            <Link to={"/archive"} className="tab-link">
                                <button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив
                                    [{count.archived_count}]
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ display: "flex", textAlign: "center", gap: '1vw' }}>
                        <div>{userEmail}</div>
                        <Link to={"/"}>
                            <button
                                className="btn btn-danger"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Power size={16} color="#fff" />
                            </button>

                        </Link>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header" style={{ background: "white" }}>
                            <Button variant="success" size="sm" onClick={handleShow}> + Добавить конкурс</Button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered first">
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
                                            <th>Окончания</th>
                                            <th>Файлы</th>
                                            <th>Действия</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.contests && formData.contests.map((contest, index) => (
                                            <tr key={contest.codeid}>
                                                <td>{index + 1}</td>
                                                <th>{contest.contest_name}</th>
                                                <td>{contest.contest_description}</td>
                                                <td>{contest.format_purchase}</td>
                                                <td>{contest.method_purchase}</td>
                                                <td>{contest.type_purchase}</td>
                                                <td>{contest.year}</td>
                                                <th>{contest.planned_summ}</th>
                                                <td>{contest.start_date}</td>
                                                <td>{contest.formatted_end_date}</td>
                                                <td>
                                                    {contest.files.length > 0 && contest.files.map((file, index) => (
                                                        <div key={index} style={{ marginRight: '10px', display: "flex", flexDirection: "row", gap: 10 }}>
                                                            <a href={file.path} target="_blank" rel="noopener noreferrer" download style={{ textDecoration: 'none', color: 'inherit', display: 'inline-block' }}>
                                                                <span>{file.file_name}</span>
                                                            </a>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "5px" }}>
                                                        <Button variant='warning' size='sm' onClick={() => handleOpenModal(contest.codeid)} style={{ display: "flex", flexDirection: 'row', alignItems: 'center', gap: 5, color: "#fff" }}>
                                                            <PencilSimpleLine size={18} color="#fff" />
                                                            Редактировать
                                                        </Button>
                                                        <Button variant="primary" size="sm" onClick={() => handlePublish(contest.codeid)}>Опубликовать</Button>
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
                                <div style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center", width: '100%' }}>
                                    <Form.Group className="mb-3" controlId="year" style={{ width: "50%" }}>
                                        <Form.Label>Год</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Год"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="planned_summ" style={{ width: "50%" }}>
                                        <Form.Label>Планируемая сумма</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Сумма"
                                            name="planned_summ"
                                            value={formData.planned_summ}
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                        />
                                    </Form.Group>
                                </div>
                                <Form.Group className="mb-3" controlId="purchaseFormat">
                                    <Form.Label>Формат закупок</Form.Label>
                                    <Form.Select
                                        name="purchase_format_id"
                                        value={formData.purchase_format_id}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
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
                                    <Form.Label>Метод закупки</Form.Label>
                                    <Form.Select
                                        name="purchase_method_id"
                                        value={formData.purchase_method_id}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    >
                                        <option value={0}>Выберите метод закупки</option>
                                        {spPurchase?.method &&
                                            Object.keys(spPurchase.method).map((key) => (
                                                <option key={key} value={spPurchase.method[key].codeid}>
                                                    {spPurchase.method[key].method_purchase}
                                                </option>
                                            ))}    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-md-6">
                                <Form.Group className="mb-3">
                                    <Form.Label>Срок окончания (дата, время)</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="end_date"
                                        value={
                                            formData.end_date
                                                ? new Date(formData.end_date).toISOString().slice(0, 16)
                                                : new Date().toISOString().slice(0, 16)
                                        }
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Group>


                                <Form.Group className="mb-3" controlId="purchaseType">
                                    <Form.Label>Тип закупки</Form.Label>
                                    <Form.Select
                                        name="purchase_type_id"
                                        value={formData.purchase_type_id}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
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
                                    <Form.Label>Название организации</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Название организации"
                                        name="contest_name"
                                        value={formData.contest_name}
                                        onChange={handleChange}
                                        style={{ width: "100%" }}
                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-4" controlId="contestDescription">
                            <Form.Label>Наименование закупки</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={1}
                                placeholder="Наименование закупки"
                                name="contest_description"
                                value={formData.contest_description}
                                onChange={handleChange}
                                style={{ height: 250 }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="files">
                            <Form.Label style={{ display: 'block' }}>
                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                Прикрепить файлы
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="files"
                                onChange={handleChange}
                                multiple
                                style={{ display: "none" }}
                            />
                        </Form.Group>


                        {formData.fileNames && formData.fileNames.length > 0 && (
                            <div>
                                <ul>
                                    {formData.fileNames.map((fileName, index) => (
                                        <>
                                            <div key={index} style={{display: "flex", flexDirection: "row", gap: 10, margin: '10px 0'}}>
                                        <li key={index}>{fileName}</li>
                                        <Button variant="danger" size="sm" onClick={() => onRemove2(index)}>X</Button>
                                        </div>
                                        </>
                                    ))}
                                </ul>
                            </div>
                        )}


                        <div className="text-end">
                            <Button variant="success" size="sm" onClick={handleSave}>
                                Сохранить
                            </Button>
                        </div>
                    </Form>
                </Modal>
                <Modal show={updateModal} onHide={closeUpdateModal} className="custom-modal" style={{ marginTop: "8vw" }}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontSize: "18px" }}>Редактировать данные конкурса</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="row">
                                <div className="col-md-6">
                                    <div style={{ display: "flex", flexDirection: 'row', width: '100%', gap: 20 }}>
                                        <Form.Group className="mb-3" controlId="year" style={{ width: '50%' }}>
                                            <Form.Label>Год</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Год"
                                                name="year"
                                                value={updateFormData.year}
                                                onChange={handleChangeUpdateDate}
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="planned_summ"
                                            style={{ width: '50%' }}>
                                            <Form.Label>Планируемая сумма</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="сумма"
                                                name="planned_summ"
                                                value={updateFormData.planned_summ}
                                                onChange={handleChangeUpdateDate}
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Group>
                                    </div>
                                    <Form.Group className="mb-3" controlId="purchaseFormat">
                                        <Form.Select
                                            name="purchase_format_id"
                                            value={updateFormData.purchase_format_id}
                                            onChange={handleChangeUpdateDate}
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
                                            value={updateFormData.purchase_method_id}
                                            onChange={handleChangeUpdateDate}
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
                                                updateFormData.end_date
                                                    ? new Date(updateFormData.end_date).toISOString().slice(0, 16)
                                                    : new Date().toISOString().slice(0, 16)
                                            }
                                            onChange={handleChangeUpdateDate}
                                        />

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="purchaseType">
                                        <Form.Select
                                            name="purchase_type_id"
                                            value={updateFormData.purchase_type_id}
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
                                            value={updateFormData.contest_name}
                                            onChange={handleChangeUpdateDate}
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
                                    value={updateFormData.contest_description}
                                    onChange={handleChangeUpdateDate}
                                    style={{ height: 250 }}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="files">
                                <Form.Label style={{ display: 'block' }}>
                                    <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                    Прикрепить файлы
                                </Form.Label>
                                <Form.Control
                                    type="file"
                                    name="files"
                                    onChange={handleChangeUpdateDate}
                                    multiple
                                    style={{ display: "none" }}
                                />
                            </Form.Group>

                            {updateFormData.files.length !== 0
                                ? updateFormData.files.map((file, index) => (
                                    <Form.Group key={index} className="mb-3">
                                        <div className="d-flex align-items-center"
                                            style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                            <Form.Label type="checkbox" className="me-3" />
                                            <div>
                                                <a  target="_blank" rel="noopener noreferrer" href={file.path} download>{file.file_name}</a>
                                            </div>
                                            <Button variant="danger" size="sm" onClick={() => onRemove(index)}>
                                             X
                                            </Button>
                                        </div>
                                    </Form.Group>
                                ))
                                : <div>Загруженных файлов нет</div>
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" onClick={updateContestData}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                >
                    <Modal show={closeModal} onHide={closeModalHide} className="custom-modal"
                        style={{ marginTop: "8vw" }}>
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title style={{ fontSize: "18px" }}>Успешно</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Данные успешно сохранены</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeModalHide}>Закрыть</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal>
                </div>
            </div>
        </div >

    )
}

export default Concurs;
