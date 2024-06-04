import React, { useEffect, useState } from 'react';
import './concurs.css';
import {Button, Form, Modal, Table} from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import Sidebar from './Sidebar';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {BsPaperclip} from "react-icons/bs";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Power} from "phosphor-react";
import { API } from '../../helpers/const';

const Participants = () => {
    const { users2, getUserList, updateUserStatus, getByStatus, getByStatus2, diactiveContest, organizationType, } = UseRegister();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [comment, setComment] = useState('Уважаемый ФИО, Ваша учетная запись была проверена нашими специалистами и успешно прошла верификацию, добро пожаловать в портал закупок КНАУ');
    const [userId, setUserId] = useState(0);
    const [userEmail, setUserEmail] = useState('');

    /// ------------------------ add User _-------------------------------------
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [formState, setFormState] = useState({
            organization_type_id: '',
            email: '',
            password: '',
            inn: '',
            name_organization: '',
            pin_manager: '',
            fio_manager: '',
            position_manager: '',
            ur_address: '',
            fact_address: '',
            address: '',
            banc: '',
            deposot_account: '',
            bik: '',
            web_site: '',
            pin_sales_manager: '',
            fio: '',
            position: '',
            phone_manager: '',
            work_phone_number_manager: '',
            email_manager: '',
            password_manager: '',
            files: []
        }
    );
    const [resetFormData, setResetFormData] = useState({
            organization_type_id: '',
            email: '',
            password: '',
            inn: '',
            name_organization: '',
            pin_manager: '',
            fio_manager: '',
            position_manager: '',
            ur_address: '',
            fact_address: '',
            address: '',
            banc: '',
            deposot_account: '',
            bik: '',
            web_site: '',
            pin_sales_manager: '',
            fio: '',
            position: '',
            phone_manager: '',
            work_phone_number_manager: '',
            email_manager: '',
            password_manager: '',
            files: []
        }
    );
    const [errors, setErrors] = useState({
        organization_type_id: '',
        email: '',
        password: '',
        inn: '',
        name_organization: '',
        pin_manager: '',
        fio_manager: '',
        position_manager: '',
        ur_address: '',
        fact_address: '',
        address: '',
        banc: '',
        deposot_account: '',
        bik: '',
        web_site: '',
        pin_sales_manager: '',
        fio: '',
        position: '',
        phone_manager: '',
        work_phone_number_manager: '',
        email_manager: '',
        password_manager: '',
        files: []
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Field changed: ${name} = ${value}`); // Debugging line
    };
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };
    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };
    const handleBreadcrumbClick = (step) => {
        setCurrentStep(step);
    };
    const getFieldNamesForStep = (step) => {
        switch (step) {
            case 1:
                return [
                    'organization_type_id',
                    'email',
                    'password',
                    'inn',
                    'name_organization',
                    'pin_manager',
                    'fio_manager',
                    'position_manager',
                    'address',
                    'ur_address',
                    'fact_address'
                ];
            case 2:
                return ['banc', 'deposot_account', 'bik'];
            case 3:
                return [
                    'web_site',
                    'pin_sales_manager',
                    'fio',
                    'position',
                    'phone_manager',
                    'work_phone_number_manager',
                    'email_manager',
                    'password_manager',
                    'files'
                ];
            default:
                return [];
        }
    };
    const validateStep = (step) => {
        const fieldsToValidate = getFieldNamesForStep(step);
        let isValid = true;
        const updatedErrors = {};

        fieldsToValidate.forEach((fieldName) => {
            if (!formState[fieldName]) {
                updatedErrors[fieldName] = 'Это поле не может быть пустым';
                isValid = false;
            } else {
                updatedErrors[fieldName] = '';
            }
        });

        setErrors((prevState) => ({
            ...prevState,
            ...updatedErrors
        }));

        return isValid;
    };
    const validateForm = () => {
        let isValid = true;
        const updatedErrors = {};

        Object.keys(formState).forEach((fieldName) => {
            if (!formState[fieldName]) {
                console.log(`Field "${fieldName}" is empty.`);
                updatedErrors[fieldName] = 'Это поле не может быть пустым';
                isValid = false;
            } else {
                updatedErrors[fieldName] = '';
            }
        });

        setErrors((prevState) => ({
            ...prevState,
            ...updatedErrors
        }));

        return isValid;
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormState((prevState) => ({
            ...prevState,
            files: [...prevState.files, ...files]
        }));
    };
    const handleFileSelection = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        handleFileChange(event);
    };

    const onRemove2 = (index) => {
        const updated = [...selectedFiles];
        updated.splice(index, 1);

        setSelectedFiles(updated);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData();

            for (const key in formState) {
                if (key !== 'files') {
                    formData.append(key, formState[key]);
                }
            }

            formData.append("files", formState?.files)

            try {
                await registerUser(formData);
                console.log('Данные успешно отправлены на сервер!');
            } catch (error) {
                console.log('Ошибка при отправке данных на сервер:', error.message);
            }
        }
    };
    const [show, setShow] = useState(false);
    const handleClose = () =>{
        setFormState(resetFormData)
        setShow(false);
    }

    const handleShow = () => setShow(true);
    /// ------------------------ addd User end_-------------------------------------

    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    useEffect(() => {
        getUserList();
        getByStatus(2);

    }, []);


    const [addAct, setAddAct] = useState({
        fileDescription: "Протокол деактивации пользователя",
        file: null
    });


    const handleSubmitDiactive = async () => {
        const formData = new FormData();
        formData.append("fileDescription", addAct.fileDescription);
        formData.append("file", addAct.file);
        formData.append('status', 3)
        formData.append('comment', comment)
        formData.append('userId', userId)

        try {
            const { data } = await axios.post(`${API}api/users/updateUserStatus`, formData);
            console.log(data)
            handleCloseVerifyModal();
        } catch (error) {
            console.log(error);
        }
    };

    const getUserInfo = async (codeId, index) => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserInfo/${codeId}`);
            setSelectedIndex(index);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseVerifyModal = () => {
        setShowVerifyModal(false);
    }

    const handleCloseDeactivateModal = () => {
        setShowDeactivateModal(false);
    }

    const handleVerify = (codeId) => {
        setUserId(codeId);
        setShowVerifyModal(true);
    }

    const handleSendVerifyData = () => {
        const data = {
            status: 1,
            comment: comment,
            userId: userId
        };
        updateUserStatus(data);
        getByStatus(1);
        getByStatus2(2)
        setShowVerifyModal(false);
        setComment('');
        getUserList()
    }

    const handleDeactivate = (codeId) => {
        setUserId(codeId);
        setShowDeactivateModal(true);
    }

    const handleChangeFile = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setAddAct({ ...addAct, file: files[0] });
        } else {
            setAddAct({ ...addAct, [name]: value });
        }
    };

    const registerUser = async (userData) => {
        try {
            const response = await axios({
                method: "POST",
                url: `${API}api/users/signup`,
                data: userData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log('Error registering user:', error.message);
            throw error;
        }
    };


    const handleSendDeactivateData = () => {
        const data = {
            status: 3,
            comment: comment,
            userId: userId
        };
        diactiveContest(data);
        getByStatus2();
        setShowDeactivateModal(false);
        setComment('');
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }


    const userRole = localStorage.getItem('role');

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
                            <button className="tab-button" onClick={() => getByStatus(2)}
                                    style={{color: "#0D6EFD", background: "White"}}>Не верифицированные
                            </button>
                            <Link to={"/verf"}>
                                <button className="tab-button" onClick={() => getByStatus2(1)}
                                        style={{color: "#333333", background: "#F0F0F0"}}>Верифицированные
                                </button>
                            </Link>
                            <Link to={"/deac"}>
                                <button className="tab-button" style={{color: "#333333", background: "#F0F0F0"}}
                                        onClick={() => getByStatus(3)}>Деактивированные
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div style={{
                        display: "flex",
                        textAlign: "center",
                        gap: '10px',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

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
                                <Power size={30} color="red"/>
                            </button>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                    <div className="card-body">
                            <div className="card-header" style={{background: "white"}}>
                                <Button variant="success" size="sm" onClick={handleShow}> + Добавить контрагента</Button>
                            </div>

                            <div className="table-responsive mt-4">
                                <Table striped bordered hover className="table-responsive">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ФИО</th>
                                        <th scope="col">Организация</th>
                                        <th scope="col">ИНН</th>
                                        <th scope="col">Адрес</th>
                                        <th scope="col">Фактический адрес</th>
                                        <th scope="col">Юридический адрес</th>
                                        <th scope="col">Электронная почта</th>
                                        <th scope="col">Телефон</th>
                                        <th scope="col">Банк</th>
                                        <th scope="col">БИК</th>
                                        <th scope="col">Расчетный счет</th>
                                        <th scope="col">Сайт</th>
                                        <th scope="col">Должность</th>
                                        <th scope='col'>Файлы</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users2 && users2.length > 0 && users2.map((user, index) => (
                                        user.status === 2 && (
                                            <tr key={user.codeid} data-codeid={user.codeid}
                                                onClick={() => getUserInfo(user.codeid, index)}>
                                                <td>{index + 1}</td>
                                                <td>{user.fio}</td>
                                                <td>{user.name_organization}</td>
                                                <td>{user.inn}</td>
                                                <td>{user.address}</td>
                                                <td>{user.fact_address}</td>
                                                <td>{user.ur_address}</td>
                                                <td>{user.email}</td>
                                                <td>{user.pin_manager}</td>
                                                <td>{user.banc_name}</td>
                                                <td>{user.bik}</td>
                                                <td>{user.deposit_account}</td>
                                                <td>{user.web_site}</td>
                                                <td>{user.position}</td>
                                                <td>
                                                    <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                                                        {user.files.length > 0 && user.files.map((file, index) => (
                                                            <>
                                                                <div className='d-flex flex-row gap-2'>
                                                                    <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                                                    <a target="_blank" rel="noopener noreferrer"
                                                                       download
                                                                       href={file.path}>{file.file_name}</a>
                                                                </div>
                                                            </>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                                                        {userRole !== 'Оператор' && (
                                                            <>
                                                                <Button variant="success" size="sm" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleVerify(user.codeid);
                                                                }}>Верифицировать</Button>
                                                                <Button variant="danger" size="sm" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeactivate(user.codeid);
                                                                }}>Деактивировать</Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    ))}
                                    </tbody>


                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal backdrop="static"  show={showVerifyModal} onHide={handleCloseVerifyModal} className='modalVerification'>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize: "18px"}}>Подтверждение </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder='Письмо контрагенту'
                        style={{height: 200}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: '100%'}}>
                    <p>(будет отправлено на почту)</p>
                    <Button variant="success" size='sm' onClick={handleSendVerifyData}>
                        Верифицировать
                    </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal backdrop="static" show={showDeactivateModal} onHide={handleCloseDeactivateModal} className='modalVerification'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Протокол </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder='заключение'
                        style={{height: 250}}
                    />
                </Modal.Body>
                <Form.Group className="mb-3" controlId="files" style={{ marginTop: "1vw" }}>
                    <Form.Label style={{ display: 'block' }}>
                        <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                        Прикрепить файлы
                    </Form.Label>
                    <Form.Control
                        type="file"
                        name="file"
                        onChange={handleChangeFile}
                        multiple
                        style={{ display: "none" }}
                    />

                    {addAct.file && (
                        <div className='d-flex flex-row gap-1' style={{margin:" 0 15px"}}>
                            <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                            <p>{addAct.file.name}</p>
                        </div>
                    )}
                </Form.Group>
                <Modal.Footer>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: '0 20px', width: '100%'}}>
                    <p>(будет отправлен на почту)</p>
                    <Button variant="danger" size="sm" onClick={handleSubmitDiactive}>
                        Деактивировать
                    </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal backdrop="static" show={show} onHide={handleClose} className="custom-modal" >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Добавление контрагента</Modal.Title>
                </Modal.Header>
                <Form style={{padding: '1vw'}} onSubmit={handleSubmit}>
                    <div className="card-body">
                        <Breadcrumb className="mb-4">
                            <Breadcrumb.Item onClick={() => handleBreadcrumbClick(1)} active={currentStep === 1}>
                                Информация об организации
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => handleBreadcrumbClick(2)} active={currentStep === 2}>
                                Банковские данные
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={() => handleBreadcrumbClick(3)} active={currentStep === 3}>
                                Руководитель отдела закупок
                            </Breadcrumb.Item>
                        </Breadcrumb>
                            {currentStep === 1 && (
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Форма собственности</label>
                                        {organizationType && (
                                            <select
                                                name="organization_type_id"
                                                value={formState.organization_type_id}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Выберите форму собственности</option>
                                                {organizationType.map((option) => (
                                                    <option key={option.codeid} value={option.codeid}>
                                                        {option.name}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                        {errors.organization_type_id && (
                                            <div className="text-danger">{errors.organization_type_id}</div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Электронная почта</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && (
                                            <div className="text-danger">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Пароль</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={formState.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">ИНН организации</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="inn"
                                            value={formState.inn}
                                            onChange={handleChange}
                                        />
                                        {errors.inn && <div className="text-danger">{errors.inn}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Название организации</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name_organization"
                                            value={formState.name_organization}
                                            onChange={handleChange}
                                        />
                                        {errors.name_organization && (
                                            <div className="text-danger">{errors.name_organization}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">ПИН руководителя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pin_manager"
                                            value={formState.pin_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.pin_manager && (
                                            <div className="text-danger">{errors.pin_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">ФИО руководителя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fio_manager"
                                            value={formState.fio_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.fio_manager && (
                                            <div className="text-danger">{errors.fio_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Должность руководителя</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="position_manager"
                                            value={formState.position_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.position_manager && (
                                            <div className="text-danger">{errors.position_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Юридический адрес</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="ur_address"
                                            value={formState.ur_address}
                                            onChange={handleChange}
                                        />
                                        {errors.ur_address && (
                                            <div className="text-danger">{errors.ur_address}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Фактический адрес</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fact_address"
                                            value={formState.fact_address}
                                            onChange={handleChange}
                                        />
                                        {errors.fact_address && (
                                            <div className="text-danger">{errors.fact_address}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Адрес</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={formState.address}
                                            onChange={handleChange}
                                        />
                                        {errors.address && (
                                            <div className="text-danger">{errors.address}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Название банка</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="banc"
                                            value={formState.banc}
                                            onChange={handleChange}
                                        />
                                        {errors.banc && <div className="text-danger">{errors.banc}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Расчётный счёт</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="deposot_account"
                                            value={formState.deposot_account}
                                            onChange={handleChange}
                                        />
                                        {errors.deposot_account && (
                                            <div className="text-danger">{errors.deposot_account}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">БИК</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="bik"
                                            value={formState.bik}
                                            onChange={handleChange}
                                        />
                                        {errors.bik && <div className="text-danger">{errors.bik}</div>}
                                    </div>
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Веб-сайт</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="web_site"
                                            value={formState.web_site}
                                            onChange={handleChange}
                                        />
                                        {errors.web_site && (
                                            <div className="text-danger">{errors.web_site}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">ПИН</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="pin_sales_manager"
                                            value={formState.pin_sales_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.pin_sales_manager && (
                                            <div className="text-danger">{errors.pin_sales_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">ФИО</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="fio"
                                            value={formState.fio}
                                            onChange={handleChange}
                                        />
                                        {errors.fio && (
                                            <div className="text-danger">{errors.fio}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Должность</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="position"
                                            value={formState.position}
                                            onChange={handleChange}
                                        />
                                        {errors.position && (
                                            <div className="text-danger">{errors.position}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Телефон руководителя отдела закупок</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="phone_manager"
                                            value={formState.phone_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.phone_manager && (
                                            <div className="text-danger">{errors.phone_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Рабочий телефон руководителя отдела
                                            закупок</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="work_phone_number_manager"
                                            value={formState.work_phone_number_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.work_phone_number_manager && (
                                            <div className="text-danger">{errors.work_phone_number_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email руководителя отдела закупок</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email_manager"
                                            value={formState.email_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.email_manager && (
                                            <div className="text-danger">{errors.email_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Пароль руководителя отдела закупок</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password_manager"
                                            value={formState.password_manager}
                                            onChange={handleChange}
                                        />
                                        {errors.password_manager && (
                                            <div className="text-danger">{errors.password_manager}</div>
                                        )}
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Загрузить файлы</label>
                                        <div className="input-group">
                                        <span className="input-group-text">
                                              <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                        </span>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="files"
                                                multiple
                                                onChange={handleFileSelection}
                                                style={{display: 'none'}}
                                                id="fileInput"
                                            />
                                            <label htmlFor="fileInput" className="btn btn-outline-secondary">
                                                <i> Прикрепить файлы</i>
                                            </label>
                                        </div>
                                        {selectedFiles.length > 0 && (
                                            <div className="mt-2">
                                                <ul className="list-group">
                                                    {selectedFiles.map((file, index) => (
                                                        <>
                                                            <div style={{
                                                                display: "flex",
                                                                flexDirection: 'row',
                                                                gap: 10,
                                                                margin: '10px 0'
                                                            }}>
                                                                <li key={index} className="list-group-item">
                                                                    {file.name}
                                                                </li>
                                                                <Button variant="danger" size="sm"
                                                                        onClick={() => onRemove2(index)}>X</Button>
                                                            </div>
                                                        </>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {errors.files && (
                                            <div className="text-danger">{errors.files}</div>
                                        )}
                                    </div>

                                </div>
                            )}

                            <div className="mt-4" style={{
                                width: 300,
                                margin: '0 auto',
                                display: "flex",
                                flexDirection: 'row',
                                gap: 15,
                                alignItems: "center",
                                justifyContent: 'center'
                            }}>
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={prevStep}
                                    >
                                        Назад
                                    </button>
                                )}
                                {currentStep < 3 && (
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={nextStep}
                                    >
                                        Далее
                                    </button>
                                )}
                                {currentStep === 3 && (
                                    <button type="submit" className="btn btn-success">
                                       Добавить
                                    </button>
                                )}
                            </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Participants;
