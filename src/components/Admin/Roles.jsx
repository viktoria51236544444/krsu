import React, { useState, useEffect } from 'react';
import { ListGroup, FormCheck, Button, Modal, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import './Roles.css'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { UseRegister } from "../../Context/ContextProviderRegister";
import { BsPaperclip } from "react-icons/bs";
import { API } from '../../helpers/const';

const Roles = () => {
    const { organizationType, updateUserData, deleteUser2 } = UseRegister();
    const [users, setUsers] = useState([]);
    const [selectedRolID, setSelectedRoleID] = useState(1);
    const [spRoles, setSpRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [activeRole, setActiveRole] = useState(null);

    useEffect(() => {
        addUsersByRole();
        getFunctions();
    }, [selectedRolID]);

    const addUsersByRole = async () => {
        try {
            const response = await axios.get(`${API}api/users/getUsersByRole/${selectedRolID}`);
            if (response.status === 200) {
                setUsers(response.data.result.data);
            }
        } catch (error) {
            console.log(error);
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
    const handleCheckboxChange = (codeid) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.some(role => role.functuin_id === parseInt(codeid) && role.role_id === selectedRolID)
                ? prevSelectedRoles.filter(role => !(role.functuin_id === parseInt(codeid) && role.role_id === selectedRolID))
                : [...prevSelectedRoles, { codeid, role_id: selectedRolID, functuin_id: parseInt(codeid) }]
        );
    };

    const getFunctions = async () => {
        try {
            const response = await axios.get(`${API}api/contest/getSpPurchase`);
            if (response.status === 200) {
                setSpRoles(response.data.result.data.functions);
                setSelectedRoles(response.data.result.data.functionsRight)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUsersAndRoles = (number) => {
        setActiveRole(number);
        setSelectedRoleID(number);
    };

    const saveRolesAccess = async () => {
        try {
            const responce = await axios.post(`${API}api/users/addUserRoles`, selectedRoles)
            if (responce.status === 200) {
                alert('Успешно сохранено')
            } else {
                alert(responce.data.result.message)
            }
        } catch (error) {
            console.log(error)
        }
        console.log(selectedRoles)
    };

    const [addContrAgent, setContrAgent] = useState(false)
    const [addBaseUser, setBaseUser] = useState(false)
    const [editBaseUser, setEditBaseUser] = useState(false)

    /// ------------------------ addd User _-------------------------------------
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
    // !edit start
    const [editModalShow, setEditModalShow] = useState(false); // Состояние для отображения/скрытия модального окна редактирования
    const [selectedUser, setSelectedUser] = useState(null); // Выбранный пользователь для редактирования
    const [editFormState, setEditFormState] = useState({
        organization_type_id: 5,
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
        deposit_account: '',
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
    }); // Состояние для формы редактирования

    const getUserInfo = async (codeid) => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserInfo/${codeid}`);
            const user = data.user.user;
            if(user[0].role_id === 1 || user[0].role_id === 6 ) {
                user.map((user)=> {
                    setEditBaseUserData({
                        email: user.email,
                        password: user.password,
                        fio: user.fio,
                        role_id: user.role_id,
                        code_user: user.codeid
                    })
                })

                setEditBaseUser(true)
            }else {
                user.map((user) => {
                    setEditFormState({
                        organization_type_id: user.organization_type_id || 0,
                        email: user.email || '',
                        password: user.password || '',
                        inn: user.inn || '',
                        name_organization: user.name_organization || '',
                        pin_manager: user.pin_manager || '',
                        fio_manager: user.fio_manager || '',
                        position_manager: user.position_manager || '',
                        ur_address: user.ur_address || '',
                        fact_address: user.fact_address || '',
                        address: user.address || '',
                        banc: user.banc || '',
                        deposit_account: user.deposit_account || '',
                        bik: user.bik || '',
                        web_site: user.web_site || '',
                        pin_sales_manager: user.pin_manager || '',
                        fio: user.fio || '',
                        position: user.position || '',
                        phone_manager: user.phone_manager || '',
                        work_phone_number_manager: user.work_phone_number_manager || '',
                        email_manager: user.email_manager || '',
                        password_manager: user.password_manager || '',
                        files: user.files || []
                    })
                })
                setEditModalShow(true);
            }
        } catch (error) {
            console.log('Ошибка при получении информации о пользователе:', error);
        }
    };

    // Функция для открытия модального окна редактирования
    const handleEditModalOpen = (user) => {
        if(user.role_id === 6 || user.role_id === 1) {
            setSelectedUser(user);
            getUserInfo(user.codeid);
            openEditModal(user)
            setEditUserData(user)
        }else{
            setSelectedUser(user);
            getUserInfo(user.codeid);
        }
    };

    // Функция для закрытия модального окна редактирования
    const handleEditModalClose = () => {
        setEditModalShow(false);
    };

    const handleEditUser = async (event) => {
        event.preventDefault();
        try {
            const updatedUserData = {
                ...editFormState,
                code_user: selectedUser.codeid
            };
            await updateUserData(updatedUserData);

            alert('Данные пользователя успешно обновлены!');
            setEditModalShow(false);
            addUsersByRole();
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error.message);
            alert('Произошла ошибка при обновлении данных пользователя. Пожалуйста, попробуйте ещё раз.');
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const [deleteUserData, setDeleteUserData] = useState({
        code_user: 0,
        role_id: 0
    });

    const handleRoleClick2 = (roleId) => {
        setActiveRole(roleId);
        getUsersAndRoles(roleId);
        addUsersByRole(selectedRolID)
    };

    const handleDeleteClick = (user) => {
        setDeleteUserData({
            code_user: user.codeid,
            role_id: user.role_id
        });
        deleteUser2({
            code_user: user.codeid,
            role_id: user.role_id
        });
        addUsersByRole(selectedRolID)
    };

    // !delete end

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Field changed: ${name} = ${value}`);
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
    const handleClose = () => {
        setFormState(resetFormData)
        setContrAgent(false)
    }

    const handleClose2 = () => {
        setBaseUser(false)
    }

    const handleCloseEdit = () => {
        setEditBaseUser(false)
    }

    /// ------------------------ addd User end_-------------------------------------

    const [addUserData, setUserData] = useState({
        email: '',
        password: '',
        fio: '',
        role_id: selectedRolID
    })


    const [editBaseUserData, setEditBaseUserData] = useState({
        email: '',
        password: '',
        fio: '',
        role_id: selectedRolID,
        code_user: 0
    })

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API}api/users/addBaseUser`, addUserData)
            if (response.status === 200) {
                alert('Пользователь успешно сохранен')
                setBaseUser(false)
            } else {
                alert(response.data.result.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Field changed: ${name} = ${value}`);
    };


    const handleChangeUserData = (e) => {
        const { name, value } = e.target;
        setEditBaseUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Field changed: ${name} = ${value}`);
    };

    const addUser = () => {
        if (selectedRolID === 1 || selectedRolID === 6) {
            setBaseUser(true)
        } else if (selectedRolID === 5) {
            setContrAgent(true)
        }
    };

    const updateUser = (codeid) => {

    };
    const deleteUser = (codeid) => {

    };
    const handleRoleClick = (roleId) => {
        setActiveRole(roleId);
        getUsersAndRoles(roleId);
    };

    //! начало редактирование админов и операторов
    const [editUserData, setEditUserData] = useState({
        email: '',
        password: '',
        fio: '',
        role_id: 0,
        codeid: 0
    });

    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUserData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        console.log(`Field changed: ${name} = ${value}`);
    };

    const openEditModal = (user) => {
        setEditUserData({
            email: user.email,
            password: user.password,
            fio: user.fio,
            role_id: user.role_id,
            codeid: user.codeid
        });
        setShowEditModal(true);
    };

    const updateUser2 = (event) => {
        event.preventDefault();
        updateUserData(editBaseUserData);
        setEditBaseUser(false);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <div>
            <div className="oll_sistem">
                <Sidebar />
                <div className="navbar_container">
                    <div className="flex-container">

                        <div className="list-group-container">
                            <ListGroup style={{ borderRight: '1px solid gray', marginBottom: "1vh" }}>
                                <ListGroup.Item disabled>Роли</ListGroup.Item>
                                <ListGroup.Item active={activeRole === 1} onClick={() => handleRoleClick(1)}>
                                    Администраторы
                                </ListGroup.Item>
                                <ListGroup.Item active={activeRole === 6} onClick={() => handleRoleClick(6)}>
                                    Операторы
                                </ListGroup.Item>
                                <ListGroup.Item active={activeRole === 5} onClick={() => handleRoleClick(5)}>
                                    Контрагенты
                                </ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="list-group-container">
                            <ListGroup style={{ borderRight: '1px solid gray', marginBottom: "1vh", height: '100%' }}>
                                <ListGroup.Item>
                                    <div className='action_save'>
                                        <div className='action-center'>
                                            <p>Права роли</p>
                                        </div>
                                        <div className='action-center'>
                                            <Button variant="success" onClick={saveRolesAccess}>Сохранить</Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                {spRoles && spRoles.map((role, index) => (
                                    <ListGroup.Item key={index}>
                                        <FormCheck
                                            label={role.function_name}
                                            name="addUsers"
                                            checked={selectedRoles.some(selectedRole => selectedRole.functuin_id === parseInt(role.codeid) && selectedRole.role_id === selectedRolID)}
                                            onChange={() => handleCheckboxChange(role.codeid)}
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>

                        <div className="list-group-container">
                            <ListGroup>
                                <ListGroup.Item>
                                    <div className='action_save'>
                                        <div className='action-center'>
                                            <p>Список пользователей</p>
                                        </div>
                                        <div className='action-center'>
                                            <Button variant="success" size='sm' onClick={addUser}>Добавить пользователя</Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                {users && (
                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>№</th>
                                                    <th>Электронная почта</th>
                                                    <th>Пароль</th>
                                                    <th>Действие</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map((user, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.password}</td>
                                                        <td>
                                                            <div className="btn-groups">
                                                                <button type="button" className="btn btn-warning" onClick={() => handleEditModalOpen(user)}>Редактировать</button>
                                                                {activeRole !== 5 && (
                                                                    <button type='button' className='btn btn-danger' onClick={() => handleDeleteClick(user)}>Удалить</button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </ListGroup>
                        </div>
                    </div>
                </div>



            </div >
            <Modal backdrop="static" show={editModalShow} onHide={handleEditModalClose} className="custom-modal"  style={{ marginTop: "1vw", width: "100%" }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>
                        {selectedUser ? 'Редактирование контрагента' : 'Добавление контрагента'}
                    </Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '1vw' }} onSubmit={handleEditUser}>
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
                                        onChange={handleInputChange}
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
                                    value={editFormState.email}
                                    onChange={handleInputChange}
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
                                    value={editFormState.password}
                                    onChange={handleInputChange}
                                />
                                {errors.password && <div className="text-danger">{errors.password}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">ИНН организации</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="inn"
                                    value={editFormState.inn}
                                    onChange={handleInputChange}
                                />
                                {errors.inn && <div className="text-danger">{errors.inn}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Название организации</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_organization"
                                    value={editFormState.name_organization}
                                    onChange={handleInputChange}
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
                                    value={editFormState.pin_manager}
                                    onChange={handleInputChange}
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
                                    value={editFormState.fio_manager}
                                    onChange={handleInputChange}
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
                                    value={editFormState.position_manager}
                                    onChange={handleInputChange}
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
                                    value={editFormState.ur_address}
                                    onChange={handleInputChange}
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
                                    value={editFormState.fact_address}
                                    onChange={handleInputChange}
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
                                    value={editFormState.address}
                                    onChange={handleInputChange}
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
                                <label className="form-label">Банк</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="banc"
                                    value={editFormState.banc}
                                    onChange={handleInputChange}
                                />
                                {errors.banc && (
                                    <div className="text-danger">{errors.banc}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Расчетный счет</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="deposit_account"
                                    value={editFormState.deposit_account}
                                    onChange={handleInputChange}
                                />
                                {errors.deposit_account && (
                                    <div className="text-danger">{errors.deposit_account}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">БИК</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bik"
                                    value={editFormState.bik}
                                    onChange={handleInputChange}
                                />
                                {errors.bik && <div className="text-danger">{errors.bik}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Веб-сайт</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="web_site"
                                    value={editFormState.web_site}
                                    onChange={handleInputChange}
                                />
                                {errors.web_site && (
                                    <div className="text-danger">{errors.web_site}</div>
                                )}
                            </div>
                        </div>
                    )}
                    {currentStep === 3 && (
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">ПИН менеджера по продажам</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pin_sales_manager"
                                    value={editFormState.pin_sales_manager}
                                    onChange={handleInputChange}
                                />
                                {errors.pin_sales_manager && (
                                    <div className="text-danger">{errors.pin_sales_manager}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">ФИО менеджера по продажам</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fio"
                                    value={editFormState.fio}
                                    onChange={handleInputChange}
                                />
                                {errors.fio && <div className="text-danger">{errors.fio}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Должность</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="position"
                                    value={editFormState.position}
                                    onChange={handleInputChange}
                                />
                                {errors.position && (
                                    <div className="text-danger">{errors.position}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Телефон руководителя</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone_manager"
                                    value={editFormState.phone_manager}
                                    onChange={handleInputChange}
                                />
                                {errors.phone_manager && (
                                    <div className="text-danger">{errors.phone_manager}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Рабочий телефон руководителя</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="work_phone_number_manager"
                                    value={editFormState.work_phone_number_manager}
                                    onChange={handleInputChange}
                                />
                                {errors.work_phone_number_manager && (
                                    <div className="text-danger">{errors.work_phone_number_manager}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Электронная почта руководителя</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email_manager"
                                    value={editFormState.email_manager}
                                    onChange={handleInputChange}
                                />
                                {errors.email_manager && (
                                    <div className="text-danger">{errors.email_manager}</div>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Пароль руководителя</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password_manager"
                                    value={editFormState.password_manager}
                                    onChange={handleInputChange}
                                />
                                {errors.password_manager && (
                                    <div className="text-danger">{errors.password_manager}</div>
                                )}
                            </div>
                        </div>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditModalClose}>
                            Отмена
                        </Button>
                        <Button variant="primary" type="submit">
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal backdrop="static" show={addContrAgent} onHide={handleClose} className="custom-modal"  style={{ marginTop: "1vw", width: "100%" }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Добавление контрагента</Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '1vw' }} onSubmit={handleSubmit}>
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
                                            style={{ display: 'none' }}
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
                                                            <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
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

            <Modal backdrop="static" show={addBaseUser} onHide={handleClose2} className="custom-modal modalact"
                style={{ marginTop: "1vw", width: "100%" }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Добавление пользователя</Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '1vw' }} onSubmit={saveUser}>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Электронная почта</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder='Введите email'
                                    value={addUserData.email}
                                    onChange={handleChangeUser}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Пароль</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder='Введите пароль'
                                    value={addUserData.password}
                                    onChange={handleChangeUser}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ФИО</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fio"
                                    placeholder='Введите ФИО пользователя'
                                    value={addUserData.fio}
                                    onChange={handleChangeUser}
                                />
                            </div>
                        </div>
                        <div style={{
                            margin: '0 auto',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20
                        }}>
                            <button type="submit" className="btn btn-success">
                                Добавить
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>


            <Modal backdrop="static" show={editBaseUser} onHide={handleCloseEdit} className="custom-modal modalact"
                   style={{ marginTop: "1vw", width: "100%" }}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Редактирование пользователя</Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '1vw' }} onSubmit={updateUser2}>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Электронная почта</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder='Введите email'
                                    value={editBaseUserData.email}
                                    onChange={handleChangeUserData}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Пароль</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    placeholder='Введите пароль'
                                    value={editBaseUserData.password}
                                    onChange={handleChangeUserData}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">ФИО</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fio"
                                    placeholder='Введите ФИО пользователя'
                                    value={editBaseUserData.fio}
                                    onChange={handleChangeUserData}
                                />
                            </div>
                        </div>
                        <div style={{
                            margin: '0 auto',
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20
                        }}>
                            <button type="submit" className="btn btn-success">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </Form>
            </Modal>

        </div>
    );
};

export default Roles;
