import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Sidenav from '../../component/Sidenav';
import { add, deleteAppointment, fetchAppointment, singleAppointment, updateAppointment } from '../../../../redux/reducer/slice/appointmentSlice';
import axios from 'axios';
import Loading from '../../component/loading';
import { toast } from 'react-toastify';
const Appointment = () => {

    const [navcollapse, setNavcollapse] = useState(false);
    const appointmentd = useSelector((state) => state.appointment)
    const singleAppointmentData = useSelector((state) => state.appointment.singleAppointment)
    const dispatch = useDispatch();
    function onclick() {
        setNavcollapse(!navcollapse)
    }
    useEffect(() => {
        dispatch(fetchAppointment())
    }, [])

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
            var a = await axios.post("http://localhost:5000/api/appointment/add", formdata)
        } catch (error) {
            console.log(error)
        }

    }

    // delete appointment 
    const _deleteAppointment = async (id) => {
        try {
            dispatch(deleteAppointment(id))
            var res = await axios.delete(`http://localhost:5000/api/appointment/delete/${id}`)
        } catch (error) {
            console.log(error)
        }
    }
    const updateAppoint = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateAppointment(inputFieldsUpdate, image))
        } catch (error) {
            console.log(error)
        }
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
                                                                        <td><img className='avatar_sm' src={image ? URL.createObjectURL(image) : data.image.url} alt="image" /></td>
                                                                        <td>{new Date(data.date).toDateString()}</td>
                                                                        <td>{`${data.time} PM`}</td>
                                                                        <td className=''>
                                                                            <button onClick={() => {
                                                                                dispatch(singleAppointment(data))
                                                                                setInputFieldsUpdate([
                                                                                    {
                                                                                        _id: data._id,
                                                                                        title: data.title,
                                                                                        date: data.date,
                                                                                        time: data.time,
                                                                                        description: data.description,
                                                                                    }
                                                                                ])
                                                                            }} style={{ width: "30px" }} data-bs-toggle="modal" data-bs-target="#updatemodal" className='btn btn-sm me-1 text-primary'> <i className='fa-solid fa-pen '></i> </button>
                                                                            <button onClick={() => _deleteAppointment(data._id)} style={{ width: "30px" }} className='btn btn-sm me-1 text-danger'> <i className='fa-solid fa-trash'></i> </button>
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
                                }
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

            {/* update modal */}
            <div className="modal fade" id="updatemodal" tabIndex={-1} aria-labelledby="updatemodalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="updatemodalLabel">Update Appointment</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <form onSubmit={updateAppoint} id='contact-form' style={{ fontSize: '1rem' }} className="container validate-form">
                            <div className="modal-body">
                                <div className='container  pb-5'>
                                    <div className="container bg-white d-block mx-auto">
                                        <div className="row">
                                            {
                                                inputFieldsUpdate.map((input, ind) => {
                                                    return (
                                                        <>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">{input.title}</label>
                                                                    <input onChange={event => handleFormChangeUpdate(ind, event)} name='title' value={inputFieldsUpdate[0]?.title} type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={singleAppointmentData.title} />
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
                                                                    <input onChange={event => handleFormChangeUpdate(ind, event)} name='date' value={inputFieldsUpdate[0]?.date} type="date" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={"Enter title here"} />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Time</label>
                                                                    <input onChange={event => handleFormChangeUpdate(ind, event)} name='time' value={inputFieldsUpdate[0]?.time} type="time" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title here" />
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-12 my-2">
                                                                <div className="form-group">
                                                                    <label htmlFor="exampleInputEmail1">Description</label>
                                                                    <textarea onChange={event => handleFormChangeUpdate(ind, event)} name='description' value={inputFieldsUpdate[0]?.description} type="text" className="form-control input100" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter description here" />
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
                                <button type="sumbit" className="btn btn-outline-primary">Save</button>
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