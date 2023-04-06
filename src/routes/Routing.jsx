import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Detail from '../../src/pages/client/detail/Detail'
import Home from '../../src/pages/client/home/Home'
import Appointment from '../pages/admin/pages/appointment/Appointment'
import Appointments from '../pages/doctor/pages/Appointment'
import Login from '../pages/admin/pages/auth/Login'
import Dashboard from '../pages/admin/pages/dashboard/Dashboard'
import Manageevent from '../pages/admin/pages/event/Manageevent'
import Booking from '../pages/admin/pages/booking/Booking'
import Manageuser from '../pages/admin/pages/user/Manageuser'
import Register from '../pages/admin/pages/auth/Register';
import { PrivetRoute, PrivetRouteUser } from './Privetroute'
import Doctor from '../pages/doctor/pages/Doctor'
import Today from '../pages/doctor/pages/Today'
import Upcoming from '../pages/doctor/pages/Upcoming'

const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/detail/:id' element={<Detail />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/register' element={<Register />} />
                {/* protected routes here  */}
                <Route element={<PrivetRoute />} >
                    <Route exact path='/booking' element={<Booking />} />
                    <Route exact path='/event' element={<Manageevent />} />
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route exact path='/appointment' element={<Appointment />} />
                    <Route exact path='/manageuser' element={<Manageuser />} />
                </Route>
                <Route element={<PrivetRouteUser />} >
                    <Route exact path='/doctor' element={<Doctor />} />
                    <Route exact path='/myappointments' element={<Appointments />} />
                    <Route exact path='/upcoming-appointment' element={<Upcoming />} />
                    <Route exact path='/today-appointment' element={<Today />} />
                </Route>
            </Routes>
            <ToastContainer />
        </Router>
    )
}

export default Routing;