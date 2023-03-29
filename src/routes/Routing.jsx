import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from '../../src/pages/client/detail/Detail'
import Home from '../../src/pages/client/home/Home'
import Event from '../pages/admin/component/Event'
import Dashboard from '../pages/admin/pages/dashboard/Dashboard'
const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/detail' element={<Detail />} /> 
                <Route exact path='/event' element={<Event />} /> 
                <Route exact path='/dashboard' element={<Dashboard />} /> 
            </Routes>
        </Router>
    )
}

export default Routing;