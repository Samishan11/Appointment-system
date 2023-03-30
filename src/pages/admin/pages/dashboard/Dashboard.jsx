import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointment } from '../../../../redux/reducer/slice/appointmentSlice';
import Loading from '../../component/loading';
import Sidenav from '../../component/Sidenav';
const Dashboard = () => {
    const dispatch =useDispatch();
    const [navcollapse, setNavcollapse] = useState(false);
    const appointmentd = useSelector((state) => state.appointment)
    function onclick() {
        setNavcollapse(!navcollapse)
        console.log('navcollapse');
    }
    useEffect(() => {
        dispatch(fetchAppointment())
    }, [])
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
                                        <h3 className="fs-2">{ appointmentd.appointment.length}</h3>
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
                        <div className='mt-3'>
                            <h6>RECENT APPOINTMENT</h6>
                            {
                                appointmentd.appointment.length === 0 ?
                                    <Loading /> :
                                    <div className='border rounded shadow bg-light text-secondary px-4' style={{ width: "100%", overflowX: "hidden" }}>
                                        <table class="table table-border">
                                            <thead className='text-secondary'>
                                                <tr className=''>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Image</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    appointmentd.appointment ?
                                                        appointmentd.appointment.map((data, ind) => {
                                                            return (
                                                                <tr key={ind + 1}>
                                                                    <td>{data.title}</td>
                                                                    <td><img width={50} height={50} src={ data.image.url} alt="image" /></td>
                                                                    <td>{data.date}</td>
                                                                    <td>{data.time}</td>
                                                                    
                                                                </tr>
                                                            );
                                                        })
                                                        :
                                                        ""
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;