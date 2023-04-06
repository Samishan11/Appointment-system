import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Sidenav = ({ tab }) => {
    useEffect(() => {
        document.querySelector(`.tab_btn`).classList.remove("nav_active");
        document.querySelector(`#${tab}`).classList.add("nav_active");
    }, [tab]);
    return (
        <div style={{ background: "hwb(216 17% 3%)", height: '100vh', width: "240px", zIndex: '999' }} className="fixed-top" id="sidebar-wrapper">
            <div className="sidebar-heading py-4 primary-text fs-6 fw-bold text-uppercase border-bottom"><Link style={{ 'textDecoration': 'none' }} to={'/'}> <h3 className='text-light'>DOCOTR-DASH</h3> </Link></div>
            <div style={{ height: '70vh' }} className="list-group position-relative list-group-flush my-3">
                <Link id='doctor' to="/doctor" className="list-group-item list-sroup-item-action bg-transparent tab_btn text-light py-3"><i className="fas fa-tachometer-alt me-2" />DOCTOR</Link>
                <Link id='todayappointment' to="/today-appointment" className="list-group-item list-sroup-item-action bg-transparent tab_btn text-light py-3"><i className="fa-solid fa-calendar-check me-2" />TODAY APPOINTMENT</Link>
                <Link id='upcomingappointment' to="/upcoming-appointment" className="list-group-item list-sroup-item-action bg-transparent tab_btn text-light py-3"><i className="fa-solid fa-calendar-check me-2" />NEXT APPOINTMENT</Link>
                <Link id='doctorappointment' to="/myappointments" className="list-group-item list-sroup-item-action bg-transparent tab_btn text-light py-3"><i className="fa-solid fa-calendar-check me-2" />ALL APPOINTMENT</Link>
                <div className="logout mt-5  ">
                    <div className="col-8 mx-auto">
                        <button onClick={() => {
                            localStorage.removeItem("token")
                            window.location = "/"
                        }} className='btn btn-sm py-1 position-absolute btn-outline-light' style={{ bottom: "-0%", left: "40px", width: "150px" }}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidenav;