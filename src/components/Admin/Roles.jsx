import React, { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink } from 'react-bootstrap';
import "./Sidebar.css";
import { Link } from 'react-router-dom';
import { Button, Form, FormCheck } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Sidebar from './Sidebar';

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
          <Sidebar/>
            <div className="navbar_container">
               
                <div style={{ display: "flex" }}>
                    <Accordion style={{ width: '30vw', borderRight: "1px solid gray", height: '45vw' }}>
                        <p >Роли</p>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Администраторы</Accordion.Header>
                            <Accordion.Body>
                                <li id="admin1" onClick={() => handleUserSelection("admin1")} style={{ color: selectedUser === "admin1" ? "blue" : "black" }}>Владимир Зуев</li>
                                <li id="admin2" onClick={() => handleUserSelection("admin2")} style={{ color: selectedUser === "admin2" ? "blue" : "black" }}>Инга Югай</li>
                                <li id="admin3" onClick={() => handleUserSelection("admin3")} style={{ color: selectedUser === "admin3" ? "blue" : "black" }}>Сайора Арыстанбекова</li>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Поставщики</Accordion.Header>
                            <Accordion.Body>
                                <li id="supplier1" onClick={() => handleUserSelection("supplier1")} style={{ color: selectedUser === "supplier1" ? "blue" : "black" }}>Дамир Муруталиев</li>
                                <li id="supplier2" onClick={() => handleUserSelection("supplier2")} style={{ color: selectedUser === "supplier2" ? "blue" : "black" }}>Кубанычбек Тагаев</li>
                                <li id="supplier3" onClick={() => handleUserSelection("supplier3")} style={{ color: selectedUser === "supplier3" ? "blue" : "black" }}>Зарима Тилигенова</li>
                            </Accordion.Body>
                        </Accordion.Item>
                        
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Исполнители</Accordion.Header>
                            <Accordion.Body>
                                <li id="performer1" onClick={() => handleUserSelection("performer1")} style={{ color: selectedUser === "performer1" ? "blue" : "black" }}>Нуржан Таалайбекова</li>
                                <li id="performer2" onClick={() => handleUserSelection("performer2")} style={{ color: selectedUser === "performer2" ? "blue" : "black" }}>Эльнура Жумабекова</li>
                                <li id="performer3" onClick={() => handleUserSelection("performer3")} style={{ color: selectedUser === "performer3" ? "blue" : "black" }}>Улан Асадибеков</li>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Заказчики</Accordion.Header>
                            <Accordion.Body>
                                <li id="customer1" onClick={() => handleUserSelection("customer1")} style={{ color: selectedUser === "customer1" ? "blue" : "black" }}>Данияр Астаров</li>
                                <li id="customer2" onClick={() => handleUserSelection("customer2")} style={{ color: selectedUser === "customer2" ? "blue" : "black" }}>Зинаида Бишимкулова</li>
                                <li id="customer3" onClick={() => handleUserSelection("customer3")} style={{ color: selectedUser === "customer3" ? "blue" : "black" }}>Замира Токтосунова</li>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    {selectedUser && (
                        <div className="container_information_client">
                            {selectedUser.startsWith("admin") && (
                                <div className="admin" style={{ marginLeft: "1vw", marginTop: "1vw", padding:"10px" , width: "40vw" }}>
                                    <FormCheck
                                        label="Добавление пользователей"
                                        name="addUsers"
                                        checked={formData.addUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Удаление пользователей"
                                        name="deleteUsers"
                                        checked={formData.deleteUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавление конкурсов/тендеров"
                                        name="addCompetitions"
                                        checked={formData.addCompetitions || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Управление ролями"
                                        name="manageRoles"
                                        checked={formData.manageRoles || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавлять нормативный акт"
                                        name="addRegulation"
                                        checked={formData.addRegulation || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавление организаций"
                                        name="addOrganization"
                                        checked={formData.addOrganization || false}
                                        onChange={handleCheckboxChange}
                                    />                                  
                                    <div className="admin__checkbox-button" style={{ marginTop: "10vw" }}>
                                        <Button variant="success" size="sm" onClick={handleSaveData}>Сохранить</Button>
                                        <Button variant="success" size="sm" style={{marginLeft: "1vw"}}>Удалить</Button>
                                    </div>
                                </div>
                            )}
                            {selectedUser.startsWith("supplier") && (
                                <div className="supplier" style={{ marginLeft: "1vw", marginTop: "1vw", padding:"10px", width: "40vw" }}>
                                    <FormCheck
                                        label="Добавление пользователей"
                                        name="addUsers"
                                        checked={formData.addUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Удаление пользователей"
                                        name="deleteUsers"
                                        checked={formData.deleteUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавление конкурсов/тендеров"
                                        name="addCompetitions"
                                        checked={formData.addCompetitions || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Управление ролями"
                                        name="manageRoles"
                                        checked={formData.manageRoles || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавлять нормативный акт"
                                        name="addRegulation"
                                        checked={formData.addRegulation || false}
                                        onChange={handleCheckboxChange}
                                    />
                                     <FormCheck
                                        label="Добавление организаций"
                                        name="addOrganization"
                                        checked={formData.addOrganization || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className="admin__checkbox-button" style={{ marginTop: "10vw" }}>
                                        <Button variant="success" size="sm" onClick={handleSaveData}>Сохранить</Button>
                                        <Button variant="success" size="sm" style={{marginLeft: "1vw"}}>Удалить</Button>
                                    </div>
                                </div>
                            )}
                            {selectedUser.startsWith("performer") && (
                                <div className="performer" style={{ marginLeft: "1vw", marginTop: "1vw", padding:"10px", width: "40vw" }}>
                                    <FormCheck
                                        label="Добавление пользователей"
                                        name="addUsers"
                                        checked={formData.addUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Удаление пользователей"
                                        name="deleteUsers"
                                        checked={formData.deleteUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавление конкурсов/тендеров"
                                        name="addCompetitions"
                                        checked={formData.addCompetitions || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Управление ролями"
                                        name="manageRoles"
                                        checked={formData.manageRoles || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавлять нормативный акт"
                                        name="addRegulation"
                                        checked={formData.addRegulation || false}
                                        onChange={handleCheckboxChange}
                                    />
                                     <FormCheck
                                        label="Добавление организаций"
                                        name="addOrganization"
                                        checked={formData.addOrganization || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className="admin__checkbox-button" style={{ marginTop: "10vw" }}>
                                        <Button variant="success" size="sm" onClick={handleSaveData}>Сохранить</Button>
                                        <Button variant="success" size="sm" style={{marginLeft: "1vw"}}>Удалить</Button>
                                    </div>
                                </div>
                            )}
                            {selectedUser.startsWith("customer") && (
                                <div className="customer" style={{ marginLeft: "1vw", marginTop: "1vw", padding:"10px", width: "40vw" }}>
                                    <FormCheck
                                        label="Добавление пользователей"
                                        name="addUsers"
                                        checked={formData.addUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Удаление пользователей"
                                        name="deleteUsers"
                                        checked={formData.deleteUsers || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавление конкурсов/тендеров"
                                        name="addCompetitions"
                                        checked={formData.addCompetitions || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Управление ролями"
                                        name="manageRoles"
                                        checked={formData.manageRoles || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <FormCheck
                                        label="Добавлять нормативный акт"
                                        name="addRegulation"
                                        checked={formData.addRegulation || false}
                                        onChange={handleCheckboxChange}
                                    />
                                     <FormCheck
                                        label="Добавление организаций"
                                        name="addOrganization"
                                        checked={formData.addOrganization || false}
                                        onChange={handleCheckboxChange}
                                    />
                                    <div className="admin__checkbox-button" style={{ marginTop: "10vw" }}>
                                        <Button variant="success" size="sm" onClick={handleSaveData}>Сохранить</Button>
                                        <Button variant="success" size="sm" style={{marginLeft: "1vw"}}>Удалить</Button>
                                    </div>
                                </div>

                            )}
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}

export default Roles;
