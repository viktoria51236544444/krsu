import React, { useState, useEffect } from 'react';
import {ListGroup, FormCheck, Button} from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import  './Roles.css'

const Roles = () => {
    const [users, setUsers] = useState([]);
    const [selectedRolID, setSelectedRoleID] = useState(1);
    const [spRoles, setSpRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    useEffect(() => {
        addUsersByRole();
        getFunctions();
    }, [selectedRolID]);

    const addUsersByRole = async () => {
        try {
            const response = await axios.get(`http://212.112.105.196:3457/api/users/getUsersByRole/${selectedRolID}`);
            if (response.status === 200) {
                setUsers(response.data.result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(selectedRoles)
    const handleCheckboxChange = (codeid) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.some(role => role.functuin_id === parseInt(codeid) && role.role_id === selectedRolID)
                ? prevSelectedRoles.filter(role => !(role.functuin_id === parseInt(codeid) && role.role_id === selectedRolID))
                : [...prevSelectedRoles, { codeid, role_id: selectedRolID, functuin_id: parseInt(codeid) }]
        );
    };

    const getFunctions = async () => {
        try {
            const response = await axios.get('http://212.112.105.196:3457/api/contest/getSpPurchase');
            if (response.status === 200) {
                setSpRoles(response.data.result.data.functions);
                setSelectedRoles(response.data.result.data.functionsRight)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getUsersAndRoles = (number) => {
        setSelectedRoleID(number);
    };

    const saveRolesAccess = async () => {
        try {
            const responce = await axios.post(`http://212.112.105.196:3457/api/users/addUserRoles`, selectedRoles)
            if(responce.status === 200) {
                alert('Успешно сохранено')
            }
        }catch (error){
            console.log(error)
        }
        console.log(selectedRoles)
    };
    return (
        <div className="oll_sistem">
            <Sidebar />
            <div className="navbar_container">
                <div style={{ display: 'flex' }}>
                    <ListGroup style={{ width: '15vw', borderRight: '1px solid gray', height: '100vh' }}>
                        <ListGroup.Item disabled>Роли</ListGroup.Item>
                        <ListGroup.Item onClick={() => getUsersAndRoles(1)}>Администраторы</ListGroup.Item>
                        <ListGroup.Item onClick={() => getUsersAndRoles(6)}>Операторы</ListGroup.Item>
                        <ListGroup.Item onClick={() => getUsersAndRoles(5)}>Контрагенты</ListGroup.Item>
                    </ListGroup>
                    <ListGroup style={{ width: '30vw', borderRight: '1px solid gray', height: '100vh' }} className='action_save'>
                        <div >
                        <ListGroup.Item>Права роли</ListGroup.Item>
                        {spRoles && spRoles.map((role, index) => (
                            <div key={index} style={{ padding: '5px 10px' }}>
                                <FormCheck
                                    label={role.function_name}
                                    name="addUsers"
                                    checked={selectedRoles.some(selectedRole => selectedRole.functuin_id === parseInt(role.codeid) && selectedRole.role_id === selectedRolID)}
                                    onChange={() => handleCheckboxChange(role.codeid)}
                                />
                            </div>
                        ))}
                        </div>
                        <div className='saveButton'>
                            <Button variant="success" onClick={() => {saveRolesAccess()}}>Сохранить</Button>
                        </div>
                    </ListGroup>
                    <ListGroup style={{ width: '30vw', borderRight: '1px solid gray', height: '100vh' }}>
                        <ListGroup.Item>Список пользователей</ListGroup.Item>
                        {users && (
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Электронная почта</th>
                                        <th>Пароль</th>
                                    </tr>
                                    </thead>
                                    <tbody className='main-table'>
                                    {users.map((user, index) => (
                                        <tr key={index} style={{ cursor: 'pointer' }}>
                                            <td>{index + 1}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
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
    );
};

export default Roles;
