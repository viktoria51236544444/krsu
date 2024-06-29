import React from 'react';
import NavScrollExample from '../Home/Navbar';
import Footer from '../Home/Footer';
import MainRoutes from '../../Routes/MainRoutes';
import {ToastProvider} from "../../Context/ToastContext";


const Page = () => {
    return (
        <div className="page-container">
            <NavScrollExample/>
            <div className="content-wrap">
                <MainRoutes/>
            </div>
            <Footer/>
        </div>
    );
}

export default Page;
