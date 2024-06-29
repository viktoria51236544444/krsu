import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../helpers/const';
import { useToast } from './ToastContext';

const contextProviderRegister = createContext();
export const UseRegister = () => useContext(contextProviderRegister);

const ContextProviderRegister = ({ children }) => {
    const { successToast, errorToast } = useToast();
    const [organizationType, setOrganizationType] = useState(null);
    const [spPurchase, setSpPurchase] = useState(null);
    const [email, setEmail] = useState(null);
    const [concurs, setConcurs] = useState(null);
    const [publick, setPublic] = useState(null);
    const [compled, setCompled] = useState(null);
    const [message, setMessage] = useState(null);
    const [detailUsers, setDetailUsers] = useState(null);
    const [users, setUsers] = useState(null);
    const [users2, setUsers2] = useState(null);
    const [users3, setUsers3] = useState(null);
    const [actt, setActt] = useState(null);
    const [reports, setReports] = useState(null);
    const [count, setCounts] = useState(0);
    const navigate = useNavigate();

    // Регистрация
    const registerUser = async (userData) => {
        try {
            const response = await axios({
                method: "POST",
                url: `${API}api/users/signup`,
                data: userData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setEmail(response.data?.user.email);
            navigate("/password");
            successToast('Успех', 'Пользователь успешно зарегистрирован!');
        } catch (error) {
            console.error('Ошибка при регистрации пользователя:', error.message);
            errorToast('Ошибка', 'Не удалось зарегистрировать пользователя!');
        }
    };

    // Отправка письма для подтверждения почты
    const sendVerificationEmail = async (data) => {
        try {
            await axios.post(`${API}api/users/verifi_email`, data);
            successToast('Успех', 'Письмо для подтверждения почты успешно отправлено!');
        } catch (error) {
            console.error('Ошибка при отправке письма для подтверждения почты:', error.message);
            errorToast('Ошибка', 'Не удалось отправить письмо для подтверждения почты!');
        }
    };

    // Вход
    const signin = async (signinData) => {
        try {
            const res = await axios.post(`${API}api/users/signin`, signinData);
            if (res.status === 200) {
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('userEmail', res.data.data.fio);
                localStorage.setItem('codeid', res.data.codeid);
                localStorage.setItem('role', res.data.data.role_name || '');

                if (res.data.data.role_name === 'Администратор' || res.data.data.role_name === 'Оператор') {
                    navigate('/concurs');
                } else {
                    navigate('/');
                }
                successToast('Успех', 'Вход выполнен успешно!');
            } else {
                errorToast('Ошибка', 'Неправильное имя пользователя или пароль');
            }
        } catch (error) {
            console.error('Ошибка при входе:', error.message);
            errorToast('Ошибка', 'Не удалось выполнить вход!');
        }
    };

    // Добавление конкурса
    const addConcurs = async (formData) => {
        try {
            const res = await axios.post(`${API}api/contest/createContest`, formData);
            successToast('Успех', 'Конкурс успешно добавлен!');
        } catch (error) {
            console.error('Ошибка при добавлении конкурса:', error.message);
            errorToast('Ошибка', 'Не удалось добавить конкурс!');
        }
    };

    // Обновление статуса конкурса
    const updateContestStatus = async (Public) => {
        try {
            await axios.post(`${API}api/contest/updateContestStatus`, Public);
            successToast('Успех', 'Статус конкурса успешно обновлен!');
        } catch (error) {
            console.error('Ошибка при обновлении статуса конкурса:', error.message);
            errorToast('Ошибка', 'Не удалось обновить статус конкурса!');
        }
    };

    // Деактивация конкурса
    const diactiveContest = async (Public) => {
        try {
            await axios.post(`${API}api/contest/diactiveContest`, Public);
            successToast('Успех', 'Конкурс успешно деактивирован!');
        } catch (error) {
            console.error('Ошибка при деактивации конкурса:', error.message);
            errorToast('Ошибка', 'Не удалось деактивировать конкурс!');
        }
    };

    // Создание заявки
    const createOrder = async (User) => {
        try {
            const res = await axios.post(`${API}api/orders/createOrder`, User);
            setMessage(res.data.result.message);
            successToast('Успех', 'Заявка успешно создана!');
        } catch (error) {
            console.error('Ошибка при создании заявки:', error.message);
            errorToast('Ошибка', 'Не удалось создать заявку!');
        }
    };

    // Обновление статуса пользователя
    const updateUserStatus = async (UserData) => {
        try {
            await axios.post(`${API}api/users/updateUserStatus`, UserData);
            successToast('Успех', 'Статус пользователя успешно обновлен!');
        } catch (error) {
            console.error('Ошибка при обновлении статуса пользователя:', error.message);
            errorToast('Ошибка', 'Не удалось обновить статус пользователя!');
        }
    };

    // Отметить конкурс как выигранный
    const wonContest = async (ConcursData) => {
        try {
            await axios.post(`${API}api/orders/wonContest`, ConcursData);
            successToast('Успех', 'Конкурс успешно отмечен как выигранный!');
        } catch (error) {
            console.error('Ошибка при отметке конкурса как выигранного:', error.message);
            errorToast('Ошибка', 'Не удалось отметить конкурс как выигранный!');
        }
    };

    // Обновление данных пользователя
    const updateUserData = async (userData) => {
        try {
            const res = await axios.post(`${API}api/users/updateUserData`, userData);
            if (res.status === 200) {
                successToast('Успех', 'Данные пользователя успешно обновлены!');
            } else {
                errorToast('Ошибка', 'Не удалось обновить данные пользователя!');
            }
        } catch (error) {
            console.error('Ошибка при обновлении данных пользователя:', error.message);
            errorToast('Ошибка', 'Не удалось обновить данные пользователя!');
        }
    };

    // Удаление пользователя
    const deleteUser2 = async (deleteData) => {
        try {
            await axios.post(`${API}api/users/deleteUser`, deleteData);
            successToast('Успех', 'Пользователь успешно удален!');
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error.message);
            errorToast('Ошибка', 'Не удалось удалить пользователя!');
        }
    };

    // Получение отчетов
    const getReports = async (repostData) => {
        try {
            const { data } = await axios.post(`${API}api/contest/getReports`, repostData);
            setReports(data.result.data);
            successToast('Успех', 'Отчеты успешно получены!');
        } catch (error) {
            console.error('Ошибка при получении отчетов:', error.message);
            errorToast('Ошибка', 'Не удалось получить отчеты!');
        }
    };

    useEffect(() => {
        const fetchOrganizationType = async () => {
            try {
                const { data } = await axios.get(`${API}api/users/getSpOrgazationType`);
                setOrganizationType(data.result.org);
            } catch (error) {
                console.error('Ошибка при получении типа организации:', error.message);
            }
        };
        fetchOrganizationType();
    }, []);

    useEffect(() => {
        const getSpPurchase = async () => {
            try {
                const { data } = await axios.get(`${API}api/contest/getSpPurchase`);
                setSpPurchase(data.result.data);
            } catch (error) {
                console.error('Ошибка при получении типов закупок:', error.message);
            }
        };
        getSpPurchase();
    }, []);

    useEffect(() => {
        const getContestList = async () => {
            try {
                const response = await axios.get(`${API}api/contest/getContestList`);
                const data = response.data;
                setConcurs(data.result.data);
                if (data.result.data.length > 0) {
                    const status_contest = data.result.data[0].status_contest;
                    localStorage.setItem('status_contest', status_contest);
                }
            } catch (error) {
                console.error('Ошибка при получении списка конкурсов:', error);
            }
        };
        getContestList();
    }, []);

    useEffect(() => {
        const getPublicatedContest = async () => {
            try {
                const res = await axios.get(`${API}api/contest/getPublicatedContest`);
                setPublic(res.data.result.contestList);
            } catch (error) {
                console.error('Ошибка при получении опубликованных конкурсов:', error);
            }
        };
        getPublicatedContest();
    }, []);

    const getUserInfo = async (codeId) => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserInfo/${codeId}`);
            console.log(data);
        } catch (error) {
            console.error('Ошибка при получении информации о пользователе:', error);
        }
    };

    const getUserList = async () => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserList`);
            setUsers(data.users.users);
        } catch (error) {
            console.error('Ошибка при получении списка пользователей:', error);
        }
    };

    const contestFilter = async (codeId) => {
        try {
            const { data } = await axios.get(`${API}api/contest/contestFilter/${codeId}`);
            setCompled(data.result.data);
        } catch (error) {
            console.error('Ошибка при фильтрации конкурса:', error);
        }
    };

    const getOrderDetails = async (codeId) => {
        try {
            const { data } = await axios.get(`${API}api/orders/getOrderDetails/${codeId}`);
            setDetailUsers(data.result.data);
        } catch (error) {
            console.error('Ошибка при получении деталей заявки:', error);
        }
    };

    const getByStatus = async (status) => {
        try {
            const { data } = await axios.get(`${API}api/users/getByStatus/${status}`);
            setUsers2(data.result.result);
        } catch (error) {
            console.error('Ошибка при получении пользователей по статусу:', error);
        }
    };

    const getByStatus2 = async (status) => {
        try {
            const { data } = await axios.get(`${API}api/users/getByStatus/${status}`);
            setUsers3(data.result.result);
        } catch (error) {
            console.error('Ошибка при получении пользователей по статусу:', error);
        }
    };

    const getFiles = async (status) => {
        try {
            const { data } = await axios.get(`${API}api/files/getFiles/${status}`);
            setActt(data.result.updateFiles);
        } catch (error) {
            console.error('Ошибка при получении файлов:', error);
        }
    };

    const getCounts = async () => {
        try {
            const res = await axios.get(`${API}api/contest/getCount`);
            console.log(res.data.result.data)
            setCounts(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }
    const values = {
        registerUser,
        organizationType,
        addConcurs,
        signin,
        spPurchase,
        sendVerificationEmail,
        email,
        concurs,
        updateContestStatus,
        publick,
        contestFilter,
        compled,
        createOrder,
        message,
        getOrderDetails,
        detailUsers,
        users,
        getUserList,
        getByStatus,
        users2,
        users3,
        updateUserStatus,
        getByStatus2,
        wonContest,
        getFiles,
        actt,
        count,
        getCounts,
        diactiveContest,
        setPublic,
        updateUserData,
        deleteUser2,
        getReports,
        reports,
    };

    return (
        <contextProviderRegister.Provider value={values}>
            {children}
        </contextProviderRegister.Provider>
    );
};

export default ContextProviderRegister;
