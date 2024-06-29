import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import { UseRegister } from '../../Context/ContextProviderRegister';
import {FileArrowDown, PencilSimpleLine} from "@phosphor-icons/react";
import DetailModal from "../Home/DetailModal";
import { BsPaperclip } from "react-icons/bs";
import {Power} from "phosphor-react";
import axios from "axios";
import {API} from "../../helpers/const";
import {useToast} from "../../Context/ToastContext";

const Public = () => {

    const { successToast, errorToast } = useToast();
    const { compled, contestFilter, updateContestStatus, getOrderDetails, count, getCounts, diactiveContest,spPurchase } = UseRegister();
    const [showModal, setShowModal] = useState(false);
    const [finalContestModal, setFinalContestModal] = useState(false);
    const [reason, setReason] = useState('');
    const [selectedContestId, setSelectedContestId] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    useEffect(() => {
        contestFilter(2);
        getCounts()
    }, []);
    const [addAct, setAddAct] = useState({
        fileDescription: "Протокол досрочной деактивации конкурса",
        file: null
    });


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setAddAct({ ...addAct, file: files[0] });
        } else {
            setAddAct({ ...addAct, [name]: value });
        }
    };


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
            await axios.post(`${API}api/contest/updateContest`, formDataToSend)
            successToast('Успех', 'Данные конкурса были обновлены!');
            setUpdateModal(false)

        } catch (error) {
            errorToast('Ошибка', 'Не удалось обновить данные конкурса!');
            console.log(error)
        }
    }

    const handlePublish = async () => {
        const publicData = {
            contest_id: selectedContestId,
            contest_status: 3,
            comment: ""
        };
        try {
            await updateContestStatus(publicData);
            contestFilter(2);
            setFinalContestModal(false)
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePublish2 = async (contestId) => {
        setSelectedContestId(contestId);
        setShowModal(true);
        getCounts()

    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReason('');
    };

    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };

    const handleConfirmDeactivation = async () => {
        if (reason.trim() === '') {
            alert('Введите причину деактивации');
            return;
        }

        const formData = new FormData();
        formData.append("fileDescription", addAct.fileDescription);
        formData.append("file", addAct.file);
        formData.append('contest_id', selectedContestId)
        formData.append('contest_status', 4)
        formData.append('comment', reason)
        console.log(formData)
        try {
            await diactiveContest(formData);
            setShowModal(false);
            setReason('');
            contestFilter(2);
            getCounts()
        } catch (error) {
            console.log(error.message);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };


    const watchDetails = (codeid) => {
        getOrderDetails(codeid)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
    };


    const userRole = localStorage.getItem('role');

    const  handleCloseFinalModal = () => {
        setFinalContestModal(false)
    }
    const handleFinalContest = (codeid) => {
        setSelectedContestId(codeid);
        setFinalContestModal(true);
        getCounts()
    };


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

    const handleChangeUpdateDate = (e) => {
        const { files } = e.target;
        const newFiles = Array.from(files).map(file => ({
            file_name: file.name,
            path: URL.createObjectURL(file),
            file
        }));
        setUpdateFormData(prevState => ({
            ...prevState,
            files: [...prevState.files, ...newFiles]
        }));
    };

    const onRemove = (index) => {
        const updatedFiles = [...updateFormData.files];
        const removedFile = updatedFiles.splice(index, 1)[0];
        setUpdateFormData(prevState => {
            const deletedFiles = Array.isArray(prevState.deleted_files) ? prevState.deleted_files : [];
            return {
                ...prevState,
                files: updatedFiles,
                deleted_files: removedFile.codeid ? [...deletedFiles, removedFile.codeid] : deletedFiles
            };
        });
    };


    const closeUpdateModal = () => setUpdateModal(false)
    const [updateModal, setUpdateModal] = useState(false);

    const handleOpenModal = async (codeid) => {
        setUpdateModal(true)
        const response = await axios.get(`${API}api/contest/getContestDetails/${codeid}`)

        if (response.status === 200) {
            const data = response.data.result.data[0]
            setUpdateFormData(prevState => ({
                ...prevState,
                ...data,
                files: [...prevState.files, ...data.files] // добавляем файлы из данных к уже существующим
            }));
        } else {
            alert('Произошла ошибка при загрузке данных')
        }
    }

    const navigate = useNavigate()
    const signout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти из аккаунта?");
        if (confirmed) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('codeid');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('role');
            console.log('User signed out');
            navigate('/');
        }
    };
    return (
        <div className="oll_sistem" style={{ maxWidth: "100vw" }}>
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
                            <Link to={"/concurs"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Черновики [{count.draft_count}]</button></Link>
                            <Link to={"/public"} className="tab-link"><button style={{ color: "#0D6EFD", background: "White" }} className="tab-button" onClick={() => contestFilter(2)}>Опубликованные [{count.published_count}]</button></Link>
                            <Link to="/completed" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(3)}>Завершенные [{count.completed_count}]</button></Link>
                            <Link to="/canceled" className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button" onClick={() => contestFilter(4)}>Деактивированные [{count.deactivated_count}]</button></Link>
                            <Link to={"/archive"} className="tab-link"><button style={{ color: "#333333", background: "#F0F0F0" }} className="tab-button">Архив [{count.archived_count}]</button></Link>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "flex", textAlign: "center", gap: '10px', justifyContent: "center", alignItems: "center" }}>
                            <div>{userEmail}</div>
                                <button
                                    onClick={signout}
                                    className="btn"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'transparent'
                                    }}
                                >
                                    <Power size={30} color="red" />
                                </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" >
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive mt-4" style={{ overflowX: 'auto' }}>
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
                                                <th>Окончания</th>
                                                <th>Файлы</th>
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { compled && compled
                                            .filter(contest => {
                                                console.log('Contest:', contest);
                                                return contest.contest_status === 2;
                                            })
                                            .map((contest, index) => (
                                                <tr key={contest.codeid}>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{index + 1}</td>
                                                        <th onClick={() => watchDetails(contest.codeid)}>{contest.contest_name}</th>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.contest_description}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.format_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.method_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.type_purchase}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.year}</td>
                                                        <th onClick={() => watchDetails(contest.codeid)}>{contest.planned_summ}</th>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.start_date}</td>
                                                        <td onClick={() => watchDetails(contest.codeid)}>{contest.formatted_end_date}</td>
                                                        <td >
                                                            { contest.files && contest.files.length > 0 && contest.files.map((file, index) => (
                                                                <div key={index} style={{
                                                                    marginRight: '10px',
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    gap: 10
                                                                }}>
                                                                    <div className='d-flex flex-row gap-2'>
                                                                        <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                                                        <a target="_blank" rel="noopener noreferrer"
                                                                           download
                                                                           href={file.path}>{file.file_name}</a>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </td>
                                                    <td>
                                                        <div style={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            flexWrap: "wrap",
                                                            gap: 10
                                                        }}>
                                                            <Button variant="success" size="sm"
                                                                    onClick={() => handleFinalContest(contest.codeid)}>Завершить</Button>

                                                            <Button variant='warning' size='sm'
                                                                    onClick={() => handleOpenModal(contest.codeid)} style={{
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 5,
                                                                color: "#fff"
                                                            }}>
                                                                Редактировать
                                                            </Button>

                                                            {userRole !== 'Оператор' && (

                                                                <Button variant="danger" size="sm"
                                                                        onClick={() => handlePublish2(contest.codeid)}>Деактивировать</Button>
                                                                )}
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
                </div>
            </div>
            <DetailModal show={showDetailModal} onHide={handleCloseDetails} contestId={selectedContestId} />

            <Modal backdrop="static" show={showModal}  onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Протокол</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Control
                        as="textarea"
                        placeholder=""
                        value={reason}
                        style={{height: 250}}
                        onChange={(e) => setReason(e.target.value)}
                    />
                        <Form.Group className="mb-3" controlId="files" style={{ marginTop: "1vw" }}>
                            <Form.Label style={{ display: 'block' }}>
                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                Прикрепить файлы
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleChange}
                                multiple
                                style={{ display: "none" }}
                            />

                            {addAct.file && (
                                <div>
                                    <p>Выбранные файлы:</p>
                                    <ul>
                                        <li>{addAct.file.name}</li>
                                    </ul>
                                </div>
                            )}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleConfirmDeactivation} size="sm" disabled={!reason.trim()}>
                        Деактивировать
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal backdrop="static" show={finalContestModal}  onHide={handleCloseFinalModal} centered>

                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Подтверждение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>По данному конкурсу не был выбран победитель, Вы действительно хотите завершить конкурс ?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handlePublish} size="sm" >
                        Завершить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={updateModal} onHide={closeUpdateModal} className="custom-modal modalConcurs">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Редактировать данные конкурса</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={{ display: "flex", flexDirection: 'row', width: '100%', gap: 10 }}>
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
                            <Form.Label style={{ display: 'block' }} onClick={triggerFileInput}>
                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                Прикрепить файлы
                            </Form.Label>
                            <Form.Control
                                type="file"
                                id="fileInput"
                                name="files"
                                onChange={handleChangeUpdateDate}
                                multiple
                                style={{ display: "none" }}
                            />
                        </Form.Group>

                        {updateFormData.files.length !== 0 ? (
                            updateFormData.files.map((file, index) => (
                                <Form.Group key={index} className="mb-3">
                                    <div className="d-flex align-items-center" style={{ gap: 15 }}>
                                        <div className='d-flex flex-row gap-1'>
                                            <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                            {file.path ? (
                                                <a target="_blank" rel="noopener noreferrer" href={file.path} download>{file.file_name}</a>
                                            ) : (
                                                <span>{file.file_name}</span>
                                            )}
                                        </div>
                                        <Button variant="danger" size='sm' onClick={() => onRemove(index)}>X</Button>
                                    </div>
                                </Form.Group>
                            ))
                        ) : (
                            <div>Загруженных файлов нет</div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={updateContestData}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>


        </div>
    );
};

export default Public;
