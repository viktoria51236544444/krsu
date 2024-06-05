import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../helpers/const';

const contextProviderRegister = createContext();
export const UseRegister = () => useContext(contextProviderRegister);

const ContextProviderRegister = ({ children }) => {
    const [organizationType, setOrganizationType] = useState(null);
    const [spPurchase, setSpPurchase] = useState(null);
    const [email, setEmail] = useState(null);
    const [concurs, SetConcurs] = useState(null);
    const [publick, SetPublic] = useState(null);
    const [compled, SetCompled] = useState(null);
    const [message, SetMessage] = useState(null);
    const [detailUsers, SetDetailUsers] = useState(null);
    const [users, SetUsers] = useState(null);
    const [users2, SetUsers2] = useState(null);
    const [users3, SetUsers3] = useState(null);
    const [actt, setActt] = useState(null);
    const [reports, setReports] = useState(null);
    const [count, setCounts] = useState(0)
    const navigate = useNavigate()

    // console.log(concurs);
    // console.log(publick);

    //! РЕГИСТРАЦИЯ
    //* Функция для отправки данных пользователя при регистрации
    const registerUser = async (userData) => {
        try {
            const response = await axios({
                method: "POST",
                url: `${API}api/users/signup`,
                data: userData,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setEmail(response.data?.user.email);
            console.log(response.data?.user.email);
            console.log(response.data?.user);
            navigate("/password");
            console.log(response);

        } catch (error) {
            console.log('Error registering user:', error.message);
            console.log(error);
            throw error;
        }
    };

    //* Загрузка типа организации
    useEffect(() => {
        const fetchOrganizationType = async () => {
            try {
                const { data } = await axios.get(`${API}api/users/getSpOrgazationType`);
                setOrganizationType(data.result.org);
            } catch (error) {
                console.error('Error fetching organization type:', error.message);
            }
        };


        fetchOrganizationType();
    }, []);

    // * подтверждение почты
    const sendVerificationEmail = async (data) => {
        try {
            const response = await axios.post(`${API}api/users/verifi_email`, data);
            // console.log('Email verification request sent successfully:', response.data);
            // console.log(response.data.codeid);
            // localStorage.setItem('authToken', response.data.result.accessToken);
            // localStorage.setItem('userEmail', data.email);
            // localStorage.setItem('codeid', response.data.result.codeid);
        } catch (error) {
            console.error('Ошибка при отправке запроса на верификацию email:', error.message);
            throw error;
        }
    };


    // !* Авторизация
    const signin = async (signinData) => {
        try {
            const res = await axios.post(`${API}api/users/signin`, signinData);
            console.log(res);

            localStorage.setItem('authToken', res.data.token);
            localStorage.setItem('userEmail', res.data.data.fio);
            localStorage.setItem('codeid', res.data.codeid);
            localStorage.setItem('role', res.data.data.role_name || '');

            if (res.data.data.role_name === 'Администратор' || res.data.data.role_name === 'Оператор') {
                navigate('/concurs');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };


    //* стягивание данных конкретного юзера по codeId

    const getUserInfo = async (codeId) => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserInfo/${codeId}`)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const getUserList = async () => {
        try {
            const { data } = await axios.get(`${API}api/users/getUserList`)
            SetUsers(data.users.users);
        } catch (error) {
            console.log(error);
        }
    }



    // ! КОНКУРСЫ
    //* добавление конкурса
    const addConcurs = async (formData) => {
        try {
            const res = await axios.post(`${API}api/contest/createContest`, formData);
            console.log(res.data.result.status);


        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };

    //
    // useEffect(() => {
    //     getCounts()
    // }, []);

    const getCounts = async () => {
        try {
            const res = await axios.get(`${API}api/contest/getCount`);
            console.log(res.data.result.data)
            setCounts(res.data.result.data)
        } catch (error) {
            console.log(error)
        }
    }

    //* стягивает селекты для конкурсов
    useEffect(() => {
        const getSpPurchase = async () => {
            try {
                const { data } = await axios.get(`${API}api/contest/getSpPurchase`);
                setSpPurchase(data.result.data)
                // console.log(spPurchase);
            } catch (error) {
                console.log('Error fetching organization type:', error.message);
            }
        };
        getSpPurchase()

    }, []);

    //* стягивание конкурсов (вывод)
    useEffect(() => {
        const getContestList = async () => {
            try {
                const response = await axios.get(`${API}api/contest/getContestList`);
                const data = response.data;
                SetConcurs(data.result.data);
                // console.log(data.result.data);
                if (data.result.data.length > 0) {
                    const status_contest = data.result.data[0].status_contest;
                    localStorage.setItem('status_contest', status_contest);
                }
            } catch (error) {
                console.error('Error fetching contest list:', error);
            }
        };

        getContestList();
    }, []);

    // * фильтрация конкурсов по статусу
    const updateContestStatus = async (Public) => {
        try {
            const res = await axios.post(`${API}api/contest/updateContestStatus`, Public);
            console.log(res.data);
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };

    //* ДЕАКТИВИРОВАНИЕ
    const diactiveContest = async (Public) => {
        try {
            const res = await axios.post(`${API}api/contest/diactiveContest`, Public);
            console.log(res.data);
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };

    //* стягивание опубликованных конкурсов
    useEffect(() => {
        const getPublicatedContest = async () => {
            try {
                const res = await axios.get(`${API}api/contest/getPublicatedContest`)
                SetPublic(res.data.result.contestList);
                // console.log(res.data.result);
            } catch (error) {
                console.error('Error fetching contest list:', error);
            }
        };

        getPublicatedContest();
    }, []);


    //* стягивание конкурсов по id
    const contestFilter = async (codeId) => {
        console.log('contestFilter', codeId)
        try {
            const { data } = await axios.get(`${API}api/contest/contestFilter/${codeId}`)
            SetCompled(data.result.data);
            console.log(data.result.data);
        } catch (error) {
            console.log(error);
        }
    }

    //* отправка данных при подачи заявки пользоватлем
    const createOrder = async (User) => {
        try {
            const res = await axios.post(`${API}api/orders/createOrder`, User);
            SetMessage(res.data.result.message);
        } catch (error) {
            console.log('Error during sign-in:', error);
        }
    };

    //* детальный просмотр конкурса
    const getOrderDetails = async (codeId) => {
        try {
            const { data } = await axios.get(`${API}api/orders/getOrderDetails/${codeId}`)
            SetDetailUsers(data.result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getByStatus = async (status) => {
        try {
            console.log(`${API}api/users/getByStatus/${status}`)
            const { data } = await axios.get(`${API}api/users/getByStatus/${status}`)
            SetUsers2(data.result.result);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    const getByStatus2 = async (status) => {
        try {
            const { data } = await axios.get(`${API}api/users/getByStatus/${status}`)
            SetUsers3(data.result.result);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }


    const updateUserStatus = async (UserData) => {
        try {
            const { data } = await axios.post(`${API}api/users/updateUserStatus`, UserData);
            console.log(data);
        } catch (error) {
            console.log('Error during sign-in:', error);
        }
    };
    const wonContest = async (ConcursData) => {
        try {
            const { data } = await axios.post(`${API}api/orders//wonContest`, ConcursData);
            console.log(data);
        } catch (error) {
            console.log('Error during sign-in:', error);
        }
    };

    const getFiles = async (status) => {
        try {
            const { data } = await axios.get(`${API}api/files/getFiles/${status}`)
            setActt(data.result.updateFiles);
            console.log(data.result.updateFiles);

        } catch (error) {
            console.log(error);
        }
    }

    // * редактирование данных пользователя

    const updateUserData = async (userData) => {
        try {
            const res = await axios.post(`${API}api/users/updateUserData`, userData);
            console.log(res);
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };
    const deleteUser2 = async (deleteData) => {
        try {
            const res = await axios.post(`${API}api/users/deleteUser`, deleteData);
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };

    const getReports = async (repostData) => {
        try {
            const {data} = await axios.post(`${API}api/contest/getReports`, repostData);
            setReports(data.result.data);
        } catch (error) {
            console.log('Error during sign-in:', error.message);
        }
    };


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
        SetPublic,
        updateUserData,
        deleteUser2,
        getReports, 
        reports
    };
    return (
        <contextProviderRegister.Provider value={values}>
            {children}
        </contextProviderRegister.Provider>
    );
};

export default ContextProviderRegister;


