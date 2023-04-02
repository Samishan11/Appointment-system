import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidenav from '../../component/Sidenav';
import axios from 'axios';
import Calender from '../../../../component/Calender';
const Manageevent = () => {

    const [navcollapse, setNavcollapse] = useState(false);
    const dispatch = useDispatch();
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
    const handleFormChangeUpdate = (index, event) => {
        let data = [...inputFieldsUpdate];
        data[index][event.target.name] = event.target.value
        setInputFieldsUpdate(data);

    }
    // submit form 
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const formdata = new FormData();
            formdata.append("image", image)
            formdata.append("title", inputFields[0].title)
            formdata.append("description", inputFields[0].description)
            formdata.append("date", inputFields[0].date)
            formdata.append("time", inputFields[0].time)
            dispatch(add({ inputFields: inputFields[0], image }))
            var a = await axios.post("http://localhost:5000/api/Manageevent/add", formdata)
        } catch (error) {
            console.log(error)
        }

    }

    // delete Manageevent 
    const _deleteManageevent = async (id) => {
        try {
            dispatch(deleteManageevent(id))
            var res = await axios.delete(`http://localhost:5000/api/Manageevent/delete/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
    const updateAppoint = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateManageevent(inputFieldsUpdate, image))
        } catch (error) {
            console.log(error)
        }
    }
    const events = [
        {
            title: "Dental Doctro A",
            start: "2023-03-01",
            display: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor B",
            start: "2023-03-15",
            end: "2023-03-17",
            display: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor C",
            start: "2023-03-10",
            display: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor C",
            start: "2023-03-10",
            display: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor D",
            start: "2023-03-28",
            display: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];

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
                                < Calender events={events} selectable={true} editable={true} addAble={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Manageevent;