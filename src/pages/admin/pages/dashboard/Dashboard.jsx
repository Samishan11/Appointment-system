import React, { useState } from 'react'
import Sidenav from '../../component/Sidenav';
const Dashboard = () => {
    const [navcollapse, setNavcollapse] = useState(false);

    function onclick() {
        setNavcollapse(!navcollapse)
        console.log('navcollapse');
    }

    // dummy data for the appointment  
    const data = [
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
    ]

    return (
        <div className={navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"} id="wrapper">
            {/* Sidebar */}
            <div style={{ zIndex: '999' }} className="sidenav">
                <Sidenav tab={"dashboard"} />
            </div>
            {/* Page Content */}
            <div id="page-content-wrapper" className='bg-light'>
                <nav style={{ zIndex: '1' }} className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                        <h2 className="fs-2 m-0">Dashboard</h2>
                    </div>
                </nav>
                <div className=" mx-auto">
                    <div className="container">
                        <div className="row g-3 my-2">
                            <div className="col-md-4">
                                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">{231}</h3>
                                        <p className="fs-5">Appointments</p>
                                    </div>
                                    <i class="fa-solid fa-calendar-check primary-text border rounded-full h2 secondary-bg p-3"></i>
                                    {/* <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3" /> */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">{321}</h3>
                                        <p className="fs-5">Users</p>
                                    </div>
                                    <i className="fa-solid fa-people-roof fs-1 primary-text border rounded-full secondary-bg p-3" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                                    <div>
                                        <h3 className="fs-2">{21}</h3>
                                        <p className="fs-5">Events</p>
                                    </div>
                                    <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" />
                                </div>
                            </div>
                        </div>
                        <div className='my-5'>
                            <h6>RECENT APPOINTMENT</h6>
                            <div className='border rounded shadow bg-light text-secondary px-4' style={{ width: "100%", overflowX: "hidden" }}>
                                <table class="table table-border">
                                    <thead className='text-secondary'>
                                    <tr className=''>
                                            <th scope="col">Title</th>
                                            <th scope="col">Doctor Name</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((data, ind) => {
                                            return (
                                                <tr key={ind + 1}>
                                                    <td>{data.title}</td>
                                                    <td>{data.doctor}</td>
                                                    <td>{data.date}</td>
                                                    <td>{data.time}</td>
                                                    <td className='d-flex'>
                                                       <button style={{width:"30px"}} className='btn btn-sm me-1 text-primary'> <i className='fa-solid fa-pen '></i> </button>
                                                       <button style={{width:"30px"}} className='btn btn-sm me-1 text-danger'> <i className='fa-solid fa-trash'></i> </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;