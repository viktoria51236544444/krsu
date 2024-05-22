import React, { useEffect, useState } from 'react';

const PersonalArea = () => {
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        const loadUserInfoFromLocalStorage = () => {
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfos(storedUserInfo);
            }
        };

        loadUserInfoFromLocalStorage();
    }, []); 

    if (userInfos.length === 0) {
        return (
            <div className="personal-area-container" style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <p style={{ color: '#666', textAlign: 'center', fontSize: '18px' }}>Данные о пользователе не найдены.</p>
            </div>
        );
    }

    return (
        <div className="personal-area-container" style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            {userInfos.map((userInfo, index) => (
                <div key={index} className="personal-info" style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>ФИО:</strong> {userInfo.fio}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Email:</strong> {userInfo.email}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>ИНН:</strong> {userInfo.inn}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Организация:</strong> {userInfo.name_organization}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Адрес:</strong> {userInfo.address}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Фактический адрес:</strong> {userInfo.fact_address}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Позиция:</strong> {userInfo.position}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Роль:</strong> {userInfo.role_name}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Номер банка:</strong> {userInfo.banc_id}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Название банка:</strong> {userInfo.bank_name}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>БИК:</strong> {userInfo.bik}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Депозитный счет:</strong> {userInfo.deposit_account}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>ПИН-код менеджера:</strong> {userInfo.pin_manager}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Статус:</strong> {userInfo.status_name}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Юридический адрес:</strong> {userInfo.ur_address}</p>
                    <p style={{ color: '#333', fontSize: '16px', marginBottom: '8px' }}><strong>Веб-сайт:</strong> {userInfo.web_site}</p>
                </div>
            ))}
        </div>
    );
};

export default PersonalArea;
