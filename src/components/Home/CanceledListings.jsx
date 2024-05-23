import React, {useEffect, useState} from 'react';
import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import axios from "axios";
import {UseRegister} from "../../Context/ContextProviderRegister";
import {useNavigate} from "react-router-dom";
import './Info.css'
import Footer from "./Footer";

const CanceledListings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("");
    const [showPageList, setShowPageList] = useState(false);
    const { getOrderDetails } = UseRegister();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const navigate = useNavigate()

    const handleClick = (codeid) => {
        getOrderDetails(codeid)
        navigate(`/detail/${codeid}`)
    };

    const handleInputChange = (event) => {
        setPageInput(event.target.value);
    };

    const handleSubmit = () => {
        const pageNumber = parseInt(pageInput);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        } else {
            setCurrentPage(totalPages);
        }
    };

    const togglePageList = () => {
        setShowPageList(!showPageList);
    };

    const [data, setData] = useState([])
    useEffect( () =>{
        getCanceledData()
    }, [])

    const getCanceledData = async () => {
        try {
            const responce = await axios.get('http://212.112.105.196:3457/api/contest/contestFilter/4')

            const result = responce.data.result.data
            console.log(result)
            setData(result)
        }catch (error) {
            alert('Данные не найдены')
            console.log(error)
        }
    }
    const itemsPerPage = 20;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        pageNumbers.push(i);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div className="container-fluid" >
            <div className="card" style={{border: "none"}}>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                               placeholder="По наименованию объявления, закупающей организации, по № объявления"/>
                        <div className="input-group-append">

                        </div>
                    </div>
                    <hr/>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Организация</th>
                                <th>Номер</th>
                                <th>Способ закупки</th>
                                <th>Предмет закупки</th>
                                <th>Начало закупки</th>
                                <th>Окончание закупки</th>
                                <th>Планируемая сумма</th>
                            </tr>
                            </thead>
                            <tbody className='main-table'>
                            {currentPageData.map((ad, index) => (
                                <tr key={index} onClick={()=>handleClick(ad.codeid)} style={{cursor: "pointer"}}>
                                    <td>{index + 1}</td>
                                    <td>{ad.contest_name}</td>
                                    <td>{ad.codeid + ad.year + index + 1}</td>
                                    <td>{ad.method_purchase}</td>
                                    <td>{ad.contest_description}</td>
                                    <td>{ad.start_date}</td>
                                    <td>{ad.formatted_end_date}</td>
                                    <td>{ad.planned_summ} сом</td>
                                    {/*{ad.canceled && (*/}
                                        <td> <div style={{color: 'red', border: '1px solid red', width: 80, height: 30, display: "flex", justifyContent: 'center', alignItems: "center", borderRadius: 8}}>Отменено</div></td>
                                    {/*)}*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-wrapper ">
                        <ul className="pagination justify-content-center pagination-panel">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}>
                                <CaretLeft size={24} color="#212121" weight="bold"/>
                            </li>
                            {pageNumbers.map((number) => (
                                <li className={`dt-paging-button page-item ${number === currentPage ? 'active' : ''}`}
                                    key={number}>
                                    <a className="page-link" onClick={() => handlePageChange(number)}
                                       style={{borderRadius: 10}}>{number}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}>
                                <CaretRight size={24} color="#212121" weight="bold"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default CanceledListings;
