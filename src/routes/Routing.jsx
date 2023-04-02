import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Detail from '../../src/pages/client/detail/Detail'
import Home from '../../src/pages/client/home/Home'
import Appointment from '../pages/admin/pages/appointment/Appointment'
import Login from '../pages/admin/pages/auth/Login'
import Dashboard from '../pages/admin/pages/dashboard/Dashboard'
import Manageevent from '../pages/admin/pages/event/Manageevent'
const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/detail' element={<Detail />} /> 
                <Route exact path='/event' element={<Manageevent />} /> 
                <Route exact path='/dashboard' element={<Dashboard />} /> 
                <Route exact path='/appointment' element={<Appointment />} /> 
                <Route exact path='/login' element={<Login />} /> 
                <Route exact path='/register' element={<Appointment />} /> 
            </Routes>
            <ToastContainer />
        </Router>
    )
}

export default Routing;