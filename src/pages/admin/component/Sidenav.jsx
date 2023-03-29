import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Sidenav = ({ tab }) => {
    useEffect(() => {
        document.querySelector(`.tab_btn`).classList.remove("nav_active");
        document.querySelector(`#${tab}`).classList.add("nav_active");
    }, [tab]);
    return (
        <div style={{ background: "hwb(216 17% 3%)", width: "240px", zIndex: '999' }} className="fixed-top" id="sidebar-wrapper">
            <div className="sidebar-heading py-4 primary-text fs-6 fw-bold text-uppercase border-bottom"><Link style={{ 'textDecoration': 'none' }} to={'/'}> <h3 className='text-light'>ADMIN-DASH</h3> </Link></div>
            <div className="list-group position-relative list-group-flush my-3">
                <Link id='dashboard' to="/dashboard" className="list-group-item list-group-item-action bg-transparent tab_btn text-light py-3"><i className="fas fa-tachometer-alt me-2" />Dashboard</Link>
                <Link id="appointment" to="/appointment" className="list-group-item list-group-item-action bg-transparent tab_btn text-light py-3"><i className="fa-sharp fa-solid fa-plus me-2"></i>Add Appoinment</Link>
                <Link id='user' to="#" className="list-group-item list-group-item-action bg-transparent tab_btn text-light py-3"><i id='nav_active' className="fa-solid fa-calendar-days me-2" />Event</Link>
                <Link id='user' to="#" className="list-group-item list-group-item-action bg-transparent tab_btn text-light py-3"><i id='nav_active' className="fa-solid fa-people-roof me-2" />Manage User</Link>
                <div className="logout mt-5  ">
                    <div className="col-8 mx-auto">
                        <button className='btn btn-sm py-1 position-absolute btn-outline-light' style={{ bottom: "-250px", left: "40px", width: "150px" }}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidenav;