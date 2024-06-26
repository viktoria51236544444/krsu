import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './Info.css';
import Footer from './Footer';
import axios from 'axios';
import { FileArrowDown } from '@phosphor-icons/react';
import { API } from '../../helpers/const'


const RegulatoryLegalAct = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    getDataFiles();
  }, []);

  const getDataFiles = async () => {
    try {
      const response = await axios.get(`${API}api/files/getFiles/1`);

      if (response.status === 200) {
        const data = response.data.result.updateFiles;
        setFiles(data);
      } else {
        console.log(response.data.result);
      }
    } catch (error) {
      alert('Ошибка при получение данных');
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ marginTop: '2vh' }}>
      <div className="card w-100" style={{ border: 'none' }}>
        <div className="card-body">
          <div className="container_information_client" style={{ maxHeight: '800px', overflowY: 'auto' }}>
            <div className="table-responsive mt-2">
              <Table striped bordered hover>
                <thead>
                  <tr>


                  </tr>
                </thead>
                <tbody className="file-table">
                  {files?.map((file, index) => (
                    <tr key={index}>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                          <a href={file.path} target="_blank" rel="noopener noreferrer" download style={{ fontSize: 16, color: 'black', display: 'flex', flexDirection: 'row', gap: 10 }}>
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
    </div>
  );
};

export default RegulatoryLegalAct;
