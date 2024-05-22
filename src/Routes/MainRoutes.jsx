import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/Home/HomePage'
import Ads from '../components/Home/Ads'
import CanceledListings from '../components/Home/CanceledListings'
import InfoDogovor from '../components/Home/InfoDogovor'
import ContactsAndDetails from '../components/Home/ContactsAndDetails'
import RegulatoryLegalAct from '../components/Home/RegulatoryLegalAct'
import Concurs from '../components/Admin/Concurs'; 
import Participants from '../components/Admin/Participants'
import Roles from '../components/Admin/Roles'
import Page from '../components/Page/Page'
import Register from '../components/Register/Register'
import Auth from '../components/Auth/Auth'
import Act from '../components/Admin/Act'
import Password from '../components/Register/Password'
import PersonalArea from '../components/Home/PersonalArea'
import Public from '../components/Admin/Public'
import Completed from '../components/Admin/Completed'
import DetailPage from '../components/Home/DetailPage'
import Canceled from '../components/Admin/Canceled'
import Archive from '../components/Admin/Archive'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ads" element={<Ads />} />
            <Route path="/cancele" element={<CanceledListings />} />
            <Route path="/info" element={<InfoDogovor />} />
            <Route path="/contact" element={<ContactsAndDetails />} />
            <Route path="/regulatory" element={<RegulatoryLegalAct />} />
            <Route path="/concurs" element={<Concurs />} />
            <Route path="/participants" element={<Participants />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/password" element={<Password />} />
            <Route path="/persona" element={<PersonalArea />} /> 
            <Route path="/public" element={<Public />} /> 
            <Route path="/completed" element={<Completed />} /> 
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/canceled" element={<Canceled />} />
            <Route path="/archive" element={<Archive />} />
        </Routes>
    )
}

export default MainRoutes