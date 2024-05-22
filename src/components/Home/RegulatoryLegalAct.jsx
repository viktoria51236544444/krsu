import React from 'react';
import {Button} from 'react-bootstrap';
import "./Info.css"
import {DownloadSimple, Eye} from "@phosphor-icons/react";
import Footer from './Footer';


const RegulatoryLegalAct = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{marginTop: "2vh"}}>
            <div className="card w-100 " style={{border: "none"}}>
                <div className="card-body ">

                    <div className="container_information_client " style={{maxHeight: "600px", overflowY: "auto"}}>
                        <table class="table w-100 ">
                            <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Файл</th>

                            </tr>
                            </thead>
                            <tbody className='file-table'>
                            <tr>
                                <td>Закон Кыргызской Республики от 11 августа 2023 года №179 "Об образовании"</td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Постановление Кабинета Министров Кыргызской Республики от 21 ноября 2022 года №654 О
                                    внесении изменений в некоторые решения Правительства Кыргызской Республики по
                                    приданию особо статуса государственным высшим учебным заведениям.
                                </td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Жоболор жөнүндө буйрук</td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Сатып алуулар жөнүндө буйрук.</td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Билим бөрүү маселелери боюнча КР-нын Президентинин буйругу №165, 07-август
                                    2023-жыл.
                                </td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            <tr>
                                <td>Порядок осуществления закупок КГТУ им. И. Разакова.</td>
                                <td>
                                    <Button variant='primary' size="sm"><DownloadSimple size={28}
                                                                                        color="#fff"/></Button> <Button
                                    variant='primary' size="sm"><Eye size={28} color="#fff"/></Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export default RegulatoryLegalAct
