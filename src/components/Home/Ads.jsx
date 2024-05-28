import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { UseRegister } from '../../Context/ContextProviderRegister';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowFatLeft, ArrowFatRight, CaretLeft, CaretRight, Eye, MagnifyingGlass } from "@phosphor-icons/react";
import './homePage.css'
import axios from "axios";
import DetailModal from "./DetailModal";


const Ads = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("");
    const [showPageList, setShowPageList] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { publick, createOrder, message, getOrderDetails } = UseRegister();

    const [User, setUser] = useState({
        userId: 0,
        contest_id: 0,
        cover_later: "",
        summ: 0,
        files: []
    });


    const [showModal, setShowModal] = useState(false);
    const [selectedContest, setSelectedContest] = useState(null);
    const [comment, setComment] = useState('');
    const [summValue, setSummValue] = useState('');
    const [useCurrentData, setUseCurrentData] = useState(false);
    const userId = localStorage.getItem('codeid');

    const navigate = useNavigate()

    const handleClick = (codeid) => {
        getOrderDetails(codeid)
        setSelectedContestId(codeid);
        setShowDetailModal(true);
       // navigate(`/detail/${codeid}`)
    };

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedContestId, setSelectedContestId] = useState(null);

    const handleShowDetails = (contestId) => {
        setSelectedContestId(contestId);
        setShowDetailModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailModal(false);
        setSelectedContestId(null);
    };

    useEffect(() => {
        if (publick && publick.length > 0) {
            setCurrentPage(1);
        }

        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [publick]);

    const handleMessageError = () => {
        if (message === "Вы уже подали заявку на участие в этом конкурсе, вы можете обновить ставку") {
            alert(`${message}`)
        }
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setUser((prevState) => ({
            ...prevState,
            files: [...prevState.files, ...files]
        }));
    };


    const itemsPerPage = 20;
    const totalPages = publick ? Math.ceil(publick.length / itemsPerPage) : 0;
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        pageNumbers.push(i);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, publick ? publick.length : 0);
    const currentPageData = publick ? publick.slice(startIndex, endIndex) : [];

    const handleApplyClick = (contest) => {
        setSelectedContest(contest);
        setShowModal(true);
    };

    const handleSubmitOrder = async () => {
        if (!selectedContest) {
            return;
        }

        const formData = new FormData();
        formData.append('userId', useCurrentData ? parseInt(userId) : User.userId);
        formData.append('contest_id', selectedContest.codeid);
        formData.append('cover_later', comment);
        formData.append('summ', parseFloat(summValue));
        User.files.forEach(file => {
            formData.append('files', file);
        });

        try {
            await createOrder(formData);
            console.log('Order submitted successfully!');
            setShowModal(false);
            setComment('');
            setSummValue('');
            setUseCurrentData(false);
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };


    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const apiUrl = 'http://212.112.105.196:3457/api/contest/getSearchContest';

    const handleSubmit2 = async () => {
        try {
            const response = await axios.get(`${apiUrl}?searchText=${encodeURIComponent(searchText)}`);
            console.log(response);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const data = response.data.result.result;
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit2();
        }
    };

    return (
        <div className="container-fluid">
            <div className="card" style={{ border: "none" }}>
                <div className="card-body">
                    <div className="input-group mb-3 search-panel">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="По наименованию объявления, закупающей организации, по № объявления"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <hr />
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Номер</th>
                                    <th>Организация</th>
                                    <th>Предмет закупки</th>
                                    <th>Способ закупа</th>
                                    <th>Формат закупа</th>
                                    <th>Планируемая сумма</th>
                                    <th>Начало закупки</th>
                                    <th>Окончание закупки</th>
                                    {isAuthenticated && <th>Действия</th>}

                                </tr>
                            </thead>
                            <tbody className='main-table'>
                                {searchResults.length === 0 ? (
                                    currentPageData.map((ad, index) => (
                                        <tr key={index} style={{ cursor: "pointer" }}>
                                            <td onClick={() => handleClick(ad.codeid)}>{index + 1}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.codeid + ad.year + index + 1}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.contest_name}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.contest_description}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.method_purchase}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.format_purchase}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.planned_summ} сом</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{ad.start_date}</td>
                                            <td onClick={() => handleClick(ad.codeid)}>{new Date(ad.end_date).toLocaleDateString()}</td>
                                            {isAuthenticated && (
                                                <td>
                                                    <Button variant="primary"
                                                        style={{ width: "120px", height: "auto", fontSize: 12, }}
                                                        size='small' onClick={() => handleApplyClick(ad)}>Подать
                                                        заявку</Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    searchResults.map((ad, index) => (
                                        <tr key={index} onClick={() => handleClick(ad.codeid)} style={{ cursor: "pointer" }}>
                                            <td>{index + 1}</td>
                                            <td>{ad.contest_name}</td>
                                            <td>{ad.method_purchase}</td>
                                            <td>{ad.contest_description}</td>
                                            <td>{ad.start_date}</td>
                                            <td>{new Date(ad.end_date).toLocaleDateString()}</td>
                                            {isAuthenticated && (
                                                <td>
                                                    <Button variant="primary" style={{ width: "150px", height: "auto" }}
                                                        size='small' onClick={() => handleApplyClick(ad)}>Подать
                                                        заявку</Button>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-wrapper">
                        <ul className="pagination justify-content-center pagination-panel">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage - 1)}>
                                <CaretLeft size={24} color="#212121" weight="bold" />
                            </li>
                            {pageNumbers.map((number) => (
                                <li className={`dt-paging-button page-item ${number === currentPage ? 'active' : ''}`}
                                    key={number}>
                                    <a className="page-link" onClick={() => handlePageChange(number)}
                                        style={{ borderRadius: 10 }}>{number}</a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => handlePageChange(currentPage + 1)}>
                                <CaretRight size={24} color="#212121" weight="bold" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <DetailModal show={showDetailModal} onHide={handleCloseDetails}  contestId={selectedContestId}/>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Подача заявки на конкурс</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Мотивационное письмо</Form.Label>
                            <Form.Control as="textarea" rows={3} value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control type="number" value={summValue}
                                onChange={(e) => setSummValue(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                id="useCurrentDataCheckbox"
                                label="Использовать текущие данные пользователя"
                                checked={useCurrentData}
                                onChange={(e) => setUseCurrentData(e.target.checked)}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label>Добавить дополнительные</Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileChange} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Закрыть</Button>
                    <Button variant="primary" onClick={handleSubmitOrder}>Подать заявку</Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default Ads;
