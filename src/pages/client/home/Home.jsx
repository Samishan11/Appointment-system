import React, { useEffect } from 'react'
import Calender from '../../../component/Calender';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointment } from '../../../redux/reducer/slice/appointmentSlice';
const Home = () => {
    const dispatch = useDispatch();
    const appointment = useSelector(state => state.appointment.appointment)
    // filter appointment by booked 
    const filterAppointment = appointment.filter((data) => {
        if (!data.isBooked) {
            return data
        }
    })
    useEffect(() => {
        dispatch(fetchAppointment())
    }, [])

    return (
        <div className='container-fluid'>
            <div className="container">
                <div className="event_calendar ">
                    <Calender events={filterAppointment} />
                </div>
            </div>
        </div>
    )
}

export default Home