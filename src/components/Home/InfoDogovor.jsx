import React from 'react';


const InfoDogovor = () => {
    const data =
        [
            {
                codeid: 1,
                status: 3,
                start_date: "20.06.2012",
                code_contest: 1,
                contest_description: "Закупка обуродувания для кабинета информатики",
                name_organization: 'ОсОО Alians Computers',
                contest_status: 4,
                code_user: 10,
                number: '20.06.2012_01',
                method_purchase: 'Конкурс с ограниченным участием',
                format_purchase: 'Ограниченный',
                type_purchase: "Товары",
                planned_summ: 15,
                contract_summ: 250
            },

            {
                codeid: 1,
                status: 3,
                start_date: "20.06.2012",
                code_contest: 1,
                contest_description: "Закупка обуродувания для кабинета информатики",
                name_organization: 'ОсОО Alians Computers',
                contest_status: 4,
                code_user: 10,
                number: '20.06.2012_01',
                method_purchase: 'Конкурс с ограниченным участием',
                format_purchase: 'Ограниченный',
                type_purchase: "Товары",
                planned_summ: 15,
                contract_summ: 250
            },

            {
                codeid: 1,
                status: 3,
                start_date: "20.06.2012",
                code_contest: 1,
                contest_description: "Закупка обуродувания для кабинета информатики",
                name_organization: 'ОсОО Alians Computers',
                contest_status: 4,
                code_user: 10,
                number: '20.06.2012_01',
                method_purchase: 'Конкурс с ограниченным участием',
                format_purchase: 'Ограниченный',
                type_purchase: "Товары",
                planned_summ: 15,
                contract_summ: 250
            },
        ]


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
                                <th>Метод закупа</th>
                                <th>Тип закупа</th>
                                <th>Планируемая сумма</th>
                                <th>Предложенная сумма</th>
                                <th>Победитель</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.number}</td>
                                    <td>{item.contest_description}</td>
                                    <td>{item.format_purchase}</td>
                                    <td>{item.method_purchase}</td>
                                    <td>{item.type_purchase}</td>
                                    <td>{item.planned_summ}</td>
                                    <td>{item.contract_summ}</td>
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
