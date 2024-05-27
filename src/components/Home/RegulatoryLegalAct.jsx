import React, {useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import "./Info.css"
import Footer from './Footer';
import  axios from 'axios';
import {FileArrowDown} from "@phosphor-icons/react";



const RegulatoryLegalAct = () => {
    const [files , setFiles] = useState([])

    useEffect(() => {
        getDataFiles()
    }, [])

    const getDataFiles = async  () => {
        try {
            const response = await axios.get('http://212.112.105.196:3457/api/files/getFiles/1')

            if(response.status === 200) {
                const data = response.data.result.updateFiles
                setFiles(data)
            }else {
                console.log(response.data.result)
            }
        }catch (error){
            alert('Ошибка при получение данных')
        }
    }
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{marginTop: "2vh"}}>
            <div className="card w-100 " style={{border: "none"}}>
                <div className="card-body ">

                    <div className="container_information_client " style={{maxHeight: "800px", overflowY: "auto"}}>
                        <div className="table-responsive mt-2">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th><p style={{fontSize: 16}}>№</p></th>
                                    <th><p style={{fontSize: 16}}>Наименование файла</p></th>
                                </tr>
                                </thead>
                                <tbody className='file-table'>
                                { files?.map((file, index)=> (
                                    <tr key={index}>
                                        <td><p style={{fontSize: 16}}>{index + 1})</p></td>
                                        <td>
                                    <div style={{display: "flex", flexDirection: "row", gap: 5,}}>
                                            <a href={file.path} download style={{fontSize: 16, color: 'black', display: "flex", flexDirection: "row", gap: 10}}>
                                                <FileArrowDown size={32} color="#3d3d3d" />
                                                <p>{file.description}</p>
                                            </a>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default RegulatoryLegalAct
