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

const Appointment = () => {
  const dispatch = useDispatch();

  const [navcollapse, setNavcollapse] = useState(false);
  const appointmentd = useSelector((state) => state.appointment);

  // decoding the the jwt token
  const useData =
    localStorage?.getItem("token") && jwtDecode(localStorage?.getItem("token"));

  // filter appointment
  const filterAppointment = appointmentd.appointment.filter((data) => {
    if (data.doctor.toLowerCase() === useData.username.toLowerCase()) {
      return data;
    }
  });

  // navbar collaps
  function onclick() {
    setNavcollapse(!navcollapse);
  }

  //
  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchBooking());
  }, []);

  // sorting by the date first and the the day of time
  const sortedData = filterAppointment.sort((a, b) => {
    const dateA = new Date(a.date.replace(" ", "T") + "T" + a.time + ":00");
    const dateB = new Date(b.date.replace(" ", "T") + "T" + b.time + ":00");
    // Compare the dates first
    if (dateA.getDate() !== dateB.getDate()) {
      return dateA.getDate() - dateB.getDate();
    }
    // If the dates are the same, compare the times
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div
      className={
        navcollapse ? "d-flex toggled bg-light" : "d-flex bg-light toggled_non"
      }
      id="wrapper"
    >
      {/* Sidebar */}
      <div style={{ zIndex: "999" }} className="sidenav">
        <Sidenav tab={"doctorappointment"} />
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
            <div className="mt-5 px-2">
              <h6>ALL APPOINTMENTS</h6>
              {filterAppointment.length === 0 ? (
                <Loading />
              ) : (
                <div
                  className="border rounded shadow bg-light text-secondary px-4"
                  style={{ width: "100%", overflowX: "hidden" }}
                >
                  <table class="table table-border">
                    <thead className="text-secondary">
                      <tr className="">
                        <th scope="col">APPOINTMENT ID</th>
                        <th scope="col">DATE</th>
                        <th scope="col">TIME</th>
                        <th scope="col">DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData ? (
                        sortedData?.slice(0, 9)?.map((data, ind) => {
                          return (
                            <tr className="py-4" key={ind + 1}>
                              <td>{`${data._id}`}</td>
                              <td>{new Date(data.date).toDateString()}</td>
                              <td>{data.time}</td>
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

export default Appointment;
