import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidenav from '../../component/Sidenav';
import { appointment, add, deleteAppointment, fetchAppointment } from '../../../../redux/reducer/slice/appointmentSlice';
import img from "../../../../assets/doctor.jpg"
import axios from 'axios';
const Appointment = () => {

    const [navcollapse, setNavcollapse] = useState(false);
    const appointmentd = useSelector((state) => state.appointment)
    const dispatch = useDispatch();
    console.log(appointmentd.appointment)
    function onclick() {
        setNavcollapse(!navcollapse)
        console.log('navcollapse');
    }

    useEffect(() => {
        dispatch(fetchAppointment())
    }, [])

    // dummy data for the appointment  


    // dynamic form control 
    const [inputFields, setInputFields] = useState([
        {
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
            var a = await axios.post("http://localhost:5000/api/appointment/add", formdata)
        } catch (error) {
            console.log(error)
        }

    }

    const dataURLToBlob = (dataurl) => {
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    return (
        <div className={navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"} id="wrapper">
            {/* Sidebar */}
            <div style={{ zIndex: '999' }} className="sidenav">
                <Sidenav tab={"appointment"} />
            </div>
            {/* Page Content */}
            <div id="page-content-wrapper" className='bg-light'>
                <nav style={{ zIndex: '1' }} className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                    <div className="d-flex align-items-center">
                        <i onClick={onclick} className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle" />
                    </div>
                </nav>
                {/* appointment table  */}
                <div className=" mx-auto">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-md-4 col-lg-3"><button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn btn-outline-primary my-2'>Add Appointment</button></div>
                            <div className='mt-3'>
                                <h6>RECENT APPOINTMENT</h6>
                                <div className='border rounded shadow bg-light text-secondary px-4' style={{ width: "100%", overflowX: "hidden" }}>
                                    <table class="table table-border">
                                        <thead className='text-secondary'>
                                            <tr className=''>
                                                <th scope="col">Title</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                appointmentd.appointment ?
                                                appointmentd.appointment.map((data, ind) => {
                                                    return (
                                                        <tr key={ind + 1}>
                                                            <td>{data.title}</td>
                                                            <td><img width={50} height={50} src={image? URL.createObjectURL(image) : data.image.url} alt="image" /></td>
                                                            <td>{data.date}</td>
                                                            <td>{data.time}</td>
                                                            <td className=''>
                                                                <button style={{ width: "30px" }} className='btn btn-sm me-1 text-primary'> <i className='fa-solid fa-pen '></i> </button>
                                                                <button onClick={() => dispatch(deleteAppointment(data._id))} style={{ width: "30px" }} className='btn btn-sm me-1 text-danger'> <i className='fa-solid fa-trash'></i> </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                                :
                                                ""
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal pop up  */}
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="exampleModalLabel">Add Appointment</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form id='contact-form' style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            {
                                                inputFields.map((input, ind) => {
                                                    return (
                                                        <>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Title</label>
                                                                    <input onChange={event => handleFormChange(ind, event)} name='title' value={input.title} type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title here" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Image</label>
                                                                    <input onChange={event => setImage(event.target.files[0])} name='image' type="file" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title here" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Date</label>
                                                                    <input onChange={event => handleFormChange(ind, event)} name='date' type="date" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title here" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Time</label>
                                                                    <input onChange={event => handleFormChange(ind, event)} name='time' type="time" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title here" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                                    <textarea onChange={event => handleFormChange(ind, event)} name='description' type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description here" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={submitForm} type="sumbit" className="btn btn-outline-primary">Save</button>
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Appointment;