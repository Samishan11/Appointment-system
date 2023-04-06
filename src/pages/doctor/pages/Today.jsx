import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointment, getInterval } from '../../../redux/reducer/slice/appointmentSlice';
import Loading from '../../admin/component/loading';
import Sidenav from '../components/Sidenav';
import { fetchBooking } from '../../../redux/reducer/slice/bookingSlice';
import jwtDecode from 'jwt-decode';
const Today = () => {
    const dispatch = useDispatch();
    const [navcollapse, setNavcollapse] = useState(false);
    const appointmentd = useSelector((state) => state.appointment)
    const bookings = useSelector((state) => state.booking.booking)
    // decoding the the jwt token 
    const useData = localStorage?.getItem('token') && jwtDecode(localStorage?.getItem('token'));

    // filter appointment 
    const filterAppointment = appointmentd.appointment.filter((data) => {
        if (data.doctor.toLowerCase() === useData.username.toLowerCase()) {
            return data;
        }
    })
    // filter booking by  appointment 
    const [boookingData, setBookingData] = useState([]);
    const filterBookings = (appointmentId) => bookings.filter((data) => {
        if (data.appointment === appointmentId) {
            setBookingData(data)
            return data;
        } else {
        }
    })

    // navbar collaps 
    function onclick() {
        setNavcollapse(!navcollapse)
    }

    // 
    useEffect(() => {
        dispatch(fetchAppointment())
        dispatch(fetchBooking())
        dispatch(fetchBooking())
    }, [])


    const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "yyyy-mm-dd"

    const sortedData = filterAppointment
        .filter((obj) => obj.date === today) // Filter only objects with today's date
        .sort((a, b) => {
            const dateA = new Date(today.replace(/-/g, '/') + ' ' + a.time);
            const dateB = new Date(today.replace(/-/g, '/') + ' ' + b.time);
            return dateA.getTime() - dateB.getTime();
        });

    return (
        <div className={navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"} id="wrapper">
            {/* Sidebar */}
            <div style={{ zIndex: '999' }} className="sidenav">
                <Sidenav tab={"todayappointment"} />
            </div>
            {/* Page Content */}
            <div id="page-content-wrapper" className='bg-light'>
                <nav style={{ zIndex: '1' }} className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                        <h3 className="fs-3 m-0">Welcome User {useData.username.toUpperCase()}</h3>
                    </div>
                </nav>
                <div className=" mx-auto">
                    <div className="container-fluid">

                        <div className='mt-5 px-2'>
                            <h6>{sortedData.length === 0 ? "NO APPOINTMENT TODAY" : "TODAY APPOINTMENTS"}</h6>
                            {
                                sortedData.length === 0 ?
                                    <Loading />
                                    :
                                    <div className='border rounded shadow bg-light text-secondary px-4' style={{ width: "100%", overflowX: "hidden" }}>
                                        <table class="table table-border">
                                            <thead className='text-secondary'>
                                                <tr className=''>
                                                    <th scope="col">APPOINTMENT ID</th>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">TIME</th>
                                                    <th scope="col">DURATION</th>
                                                    <th scope="col">VIEW BOOKINGS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    sortedData ?
                                                        sortedData?.slice(0, 9)?.map((data, ind) => {
                                                            return (
                                                                <tr className='py-4' key={ind + 1}>
                                                                    <td>{`${data._id}`}</td>
                                                                    <td>{new Date(data.date).toDateString()}</td>
                                                                    <td>{data.time}</td>
                                                                    <td>{getInterval(data)}</td>
                                                                    <td><button onClick={() => filterBookings(data._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ width: "100px" }} className='btn btn-sm btn-primary'>view</button></td>
                                                                </tr>
                                                            );
                                                        })
                                                        :
                                                        <Loading />
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">BOOKINGS</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className='container  pb-5'>
                                <div className="container bg-white d-block mx-auto">
                                    <div className="row">
                                        {
                                            boookingData.length === 0 ?
                                                <p className='d-block text-center h5 mx-auto'>No Booking found for the appointment</p>
                                                :
                                                bookings ?
                                                    <></> :
                                                    <Loading />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                <button style={{ width: "150px" }} type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Today;