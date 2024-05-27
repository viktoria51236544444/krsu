import React, {useEffect, useState} from 'react';
import Footer from './Footer';

const PersonalArea = () => {
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        const loadUserInfoFromLocalStorage = () => {
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                console.log(storedUserInfo)
                setUserInfos(storedUserInfo);
            }
        };

        loadUserInfoFromLocalStorage();
    }, []);

    if (userInfos.length === 0) {
        return (
            <div className="personal-area-container" style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <p style={{color: '#666', textAlign: 'center', fontSize: '18px'}}>Данные о пользователе не найдены.</p>
            </div>
        );
    }

    console.log(userInfos)
    return (
        <div>
            <div className="personal-area-container" style={{
                backgroundColor: '#f5f5f5',
                padding: '20px',
                borderRadius: '8px',
            }}>
                {userInfos.map((userInfo, index) => (
                    <div key={index} className="personal-info" style={{
                        marginBottom: '20px',
                        padding: '15px',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                    }}>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>ФИО:</strong> {userInfo.fio}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Электронная почта:</strong> {userInfo.email}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>ИНН:</strong> {userInfo.inn}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Организация:</strong> {userInfo.name_organization}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Тип организации:</strong> {userInfo.type_organization}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Позиция:</strong> {userInfo.position}</p>

                        <p style={{color: '#06d200', fontSize: '16px', marginBottom: '8px',}}>
                            <strong style={{color: '#333'}}>Статус:</strong> {userInfo.status_name}</p>
                        <hr/>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Электронная почта менеджера по закупу:</strong> {userInfo.manager.email}</p>

                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>ФИО менеджера по закупу:</strong> {userInfo.manager.fio}</p>

                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Номер телефона менеджера по закупу:</strong> {userInfo.manager.phone_number}</p>

                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Рабочий номер телефона:</strong> {userInfo.manager.work_phone_number}</p>
                        <hr/>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>Адрес:</strong> {userInfo.address}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}><strong>Фактический
                            адрес:</strong> {userInfo.fact_address}</p>
                        <hr/>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}><strong>Название
                            банка:</strong> {userInfo.banc_name}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                            <strong>БИК:</strong> {userInfo.bik}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}><strong>Депозитный
                            счет:</strong> {userInfo.deposit_account}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}><strong>ПИН
                            менеджера:</strong> {userInfo.pin_manager}</p>
                        <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}><strong>Юридический
                            адрес:</strong> {userInfo.ur_address}</p>
                        {userInfo.web_site ? (<>
                            <p style={{color: '#333', fontSize: '16px', marginBottom: '8px'}}>
                                <strong>Веб-сайт:</strong> {userInfo.web_site}</p>
                        </>) : <div></div>}

                    </div>
                ))}
            </div>
        
        </div>

    );
};

export default PersonalArea;
