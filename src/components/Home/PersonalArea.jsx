import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Footer from './Footer';

const PersonalArea = () => {
    const [userInfos, setUserInfos] = useState([]);

    useEffect(() => {
        const loadUserInfoFromLocalStorage = () => {
            const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (storedUserInfo) {
                setUserInfos(storedUserInfo);
            }
        };

        loadUserInfoFromLocalStorage();
    }, []);

    if (userInfos.length === 0) {
        return (
            <Container className="personal-area-container" style={{ marginTop: '20px' }}>
                <Card>
                    <Card.Body className="text-center">
                        <p style={{ color: '#666', fontSize: '18px' }}>Данные о пользователе не найдены.</p>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="personal-area-container" style={{ marginTop: '20px'  }}>
            {userInfos.map((userInfo, index) => (
                <Card key={index} className="mb-3" style={{border: "none"}}>
                    <Card.Body>
                        <Row>
                            <Col md={8}>
                                <div >
                             <div className='personal-area-data'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#0D6EFD" class="bi bi-person" viewBox="0 0 16 16">
                                 <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                <h4 style={{margin: 0}}>{userInfo.fio}</h4>
                                </div>
                                <div>
                               <div className='personal-area-data'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-envelope" viewBox="0 0 16 16">
                                 <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg> <h6 style={{margin: 0}}> Электронная почта:</h6></div>
                                <span> {userInfo.email}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-123" viewBox="0 0 16 16">
                                 <path d="M2.873 11.297V4.142H1.699L0 5.379v1.137l1.64-1.18h.06v5.961h1.174Zm3.213-5.09v-.063c0-.618.44-1.169 1.196-1.169.676 0 1.174.44 1.174 1.106 0 .624-.42 1.101-.807 1.526L4.99 10.553v.744h4.78v-.99H6.643v-.069L8.41 8.252c.65-.724 1.237-1.332 1.237-2.27C9.646 4.849 8.723 4 7.308 4c-1.573 0-2.36 1.064-2.36 2.15v.057h1.138Zm6.559 1.883h.786c.823 0 1.374.481 1.379 1.179.01.707-.55 1.216-1.421 1.21-.77-.005-1.326-.419-1.379-.953h-1.095c.042 1.053.938 1.918 2.464 1.918 1.478 0 2.642-.839 2.62-2.144-.02-1.143-.922-1.651-1.551-1.714v-.063c.535-.09 1.347-.66 1.326-1.678-.026-1.053-.933-1.855-2.359-1.845-1.5.005-2.317.88-2.348 1.898h1.116c.032-.498.498-.944 1.206-.944.703 0 1.206.435 1.206 1.07.005.64-.504 1.106-1.2 1.106h-.75v.96Z"/>
                                 </svg> <h6 style={{margin: 0}}>ИНН:</h6></div>
                                <span> {userInfo.inn}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-building" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5. 5V15h2V1.309l-7 3.5V15z"/>
                                 <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                                 </svg> <h6 style={{margin: 0}}>Организация::</h6></div>
                                <span> {userInfo.name_organization}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-type-strikethrough" viewBox="0 0 16 16">
                               <path d="M6.333 5.686c0 .31.083.581.27.814H5.166a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607zm2.194 7.478c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5H1v-1h14v1h-3.504c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967z"/>
                               </svg> <h6 style={{margin: 0}}>Тип организации:</h6></div>
                                <span> {userInfo.type_organization}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                  </svg> <h6 style={{margin: 0}}>Должность:</h6></div>
                                <span> {userInfo.position}</span>
                                </div>
                                </div>

                            </Col>
                            <Col md={4}>
                                {/* <p className="info-title"><strong>Электронная почта менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_email}</p>
                                <p className="info-title"><strong>ФИО менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_fio}</p>
                                <p className="info-title"><strong>Номер телефона менеджера по закупу:</strong></p>
                                <p>{userInfo.manager_phone_number}</p>
                                <p className="info-title"><strong>Рабочий номер телефона:</strong></p>
                                <p>{userInfo.manager_work_phone_number}</p> */}
                                <div>
                               <div className='personal-area-data'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                               </svg> <h6 style={{margin: 0}}>Адрес:</h6></div>
                                <span> {userInfo.address}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-house" viewBox="0 0 16 16">
                               <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                  </svg> <h6 style={{margin: 0}}>Фактический адрес:</h6></div>
                                <span> {userInfo.address}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-bank2" viewBox="0 0 16 16">
                             <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z"/>
                                      </svg> <h6 style={{margin: 0}}>Название банка:</h6></div>
                                <span> {userInfo.banc_name}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-list-ol" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
                                <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>
                                        </svg> <h6 style={{margin: 0}}>БИК:</h6></div>
                                <span> {userInfo.bik}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D6EFD" class="bi bi-cash-coin" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                               <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                      </svg> <h6 style={{margin: 0}}>Депозитный счет:</h6></div>
                                <span> {userInfo.bik}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'> <h6 style={{margin: 0}}>ПИН менеджера:</h6></div>
                                <span> {userInfo.pin_manager}</span>
                                </div>

                                <div>
                               <div className='personal-area-data'> <h6 style={{margin: 0}}>Юридический адрес:</h6></div>
                                <span> {userInfo.ur_address}</span>
                                </div>
                                {userInfo.web_site && (
                                <div>
                               <div className='personal-area-data'> <h6 style={{margin: 0}}>Веб-сайт:</h6></div>
                                <span> {userInfo.web_site}</span>
                                </div>
                                )}
                             
                                  
                              
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default PersonalArea;
