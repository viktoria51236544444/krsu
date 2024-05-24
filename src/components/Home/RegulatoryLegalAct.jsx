import React, {useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import "./Info.css"
import Footer from './Footer';
import  axios from 'axios';



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

                    <div className="container_information_client " style={{maxHeight: "600px", overflowY: "auto"}}>
                        <div className="table-responsive mt-2">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                        <th>№</th>
                                        <th>Наименование файла</th>
                                        
                                    <th>Наименование</th>
                                </tr>
                                </thead>
                                <tbody className='file-table'>
                                { files?.map((file, index)=> (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{file.description}</td>
                                        <td>
                                            <a href={file.path} download>{file.description}</a>
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
