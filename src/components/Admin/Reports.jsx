import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar";
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button } from 'react-bootstrap';
import { Power } from 'phosphor-react';
import { UseRegister } from '../../Context/ContextProviderRegister';
import * as XLSX from 'xlsx';

const Reports = () => {
    const { spPurchase, getReports, reports } = UseRegister();
    const [userEmail, setUserEmail] = useState('');
    const [reportData, setReportData] = useState({
        year: 2024,
        type: '',
        method: '',
        format: '',
        begin: '',
        end: ''
    });
    console.log(reports);

    const navigate = useNavigate();

    useEffect(() => {
        const userDataString = localStorage.getItem('userEmail');
        if (userDataString) {
            setUserEmail(userDataString);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateReport = () => {
        const reportPayload = {
            ...reportData,
            year: parseInt(reportData.year),
            begin: new Date(reportData.begin),
            end: new Date(reportData.end)
        };

        getReports(reportPayload);
    };

    const handleExportToExcel = () => {
        if (!reports || reports.length === 0) {
            return;
        }

        const headers = {
            contest_name: 'Название организации',
            contest_description: 'Наименование закупки',
            format_purchase: 'Формат',
            method_purchase: 'Метод',
            type_purchase: 'Тип',
            year: 'Год',
            planned_summ: 'Планируемая сумма',
            formatted_end_date: 'Дата окончания',
            start_date: 'Дата публикации',

        };

        const exportData = reports.map(report => {
            const newObj = {};
            for (const key in report) {
                if (headers[key]) {
                    newObj[headers[key]] = report[key];
                }
            }
            return newObj;
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
        XLSX.writeFile(workbook, "reports.xlsx");
    };

    const signout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти из аккаунта?");
        if (confirmed) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('codeid');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('role');
            console.log('User signed out');
            navigate('/');
        }
    };

    return (
        <div>
            <div className="oll_sistem" style={{ maxWidth: "100vw" }}>
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
                            <div className="pills-outline" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Год</p>
                                    <Form.Control
                                        size="sm"
                                        type="number"
                                        placeholder=""
                                        name="year"
                                        value={reportData.year}
                                        onChange={handleChange}
                                        style={{ width: '150px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Формат</p>
                                    <Form.Control
                                        as="select"
                                        size="sm"
                                        name="format"
                                        value={reportData.format}
                                        onChange={handleChange}
                                        style={{ width: '150px' }}
                                    >
                                        {spPurchase?.format?.map(({ codeid, format_purchase }) => (
                                            <option key={codeid} value={codeid}>{format_purchase}</option>
                                        ))}
                                    </Form.Control>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Метод</p>
                                    <Form.Control
                                        as="select"
                                        size="sm"
                                        name="method"
                                        value={reportData.method}
                                        onChange={handleChange}
                                        style={{ width: '150px' }}
                                    >
                                        {spPurchase?.method?.map(({ codeid, method_purchase }) => (
                                            <option key={codeid} value={codeid}>{method_purchase}</option>
                                        ))}
                                    </Form.Control>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Тип</p>
                                    <Form.Control
                                        as="select"
                                        size="sm"
                                        name="type"
                                        value={reportData.type}
                                        onChange={handleChange}
                                        style={{ width: '150px' }}
                                    >
                                        {spPurchase?.type?.map(({ codeid, type_purchase }) => (
                                            <option key={codeid} value={codeid}>{type_purchase}</option>
                                        ))}
                                    </Form.Control>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Период от:</p>
                                    <Form.Control
                                        size="sm"
                                        type="date"
                                        name="begin"
                                        value={reportData.begin}
                                        onChange={handleChange}
                                        placeholder="Small text"
                                        style={{ width: '150px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <p style={{ margin: 0, marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>Период до:</p>
                                    <Form.Control
                                        size="sm"
                                        type="date"
                                        name="end"
                                        value={reportData.end}
                                        onChange={handleChange}
                                        placeholder="Small text"
                                        style={{ width: '150px' }}
                                    />
                                </div>
                                <div>
                                    <Button variant="primary" size="sm" onClick={handleCreateReport} style={{ marginTop: '1.7rem' }}>Создать отчет</Button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div style={{ display: "flex", textAlign: "center", gap: '10px', justifyContent: "center", alignItems: "center", marginTop: '1.5rem' }}>
                                <div>{userEmail}</div>
                                <button
                                    onClick={signout}
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive mt-4" style={{ overflowX: 'auto' }}>
                                        <Button variant="success" size="sm" onClick={handleExportToExcel} style={{ marginBottom: '1rem' }}>Экспорт в Excel</Button>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Название организации</th>
                                                    <th>Наименование закупки</th>
                                                    <th>Формат</th>
                                                    <th>Метод</th>
                                                    <th>Тип</th>
                                                    <th>Год</th>
                                                    <th>Планируемая сумма</th>
                                                    <th>Дата публикации</th>
                                                    <th>Дата окончания</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reports ? (
                                                    reports.map((report, index) => (
                                                        <tr key={report.codeid}>
                                                            <td>{index + 1}</td>
                                                            <td>{report.contest_name}</td>
                                                            <td>{report.contest_description}</td>
                                                            <td>{report.format_purchase}</td>
                                                            <td>{report.method_purchase}</td>
                                                            <td>{report.type_purchase}</td>
                                                            <td>{report.year}</td>
                                                            <td>{report.planned_summ}</td>
                                                            <td>{report.start_date}</td>
                                                            <td>{report.formatted_end_date}</td>

                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="12" style={{ textAlign: 'center' }}>Нет данных</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reports;
