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
const Upcoming = () => {
  const dispatch = useDispatch();
  const [navcollapse, setNavcollapse] = useState(false);
  const appointmentd = useSelector((state) => state.appointment);

  // decoding the the jwt token
  const useData =
    localStorage?.getItem("token") && jwtDecode(localStorage?.getItem("token"));

  // filter appointment
  const filterAppointment = appointmentd.appointment.filter((data) => {
    if (
      data.doctor.toLowerCase().replace(/\s/g, "") ===
      useData.username.toLowerCase().replace(/\s/g, "")
    ) {
      return data;
    }
  });

  // navbar collaps
  function onclick() {
    setNavcollapse(!navcollapse);
  }

  // lode once befor the brower render
  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchBooking());
  }, []);

  // sort appoint by upcoming days
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const tomorrowISO = tomorrow.toISOString().slice(0, 10); // Get tomorrow's date in the format "yyyy-mm-dd"
  const sortedData = filterAppointment
    .filter((obj) => obj.date >= tomorrowISO) // Filter out objects with today's date or any previous date
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/-/g, "/") + " " + a.time);
      const dateB = new Date(b.date.replace(/-/g, "/") + " " + b.time);
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
        <Sidenav tab={"upcomingappointment"} />
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
              Welcome {useData.username.toUpperCase()}
            </h3>
          </div>
        </nav>
        <div className=" mx-auto">
          <div className="container-fluid">
            <div className="mt-5 px-2">
              <h6>
                {sortedData.length === 0
                  ? "NO APPOINTMENT Upcoming"
                  : "Upcoming APPOINTMENTS"}
              </h6>
              {sortedData.length === 0 ? (
                <Loading />
              ) : (
                <div
                  className="border rounded shadow bg-light text-secondary px-4"
                  style={{ width: "100%", overflowX: "scroll" }}
                >
                  <table class="table table-border">
                    <thead className="text-secondary">
                      <tr className="">
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

export default Upcoming;
