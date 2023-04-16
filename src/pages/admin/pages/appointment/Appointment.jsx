import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../../component/Sidenav";
import {
  deleteAppointment,
  fetchAppointment,
  getInterval,
  singleAppointment,
  updateAppointment,
} from "../../../../redux/reducer/slice/appointmentSlice";
import axios from "axios";
import Loading from "../../component/loading";
import { toast } from "react-toastify";
import { fetchuser } from "../../../../redux/reducer/slice/userSlice";

import Pagination from "../../component/pagination";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { Box } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Appointmentmodal } from "./Appointmentmodal";
import useAddAppointment from "./Addappointment";
export const TableBody = ({ items }) => {
  const dispatch = useDispatch();
  // dynamic form control
  const appointmentSingle = useSelector(
    (state) => state.appointment.singleAppointment
  );
  useEffect(() => {
    setInputFieldsUpdate([
      {
        _id: appointmentSingle?._id,
        title: appointmentSingle?.title,
        detail: appointmentSingle?.detail,
        date: appointmentSingle?.date,
        time: appointmentSingle?.time,
        time_end: appointmentSingle?.time_end,
        doctor: appointmentSingle?.doctor,
      },
    ]);
  }, [appointmentSingle]);
  const [inputFieldsUpdate, setInputFieldsUpdate] = useState([
    {
      _id: "",
      title: "",
      detail: "",
      date: "",
      time: "",
      time_end: "",
      doctor: "",
    },
  ]);
  // image hook
  const [image, setImage] = useState([]);

  // handel form on change
  const handleFormChangeUpdate = (index, event) => {
    let data = [...inputFieldsUpdate];
    data[index][event.target.name] = event.target.value;
    setInputFieldsUpdate(data);
  };
  // delete appointment
  const _deleteAppointment = async (id) => {
    try {
      dispatch(deleteAppointment(id));
      var res = await axios.delete(
        `${import.meta.env.VITE_PROXY_URI}/appointment/delete/${id}`
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // update appointment
  const updateAppoint = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("image", image);
      formdata.append("title", inputFieldsUpdate[0].title);
      formdata.append("doctor", inputFieldsUpdate[0].doctor);
      formdata.append("detail", inputFieldsUpdate[0].detail);
      formdata.append("date", inputFieldsUpdate[0].date);
      formdata.append("time", inputFieldsUpdate[0].time);
      formdata.append("time_end", inputFieldsUpdate[0].time_end);
      var res = await axios.put(
        `${import.meta.env.VITE_PROXY_URI}/appointment/update/${
          inputFieldsUpdate[0]._id
        }`,
        formdata
      );
      dispatch(updateAppointment(res.data));
      toast.success(res.data.message);
      if (res.data.success) {
        document.getElementById("updatemodal").classList.remove("show");
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.classList.remove("modal-backdrop"));
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message)
    }
  };
  return (
    <>
      {items.map((data, ind) => (
        <tr key={ind + 1}>
          <td>{data.title}</td>
          <td>{data.doctor}</td>
          <td key={ind + 1}>
            <img className="avatar_sm" src={data?.image?.url} alt="image" />
          </td>
          <td>{new Date(data.date).toDateString()}</td>
          <td>{`${data.time} ${data.time >= "12:00" ? "PM" : "AM"}`}</td>
          <td>{`${data.time_end} ${
            data.time_end >= "12:00" ? "PM" : "AM"
          }`}</td>
          {!data.interval ? (
            <td>{getInterval(data)}</td>
          ) : (
            <td>
              {data.interval >= 60
                ? parseInt(data.interval / 60)
                : data.interval}
            </td>
          )}
          <td className="">
            <Box>
              <Fab
                onClick={() => {
                  dispatch(singleAppointment(data));
                }}
                data-bs-toggle="modal"
                data-bs-target="#updatemodal"
                className="cus_fab me-3"
                color="warning"
              >
                <Edit />
              </Fab>
              <Fab
                onClick={() => _deleteAppointment(data._id)}
                className="cus_fab"
                color="error"
              >
                <Delete />
              </Fab>
            </Box>
          </td>
        </tr>
      ))}
      {/* update modal */}
      <div
        className="modal fade"
        id="updatemodal"
        tabIndex={-1}
        aria-labelledby="updatemodalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="updatemodalLabel">
                Update Appointment
              </h1>
              <button
                type="button"
                className="btn-close text-danger fas fa-times"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form
              onSubmit={updateAppoint}
              id="contact-form"
              style={{ fontSize: "1rem" }}
              className="container validate-form"
            >
              <div className="modal-body">
                <div className="container  pb-5">
                  <div className="container bg-white d-block mx-auto">
                    <div className="row">
                      {inputFieldsUpdate.map((input, ind) => {
                        return (
                          <>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label>Appointment Title</label>
                                <input
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  name="title"
                                  value={inputFieldsUpdate[0]?.title}
                                  type="text"
                                  className="form-control input100"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label>Doctor Name</label>
                                <input
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  name="doctor"
                                  value={inputFieldsUpdate[0]?.doctor}
                                  type="text"
                                  className="form-control input100"
                                  // placeholder={singleAppointmentData.doctor}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label htmlFor="">Image</label>
                                <input
                                  onChange={(event) =>
                                    setImage(event.target.files[0])
                                  }
                                  name="image"
                                  type="file"
                                  className="form-control input100"
                                  placeholder="Enter title here"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label htmlFor="">Date</label>
                                <input
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  name="date"
                                  value={inputFieldsUpdate[0]?.date}
                                  type="date"
                                  className="form-control input100"
                                  placeholder={"Enter title here"}
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label htmlFor="">Time Start</label>
                                <input
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  name="time"
                                  value={inputFieldsUpdate[0]?.time}
                                  type="time"
                                  className="form-control input100"
                                  id=""
                                  aria-describedby=""
                                  placeholder="Enter title here"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label htmlFor="">Time End</label>
                                <input
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  name="time_end"
                                  value={inputFieldsUpdate[0]?.time_end}
                                  type="time"
                                  className="form-control input100"
                                  placeholder="Enter title here"
                                />
                              </div>
                            </div>
                            <div className="col-12 col-md-12 my-2">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Description
                                </label>
                                <textarea
                                  onChange={(event) =>
                                    handleFormChangeUpdate(ind, event)
                                  }
                                  rows={6}
                                  name="detail"
                                  value={inputFieldsUpdate[0]?.detail}
                                  type="text"
                                  className="form-control input100"
                                  placeholder="Enter description here"
                                />
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="sumbit" className="btn btn-outline-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Appointment = () => {
  const [navcollapse, setNavcollapse] = useState(false);

  const appointmentd = useSelector((state) => state.appointment);

  // declering the usedispach function
  const dispatch = useDispatch();

  // side nav open and close
  function onclick() {
    setNavcollapse(!navcollapse);
  }

  // dispatching the data before the browser render
  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchuser());
  }, []);

  // use add appointments
  const {
    inputFields,
    handleChange,
    handleFormChangeAppointment,
    loading,
    submitForm,
    transformedOptions,
    selectedOption,
    setImage,
  } = useAddAppointment();

  return (
    <div
      className={
        navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"
      }
      id="wrapper"
    >
      {/* Sidebar */}
      <div style={{ zIndex: "999" }} className="sidenav">
        <Sidenav tab={"appointment"} />
      </div>
      {/* Page Content */}
      <div id="page-content-wrapper" className="bg-light">
        <nav
          style={{ zIndex: "1" }}
          className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4"
        >
          <div className="d-flex align-items-center">
            <i
              onClick={onclick}
              className="fas fa-align-left primary-text fs-4 me-3"
              id="menu-toggle"
            />
            <h2 className="fs-2 m-0">Appointment</h2>
          </div>
        </nav>
        {/* appointment table  */}
        <div className=" mx-auto">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 mt-2 col-md-5 col-lg-3">
                <Fab
                  size="medium"
                  data-bs-toggle="modal"
                  data-bs-target="#apointmentModal"
                  className=" my-2 mx-2"
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </div>
              <div className="mt-5">
                <h6>RECENT APPOINTMENT</h6>
                {appointmentd.appointment.length === 0 ? (
                  <Loading />
                ) : (
                  <div
                    className="border table-responsive rounded shadow bg-light text-secondary px-4"
                    style={{ width: "100%", overflowX: "scroll" }}
                  >
                    <table class="table table-border">
                      <thead className="text-secondary">
                        <tr className="">
                          <th scope="col">Title</th>
                          <th scope="col">Doctor</th>
                          <th scope="col">Image</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time Start</th>
                          <th scope="col">Time End</th>
                          <th scope="col">Interval</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <Pagination
                        items={appointmentd.appointment}
                        itemsPerPage={10}
                        pathname={"admin/appointment"}
                      />
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal pop up  */}
      <Appointmentmodal
        inputFields={inputFields}
        handleChange={handleChange}
        handleFormChangeAppointment={handleFormChangeAppointment}
        loading={loading}
        submitForm={submitForm}
        transformedOptions={transformedOptions}
        selectedOption={selectedOption}
        setImage={setImage}
      />
      {/* Modal */}
    </div>
  );
};

export default Appointment;
