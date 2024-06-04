import React, {useEffect, useState} from 'react';
import {CaretLeft, CaretRight} from "@phosphor-icons/react";
import axios from "axios";
import {UseRegister} from "../../Context/ContextProviderRegister";
import {useNavigate} from "react-router-dom";
import './Info.css'
import Footer from "./Footer";
import DetailModal from "./DetailModal";
import { API } from '../../helpers/const';

const CanceledListings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("");
    const [showPageList, setShowPageList] = useState(false);
    const { getOrderDetails } = UseRegister();

    const navigate = useNavigate()

    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedContestId, setSelectedContestId] = useState(null);


    const handleClick = (codeid) => {
        getOrderDetails(codeid)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
       // navigate(`/detail/${codeid}`)
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
            const responce = await axios.get(`${API}api/contest/contestFilter/4`)

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


    
  const handlePageChange = (pageNumber) => {
    if (+pageNumber === 0) {
      return;       
    }
    if (pageNumbers?.length < pageNumber) {
      return;
    }
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  }; 

    return (
        <div className="container-fluid" >
            <div className="card" style={{border: "none"}}>
                <div className="card-body moreTable">
                    {/* <div className="input-group mb-3">
                        <input type="text" className="form-control searchInput"
                               placeholder="По наименованию объявления, закупающей организации, по № объявления"/>
                        <div className="input-group-append">

                        </div>
                    </div> */}
                    <hr className='hr' />

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="titleTh">№</th>
                                <th className="titleTh">Номер</th>
                                <th className="titleTh">Организация</th>
                                <th className="choiceZakup titleTh">Способ закупки</th>
                                <th className="titleTh">Предмет закупки</th>
                                <th className="titleTh">Начало закупки</th>
                                <th className="titleTh">Окончание закупки</th>
                                <th className="titleTh">Планируемая сумма</th>
                                <th className="titleTh">Статус</th> 
                                <th className="titleTh">Причина</th>
                            </tr>
                            </thead>
                            <tbody className='main-table'>
                            {currentPageData.map((ad, index) => (
                                <tr key={index} onClick={()=>handleClick(ad.codeid)} style={{cursor: "pointer"}}>
                                    <td>{index + 1}</td>
                                    <td>{ad.codeid + ad.year + index + 1}</td>      
                                    <td>{ad.contest_name}</td>
                                    <td className="choiceZakup">{ad.method_purchase}</td>
                                    <td>{ad.contest_description}</td>
                                    <td className='good'>{ad.start_date}</td>
                                    <td>{ad.formatted_end_date}</td>
                                    <td>{ad.planned_summ} сом</td>
                                    <td> <div className='cancelStatus'>Отменено</div></td>
                                    <td>
                                        <p className='cancel'>{ad.coment}</p>
                                        {ad.files&& ad.files.length > 0 && ad.files.map((file, index) => (
                                            <>
                                                <div key={index}>
                                                    <a href= {file.path} target="_blank" rel="noopener noreferrer" download>{file.description}</a>
                                                </div>
                                            </>
                                        ))}
                                    </td>
                                   
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {currentPageData?.length !== 0 && ( ///// скрываю пагинацию, если данных нет
                        <div className="pagination-wrapper ">
                            <ul className="pagination justify-content-center pagination-panel cursor">
                                <li className={`page-item arrowPagination ${currentPage === 1 ? 'disabled' : ''}`}
                                    onClick={() => handlePageChange(currentPage - 1)}>
                                    <CaretLeft size={24} color="#212121" weight="bold"/>
                                </li>
                                {pageNumbers?.map((number) => (
                                    <li className={`dt-paging-button page-item ${number === currentPage ? 'active' : ''}`}
                                        key={number}>
                                        <a className="page-link" onClick={() => handlePageChange(number)}
                                        style={{borderRadius: 10}}>{number}</a>
                                    </li>
                                ))}
                                <li className={`page-item arrowPagination ${currentPage === totalPages ? 'disabled' : ''}`}
                                    onClick={() => handlePageChange(currentPage + 1)}>
                                    <CaretRight size={24} color="#212121" weight="bold"/>
                                </li>
                            </ul>
                        </div>)
                    }   
                </div>
            </div>

            <DetailModal show={showDetailModal} onHide={handleCloseDetails}  contestId={selectedContestId}/>

        </div>
    );
}

export default CanceledListings;
