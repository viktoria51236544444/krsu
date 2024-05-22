
import React from 'react';
import { Button } from 'react-bootstrap';


const ContactsAndDetails = () => {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ marginTop: "2vh" }}>
            <div className="card w-100" style={{border: "none"}}>
                <div className="card-body">
                
                    <div className="container_information_client" style={{ maxHeight: "600px", overflowY: "auto" }}>
                    <table class="table w-100 table5">
                                <thead>
                                    <tr>
                                        <th>Контакты</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> <span>Начальник</span> 
                                        <span> Мамбетказиев Мирбек</span> 
                                        <span> Рабочий телефон: +996 312 54 52 15 </span>
                                        <span>E-mail:</span>
                                        <span>Адрес:</span>
                                        </td> 
                                    </tr>
                                <tr>
                                     <td>
                                        <span>Специалист</span>
                                        <span>Урустомбекова Айнура</span>
                                        <span>Рабочий телефон: +996 312 54 52 15</span>
                                        <span>E-mail:</span>
                                        <span>Адрес:</span>
                                     </td>
                                </tr>
                                </tbody>
                                <thead>
                                    <tr>
                                        <th>Реквизиты депозитного счета КНАУ им. К.И. Скрябина</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td> 
                                        <span>ОАО "РСК Банк"</span> 
                                        <span>БИК 129053</span> 
                                        <span>р/счет 1290533230409680 (в сомах)</span>
                                        </td> 
                                    </tr>
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ContactsAndDetails