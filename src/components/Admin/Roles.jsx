import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { Button, Form, FormCheck } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Sidebar from './Sidebar';
import ListGroup from 'react-bootstrap/ListGroup';

const Roles = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({});

    const defaultFormData = {};

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(selectedUser));
        if (savedData) {
            setFormData(savedData);
        } else {
            const initialFormData = {};
            Object.keys(defaultFormData).forEach(key => {
                initialFormData[key] = false;
            });
            setFormData(initialFormData);
        }
    }, [selectedUser]);

    const handleUserSelection = (user) => {
        setSelectedUser(user);
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: checked,
        }));
    };

    const handleSaveData = () => {
        localStorage.setItem(selectedUser, JSON.stringify(formData));
    };

    return (
        <div className="oll_sistem" >
            <Sidebar />
            <div className="navbar_container">

                <div style={{ display: "flex" }}>

                    <ListGroup style={{ width: '15vw', borderRight: "1px solid gray", height: '45vw' }}>
                        <ListGroup.Item disabled>Роли</ListGroup.Item>
                        <ListGroup.Item>Администраторы</ListGroup.Item>
                        <ListGroup.Item>Операторы</ListGroup.Item>
                        <ListGroup.Item>Контрагенты</ListGroup.Item>
                    </ListGroup>
                    <ListGroup style={{ width: '30vw', borderRight: "1px solid gray", height: '45vw' }}>
                        <ListGroup.Item>Что может делать</ListGroup.Item>
                     
                    </ListGroup>
                    <ListGroup style={{ width: '30vw', borderRight: "1px solid gray", height: '45vw' }}>
                        <ListGroup.Item>Список пользователей</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        </div>
    );
}

export default Roles;
