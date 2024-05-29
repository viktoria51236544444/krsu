import React, {useEffect, useState} from 'react';
import axios from "axios";

const InfoDogovor = () => {

    const [data, setData] = useState([]);

    useEffect(()=> {
        getFilterData()
    }, [] )
    const getFilterData = async () => {
        try {
            const responce = await axios('http://212.112.105.196:3457/api/contest/contestFilter/3')

            if(responce.status === 200) {
                console.log(responce.data.result.data)
               setData(responce.data.result.data)
            }else{
                alert('произошла ошибка')
            }
        }catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{marginTop: "2vh"}}>
            <div className="card w-100" style={{border: "none"}}>
                <div className="card-body">

                    <div className="container_information_client" style={{maxHeight: "600px", overflowY: "auto"}}>
                        <table class="table w-100">
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Номер</th>
                                <th>Предмет закупки</th>
                                <th>Формат закупа</th>
                                <th>Способ закупа</th>
                                <th>Тип закупа</th>
                                <th>Планируемая сумма</th>
                                <th>Cумма победителя</th>
                                <th>Победитель</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.winner?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.codeid + item.year + index + 1}</td>
                                    <td>{item.contest_description}</td>
                                    <td>{item.format_purchase}</td>
                                    <td>{item.method_purchase}</td>
                                    <td>{item.type_purchase}</td>
                                    <td>{item.planned_summ} Сом</td>
                                    <td>{item.contract_summ} Сом</td>
                                    <td>{item.name_organization}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default InfoDogovor;
