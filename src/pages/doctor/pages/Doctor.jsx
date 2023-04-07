import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointment,
  getInterval,
} from "../../../redux/reducer/slice/appointmentSlice";
import Loading from "../../admin/component/loading";
import Sidenav from "../components/Sidenav";
import { fetchBooking } from "../../../redux/reducer/slice/bookingSlice";
import jwtDecode from "jwt-decode";
const Doctor = () => {
  const dispatch = useDispatch();
  const [navcollapse, setNavcollapse] = useState(false);
  const appointmentd = useSelector((state) => state.appointment);
  const booking = useSelector((state) => state.booking.booking.slice(0, 8));
  const user = useSelector((state) => state.user.user);
  //
  const useData =
    localStorage?.getItem("token") && jwtDecode(localStorage?.getItem("token"));

  // filter appointment
  const [filterAppointment, setFilterAppointment] = useState([]);
  useEffect(() => {
    const filterAppointment = appointmentd.appointment.filter((data) => {
      if (
        data.doctor.toLowerCase().replace(/\s/g, "") ===
        useData.username.toLowerCase().replace(/\s/g, "")
      ) {
        return data;
      }
    });
    setFilterAppointment(filterAppointment);
  }, [appointmentd]);

  // sort appointment
  const today = new Date().toISOString().slice(0, 10); // Get today's date in the format "yyyy-mm-dd"
  const sortedData = filterAppointment
    .filter((obj) => obj.date === today) // Filter only objects with today's date
    .sort((a, b) => {
      const dateA = new Date(today.replace(/-/g, "/") + " " + a.time);
      const dateB = new Date(today.replace(/-/g, "/") + " " + b.time);
      return dateA.getTime() - dateB.getTime();
    });

  //
  function onclick() {
    setNavcollapse(!navcollapse);
    console.log("navcollapse");
  }

  //
  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchBooking());
  }, []);

  return (
    <div
      className={
        navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"
      }
      id="wrapper"
    >
      {/* Sidebar */}
      <div style={{ zIndex: "999" }} className="sidenav">
        <Sidenav tab={"doctor"} />
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
            <h3 className="fs-3 m-0">
              Welcome User {useData.username.toUpperCase()}
            </h3>
          </div>
        </nav>
        <div className=" mx-auto">
          <div className="container-fluid">
            <div className="row g-3 my-2">
              <div className="col-md-4">
                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2">{booking.length}</h3>
                    <p className="fs-5">Bookings</p>
                  </div>
                  <i class="fa-solid fa-calendar-check primary-text border rounded-full h2 secondary-bg p-3"></i>
                  {/* <i className="fas fa-gift fs-1 primary-text border rounded-full secondary-bg p-3" /> */}
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2">{user.length}</h3>
                    <p className="fs-5">Users</p>
                  </div>
                  <i className="fa-solid fa-people-roof fs-1 primary-text border rounded-full secondary-bg p-3" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3 bg-primary text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                  <div>
                    <h3 className="fs-2">{appointmentd.appointment.length}</h3>
                    <p className="fs-5">Events</p>
                  </div>
                  <i className="fas fa-chart-line fs-1 primary-text border rounded-full secondary-bg p-3" />
                </div>
              </div>
            </div>
            <div className="mt-5 px-2">
              <h6 className="h6">TODAY APPOINTMENTS</h6>
              {sortedData.length === 0 ? (
                <Loading />
              ) : (
                <div
                  className="border rounded shadow bg-light text-secondary px-4"
                  style={{ width: "100%", overflowX: "hidden" }}
                >
                  <table class="table table-border">
                    <thead className="text-secondary">
                      <tr className="">
                        <th scope="col">USERNAME</th>
                        <th scope="col">APPOINTMENT ID</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TIME START</th>
                        <th scope="col">TIME END</th>
                        <th scope="col">DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData ? (
                        sortedData?.slice(0, 9)?.map((data, ind) => {
                          return (
                            <tr className="py-4" key={ind + 1}>
                              <td>{data.doctor}</td>
                              <td>{`${data._id}`}</td>
                              <td>{new Date(data.date).toDateString()}</td>
                              <td>{data.time}</td>
                              <td>{data.time_end}</td>
                              <td>{getInterval(data)}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <Loading />
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
