import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidenav from '../../component/Sidenav';
import axios from 'axios';
import Calender from '../../../../component/Calender';
import { fetchAppointment } from '../../../../redux/reducer/slice/appointmentSlice';
const Manageevent = () => {
    const dispatch = useDispatch();
    const appointment = useSelector(state => state.appointment.appointment)
    useEffect(() => {
        dispatch(fetchAppointment())
    }, [])
    
    const [navcollapse, setNavcollapse] = useState(false);

    // 
    function onclick() {
        setNavcollapse(!navcollapse)
    }

    // dynamic form control 
    const [inputFields, setInputFields] = useState([
        {
            title: "",
            description: "",
            date: "",
            time: ""
        }
    ])
    // dynamic form control 
    const [inputFieldsUpdate, setInputFieldsUpdate] = useState([
        {
            _id: "",
            title: "",
            description: "",
            date: "",
            time: ""
        }
    ])
    // image hook 
    const [image, setImage] = useState('');

    // input handel event on input change 
    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }


    return (
        <div className={navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"} id="wrapper">
            {/* Sidebar */}
            <div style={{ zIndex: '999' }} className="sidenav">
                <Sidenav tab={"event"} />
            </div>
            {/* Page Content */}
            <div id="page-content-wrapper" className='bg-light'>
                <nav style={{ zIndex: '1' }} className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                        <h2 className="fs-2 m-0">Event</h2>
                    </div>
                </nav>
                {/* Manageevent table  */}
                <div className=" mx-auto">
                    <div className="container">
                        <div className="row">
                            <div className='mt-3 px-3'>
                                <h6>MANAGE EVENTS</h6>
                                < Calender events={appointment} selectable={true} editable={true} addAble={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Manageevent;