import React, { useState, useEffect } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../admin/component/loading';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking } from '../../../redux/reducer/slice/bookingSlice';
import { fetchSingleAppointment } from '../../../redux/reducer/slice/appointmentSlice';
import { toast } from 'react-toastify';

const Detail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    // 
    useEffect(() => {
        dispatch(fetchSingleAppointment(id))
    }, [])


    const appointmentData = useSelector(state => state.appointment.singleAppointment)

    const [value, onChange] = useState(appointmentData.time);

    // handel input  
    const [formData, setFormdata] = useState({
        username: '',
        email: '',
        date: appointmentData?.date ? new Date(appointmentData?.date) : new Date(),
        time: value,
        appointment: ""
    })
    // 
    useEffect(() => {
        setFormdata({
            time: appointmentData.time ? appointmentData.time : "00:00",
            date: appointmentData.date ? new Date(appointmentData?.date) : new Date(),
            appointment:id
        })
    }, [appointmentData])

    // handel form 
    const formChange = (e) => {
        setFormdata({ ...formData, [e.target.name]: e.target.value })
    }

    // booking 
    const booking = async () => {
        try {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!formData.username || !formData.email) {
                toast.error("Fill All The Fields!!")
            } else {
                if (formData.email.match(validRegex)) {
                    var res = await axios.post(`${import.meta.env.VITE_PROXY_URI}/booking`, formData)
                    dispatch(addBooking(res.data.data))
                } else {
                    toast.error("Invalid Email!!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="container-fluid">
            <div className="container">
                {
                    appointmentData ?
                        <div className="row mt-5">
                            <div className="col-md-7 m-0 p-0 mx-auto">
                                <div className="top rounded border">
                                    <div className="row mx-auto">
                                        <div className="col-md-4 col-lg-4 col-sm-12 m-0 p-0 d-flex justify-content-center align-items-center">
                                            <img style={{ width: "100%", height: "100%", objectFit: 'cover' }} className='img-fluid' src={appointmentData?.image?.url} alt="" />
                                        </div>
                                        <div className="col-md-8 px-4 bg-light pt-3">
                                            <div className="info">
                                                <h5 className='fw-bold' style={{ color: "#005963" }}>{appointmentData?.doctor}</h5>
                                                <h6 className="fw-bold mt-3" style={{ color: "#005950" }}>{appointmentData.title}</h6>
                                            </div>
                                            <div className="links mt-2">
                                                <div className="link">
                                                    <i style={{ color: "#00acb1" }} className='mt-3 fa-solid fa-phone'></i>
                                                    <span className='mx-2'>(+977)1234567</span>
                                                </div>
                                                <div className="link">
                                                    <i style={{ color: "#00acb1" }} className="mt-3 fa-solid fa-envelope"></i>
                                                    <span className='mx-2'>example@gmail.com</span>
                                                </div>
                                                <div className="link">
                                                    <i style={{ color: "#00acb1" }} className="mt-3 fa-solid fa-location-dot"></i>
                                                    <span className='mx-2'>Kathmandu,Tinkune</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overview mt-5 mx-auto px-2">
                                    <p className='h4 fw-bold mb-4' style={{ color: '#005963' }}>Overview Of {appointmentData?.doctor}</p>
                                    <p className='text-dark' style={{ fontSize: '1rem' }}>{appointmentData?.description}</p>
                                </div>
                                <div className="overview mt-5 mx-auto px-2">
                                    <p className='h4 fw-bold mb-4' style={{ color: '#005963' }}>Subspecialities</p>
                                    <p className='text-dark' style={{ fontSize: '1rem' }}>{appointmentData?.subspecialities}</p>
                                </div>
                            </div>
                            <div className="col-md-4 mx-auto">
                                <div className="booking pt-3">
                                    <p className='h4 fw-bolder' style={{ color: '#005963' }}>Booking Summery</p>
                                    <div className="booking_form position-relative">
                                        <div className="contact_form mt-3">
                                            <div className="form-group">
                                                <div className="font-control">
                                                    <input placeholder='Name' name='username' onChange={e => formChange(e)} type="text" className='form-control py-2 mt-2' />
                                                </div>
                                            </div>
                                            <div className="form-group mt-4">
                                                <div className="font-control">
                                                    <input placeholder='Email' type="email" name='email' onChange={e => formChange(e)} className='form-control py-2 mt-2' />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="forms">
                                            <div className="form mt-4">
                                                <div class="input-group date" data-provide="datepicker">
                                                    <DatePicker date={formData?.date} locale={enGB}>
                                                        {({ inputProps, focused }) => (
                                                            <>
                                                                <input
                                                                    disabled
                                                                    type="date"
                                                                    style={{ position: "relative" }}
                                                                    className={
                                                                        "form-control rounded text-sm text-secondary" +
                                                                        (focused ? " -focused" : "")
                                                                    }
                                                                    {...inputProps}
                                                                    placeholder=" Expiry date"
                                                                />
                                                                <i style={{ position: "absolute", right: '5%', top: "25%" }} className='fa-solid fa-calendar'></i>
                                                            </>
                                                        )}
                                                    </DatePicker>
                                                </div>
                                            </div>
                                            <div className="form mt-4">
                                                <div class="input-group date" data-provide="datepicker">
                                                    <input className='form-control' disabled type='time' value={formData.time} />
                                                    <i style={{ position: "absolute", right: '5%', top: "25%" }} className='fa-solid fa-clock'></i>
                                                </div>
                                            </div>

                                            <div className="button_book mt-4">
                                                <button onClick={booking} className='btn btn-outline-primary mx-auto d-block'>Book Appointment <i className='fa-solid fa-arrow-right'></i> </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Loading />
                }
            </div>
        </div>
    )
}

export default Detail