import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppointment } from "../../../../redux/reducer/slice/appointmentSlice";
import Loading from "../../component/loading";
import Sidenav from "../../component/Sidenav";
import { fetchBooking } from "../../../../redux/reducer/slice/bookingSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  const [navcollapse, setNavcollapse] = useState(false);
  const appointmentd = useSelector((state) => state.appointment);
  const booking = useSelector((state) => state.booking.booking.slice(0, 8));
  const user = useSelector((state) => state.user.user);

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
        <Sidenav tab={"dashboard"} />
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
            <h2 className="fs-2 m-0">Dashboard</h2>
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
              <h6>RECENT BOOKINGS</h6>
              {booking.length === 0 ? (
                <Loading />
              ) : (
                <div
                  className="border rounded shadow bg-light text-secondary px-4"
                  style={{ width: "100%", overflowX: "scroll" }}
                >
                  <table class="table table-border">
                    <thead className="text-secondary">
                      <tr className="">
                        <th scope="col">USERNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">APPOINTMENT ID</th>
                        <th scope="col">DATE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {booking ? (
                        booking?.slice(0, 9)?.map((data, ind) => {
                          return (
                            <tr className="py-4" key={ind + 1}>
                              <td>{data.username}</td>
                              <td>{`${data.email}`}</td>
                              <td>{`${data?.appointment?.uuid}`}</td>
                              <td>{new Date(data.booked_on).toDateString()}</td>
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

export default Dashboard;
