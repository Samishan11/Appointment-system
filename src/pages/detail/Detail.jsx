import React, { useState } from 'react'
import image from "../../assets/doctor.jpg";
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
const Detail = () => {
    const [date, setDate] = useState(
        new Date()
    );
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7 m-0 p-0 mx-auto">
                    <div className="top rounded border">
                        <div className="row mx-auto">
                            <div className="col-md-4 m-0 p-0 d-flex justify-content-center align-items-center">
                                <img style={{ width: "100%", objectFit: 'cover' }} className='img-fluid' src={image} alt="" />
                            </div>
                            <div className="col-md-8 px-4 bg-light pt-3">
                                <div className="info">
                                    <h5 className='fw-bold' style={{ color: "#005963" }}>Matthew Reyes</h5>
                                    <h6 className="fw-bold mt-3" style={{ color: "#005950" }}>Obstetrics & Gynaecology</h6>
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
                    <div className="overview mt-4 mx-auto px-2">
                        <p className='h4 fw-bold' style={{ color: '#005963' }}>Overview Of Matthew Reyes</p>
                        <p className='text-dark' style={{ fontSize: '1rem' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div>
                </div>
                <div className="col-md-4 mx-auto">
                    <div className="booking pt-3">
                        <p className='h4 fw-bolder' style={{ color: '#005963' }}>Booking Summery</p>
                        <div className="form mt-3">
                            <label className='h6 fw-bold mb-2' htmlFor="">Date</label>
                            <div class="input-group date" data-provide="datepicker">
                                <DatePicker date={date} onDateChange={setDate} locale={enGB}>
                                    {({ inputProps, focused }) => (
                                        <>
                                            <input
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
                        <div className="form mt-3">
                            <label className='h6 fw-bold mb-2' htmlFor="">Date</label>
                            <div class="input-group date" data-provide="datepicker">
                                <DatePicker date={date} onDateChange={setDate} locale={enGB}>
                                    {({ inputProps, focused }) => (
                                        <>
                                            <input
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
                        <div className="button_book mt-4">
                            <button className='btn btn-outline-primary mx-auto d-block'>Book Appointment <i className='fa-solid fa-arrow-right'></i> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail