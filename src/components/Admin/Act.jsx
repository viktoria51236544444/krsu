import React, { useState, useEffect } from 'react';
import './concurs.css';
import { Button, Modal, Form } from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { CloudArrowDown, FileArrowDown, FilePdf } from "@phosphor-icons/react";
import { BsPaperclip } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {Power} from "phosphor-react";

const Act = () => {
    const { getFiles, actt } = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    const handleDownload = (path) => {
        console.log(path)
    };
    console.log(actt);
    const [show2, setShow2] = useState(false);
    const [selectedFileCodeId, setSelectedFileCodeid] = useState(null)
    const handleClose2 = () => setShow2(false);
    const handleShow2 = (codeid) => {
        setSelectedFileCodeid(codeid)
        setShow2(true);
    }

    const [addAct, setAddAct] = useState({
        fileDescription: "",
        file: null
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`http://212.112.105.196:3457/api/files`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFiles(1);
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setAddAct({ ...addAct, file: files[0] });
        } else {
            setAddAct({ ...addAct, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("fileDescription", addAct.fileDescription);
        formData.append("file", addAct.file);

        try {
            const { data } = await axios.post(`http://212.112.105.196:3457/api/files/upload`, formData);

            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const data = {
                codeFile: selectedFileCodeId
            }
            const response = await axios.post('http://212.112.105.196:3457/api/files/deleteFile', data)
            handleClose2()
            getFiles(1)
            fetchData()
            console.log(response);

            if (response.status === 200) {
                console.log('Success')
            } else {
                alert('ошибка при удалении файла')
            }
        } catch (error) {
            console.log(error)
        }
    };



    const userRole = localStorage.getItem('role');


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

                    </div>
                    <div style={{
                        display: "flex",
                        textAlign: "center",
                        gap: '10px',
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div>{userEmail}</div>
                        <Link to={"/"}>
                            <button
                                className="btn"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'transparent'
                                }}
                            >
                                <Power size={30} color="red" />
                            </button>

                        </Link>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header" style={{ background: "white" }}>
                            <Button variant="success" size="sm" onClick={handleShow}> + Добавить акт</Button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered first">
                                    <thead>
                                        <tr>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actt && actt.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div style={{ display: "flex", flexDirection: 'row', gap: 10 }}>
                                                        <FilePdf size={32} color="#3d3d3d" />
                                                        <a style={{ color: "black", fontSize: 14, margin: 0, padding: 0 }}
                                                            href={item.path} rel="noopener noreferrer">{item.description}</a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div style={{ display: "flex", flexDirection: 'row', gap: 10 }}>
                                                        {userRole !== 'Оператор' && (
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                style={{ padding: '0 10px', display: 'flex', flexDirection: "row", gap: 8, alignItems: 'center' }}
                                                                onClick={ () => handleShow2(item.codeid)}
                                                            >
                                                                Удалить
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: "18px" }}>Вы действительно хотите удалить нормативно правовой акт?</Modal.Title>
                </Modal.Header>

                <Modal.Footer>

                    <Button variant="danger"
                            size="sm" onClick={() => handleDelete()}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose} className="custom-modal ">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: '18px' }}>Добавление нормативно правового акта</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '20px' }}>
                    <Form>
                        <Form.Group controlId="formFileDescription">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                type="text"
                                name="fileDescription"
                                value={addAct.fileDescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="files" style={{ marginTop: "1vw" }}>
                            <Form.Label style={{ display: 'block' }}>
                                <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                Прикрепить файлы
                            </Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleChange}
                                multiple
                                style={{ display: "none" }}
                            />

                            {addAct.file && (
                                <div>
                                    <ul>
                                        <div className='d-flex flex-row gap-1'>
                                        <BsPaperclip style={{ marginRight: '5px', fontSize: '20px' }} />
                                        <p>{addAct.file.name}</p>
                                        </div>
                                    </ul>
                                </div>
                            )}

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size='sm' onClick={handleSubmit}>
                        Опубликовать
                    </Button>
                </Modal.Footer>
            </Modal>



        </div>
    );
}

export default Act;
