import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from '../pages/detail/Detail'
import Home from '../pages/home/Home'
const Routing = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/detail' element={<Detail />} />
            </Routes>
        </Router>
    )
}

export default Routing;