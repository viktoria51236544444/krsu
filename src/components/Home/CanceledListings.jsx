import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CanceledListings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState("");
    const [showPageList, setShowPageList] = useState(false);

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

    const adsData = [
        {
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },
        {
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },{
            organization: "КНАУ им. К.И. Скрябина",
            number: "11_03_2024_06",
            procurementMethod: "Конкурс с неограниченным участием",
            procurementSubject: "Приобретение ГСМ (Бензин АИ-95, АИ-92, Дизельное топливо)",
            startDate: "18.03.2024",
            endDate: "18.03.2025",
            canceled: true 
        },
       
        
    ];

    const itemsPerPage = 20;
    const totalPages = Math.ceil(adsData.length / itemsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(totalPages, 10); i++) {
        pageNumbers.push(i);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, adsData.length);
    const currentPageData = adsData.slice(startIndex, endIndex);

    return (
        <div className="container-fluid" >
            <div className="card" style={{border: "none"}}>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="По наименованию объявления, закупающей организации, по № объявления" />
                        <div className="input-group-append">
                     
                        </div>
                    </div>
                    <hr />
                  
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Организация</th>
                                    <th>Номер</th>
                                    <th>Способ закупки</th>
                                    <th>Предмет закупки</th>
                                    <th>Начало закупки</th>
                                    <th>Окончание закупки</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageData.map((ad, index) => (
                                    <tr key={index}>
                                        <td>{ad.organization}</td>
                                        <td>{ad.number}</td>
                                        <td>{ad.procurementMethod}</td>
                                        <td>{ad.procurementSubject}</td>
                                        <td>{ad.startDate}</td>
                                        <td>{ad.endDate}</td>
                                        {ad.canceled && (
                                            <td style={{color: 'red', border: '1px solid red', }}>Отменено</td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="pagination-wrapper">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Предыдущая</button>
                            </li>
                            {pageNumbers.map((number) => (
                                <li className={`page-item ${number === currentPage ? 'active' : ''}`} key={number}>
                                    <button className="page-link" onClick={() => handlePageChange(number)}>{number}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Следующая</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CanceledListings;
