import React, { useState } from 'react';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from "react-bootstrap";
import { BsPaperclip } from "react-icons/bs";

const Register = () => {
    const navigate = useNavigate();
    const { organizationType, registerUser, spPurchase } = UseRegister();
    const [formState, setFormState] = useState({
        organization_type_id: '',
        email: '',
        password: '',
        inn: '',
        name_organization: '',
        pin_manager: '',
        fio: '',
        position_manager: '',
        ur_address: '',
        fact_address: '',
        address: '',
        banc: '',
        deposot_account: '',
        bik: '',
        web_site: '',
        pin_sales_manager: '',
        fio_manager: '',
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
        fio: '',
        position_manager: '',
        ur_address: '',
        fact_address: '',
        address: '',
        banc: '',
        deposot_account: '',
        bik: '',
        web_site: '',
        pin_sales_manager: '',
        fio_manager: '',
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

        validateField(name, value);
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormState((prevState) => ({
            ...prevState,
            files: [...prevState.files, ...files]
        }));
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
                navigate('/password');
            } catch (error) {
                alert("Такой пользователь уже существует, попробуйте войти");
            }
        }
    };

    const onRemove2 = (index) => {
        const updated = [...selectedFiles];
        updated.splice(index, 1);

        setSelectedFiles(updated);
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
            const error = validateField(fieldName, formState[fieldName]);
            if (error) {
                updatedErrors[fieldName] = error;
                isValid = false;
            }
        });

        setErrors((prevState) => ({
            ...prevState,
            ...updatedErrors
        }));

        return isValid;
    };

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'inn':
                if (!/^\d{12}$/.test(value)) {
                    error = 'ИНН должен содержать ровно 12 цифр';
                }
                break;
            case 'bik':
                if (!/^\d{9}$/.test(value)) {
                    error = 'БИК должен содержать ровно 9 цифр';
                }
                break;
            case 'deposot_account':
                if (!/^\d{20}$/.test(value)) {
                    error = 'Расчетный счет должен содержать ровно 20 цифр';
                }
                break;
            case 'phone_manager':
            case 'work_phone_number_manager':
                if (!/^\d{12}$/.test(value)) {
                    error = 'Телефон не должен превышать 12 цифр';
                }
                break;
            case 'password':
            case 'password_manager':
                if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z]).{6,}/.test(value)) {
                    error = 'Пароль должен содержать цифры, буквы латиницы и хотя бы одну заглавную букву';
                }
                break;
            default:
                break;
        }
        setErrors((prevState) => ({
            ...prevState,
            [name]: error
        }));
    };


    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileSelection = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(prevFiles => [...prevFiles, ...files]);
        handleFileChange(event);
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
                    'fio',
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
                    'fio_manager',
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
    console.log(formState);

    return (
        <div className="container mt-5">
            <div className="card p-4" style={{ borderRadius: '25px', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <h3>Регистрация юридических лиц</h3>
                </div>
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
                    <form onSubmit={handleSubmit}>
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
                                        placeholder='996501123321'
                                    />
                                    {errors.phone_manager && (
                                        <div className="text-danger">{errors.phone_manager}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Рабочий телефон руководителя отдела закупок</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="work_phone_number_manager"
                                        value={formState.work_phone_number_manager}
                                        onChange={handleChange}
                                        placeholder='996501123321'
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
                                                        <div style={{ display: "flex", flexDirection: 'row', gap: 10, margin: '10px 0' }}>
                                                            <li key={index} className="list-group-item">
                                                                {file.name}
                                                            </li>
                                                            <Button variant="danger" size="sm" onClick={() => onRemove2(index)}>X</Button>
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

                        <div className="mt-4" style={{ width: 300, margin: '0 auto', display: "flex", flexDirection: 'row', gap: 15, alignItems: "center", justifyContent: 'center' }}>
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
                                    Геристрация
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>


    );
};

export default Register;
