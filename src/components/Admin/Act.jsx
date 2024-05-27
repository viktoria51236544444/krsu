import React, {useState, useEffect} from 'react';
import './concurs.css';
import {Button, Modal, Form} from 'react-bootstrap';
import Sidebar from './Sidebar';
import axios from 'axios';
import {UseRegister} from '../../Context/ContextProviderRegister';
import {CloudArrowDown, FileArrowDown, FilePdf} from "@phosphor-icons/react";

const Act = () => {
    const {getFiles, actt} = UseRegister()
    console.log(actt);

    const [addAct, setAddAct] = useState({
        fileDescription: "",
        file: null
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const fetchData = async () => {
        try {
            const {data} = await axios.get(`http://212.112.105.196:3457/api/files`);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "file") {
            setAddAct({...addAct, file: files[0]});
        } else {
            setAddAct({...addAct, [name]: value});
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("fileDescription", addAct.fileDescription);
        formData.append("file", addAct.file);

        try {
            const {data} = await axios.post(`http://212.112.105.196:3457/api/files/upload`, formData);

            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (codeid) => {
        try {
            const data = {
                codeFile: codeid
            }
            const response = await axios.post('http://212.112.105.196:3457/api/files/deleteFile', data)

            if(response.status === 200 ){
                console.log('Success')
            }else {
                alert('ошибка при удалении файла')
            }
        }catch (error){
            console.log(error)
        }
    };

    const handleDownload = (path) => {
        console.log(path)
    };

    return (
        <div className="oll_sistem">
            <Sidebar/>
            <div className="navbar_container">
                <div style={{
                    background: 'white',
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.6vw"
                }}>
                    <div>
                        <div className="pills-outline">
                            <button className="tab-button"
                                    style={{color: "#0D6EFD", background: "White"}}>Опубликованные
                            </button>
                            {/* <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Удаленные</button> */}
                            {/* <button className="tab-button" style={{ color: "#333333", background: "#F0F0F0" }}>Архив</button> */}
                        </div>
                    </div>
                    <div>
                        <div>admin@gmail.com</div>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-header" style={{background: "white"}}>
                            <Button variant="success" size="sm" onClick={handleShow}>Новый акт</Button>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered first">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Название файла</th>
                                        <td>Действие</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {actt && actt.map((item, index) => (
                                        <tr key={index}>
                                            <td><p style={{
                                                color: "black",
                                                fontSize: 14,
                                                margin: 0,
                                                padding: 0
                                            }}>{index + 1}</p></td>
                                            <td>
                                                <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
                                                    <FilePdf  size={32} color="#3d3d3d"/>
                                                    <a style={{color: "black", fontSize: 14, margin: 0, padding: 0}}
                                                       href={item.path} rel="noopener noreferrer">{item.description}</a>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{display: "flex", flexDirection: 'row', gap: 10}}>
                                                    {/*<Button variant="success"*/}
                                                    {/*        size="sm"*/}
                                                    {/*        style={{padding: '0 10px', display: 'flex', flexDirection: "row", gap: 8, alignItems: 'center'}}*/}
                                                    {/*        onClick={() => handleDownload(item.path)}*/}
                                                    {/*>*/}
                                                    {/*    <CloudArrowDown size={32} color="#fff" />*/}
                                                    {/*    Скачать*/}
                                                    {/*</Button>*/}
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        style={{padding: '0 10px', display: 'flex', flexDirection: "row", gap: 8, alignItems: 'center'}}
                                                        onClick={() => handleDelete(item.codeid)}
                                                    >
                                                        Удалить
                                                    </Button>
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
            <Modal show={show} onHide={handleClose} className="custom-modal" style={{marginTop: "8vw"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Новый акт</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFileDescription">
                            <Form.Label>Описание файла</Form.Label>
                            <Form.Control
                                type="text"
                                name="fileDescription"
                                value={addAct.fileDescription}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile">
                            <Form.Label>Файл</Form.Label>
                            <Form.Control
                                type="file"
                                name="file"
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Act;
