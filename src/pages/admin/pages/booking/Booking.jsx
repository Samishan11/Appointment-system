import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidenav from "../../component/Sidenav";
import axios from "axios";
import Loading from "../../component/loading";
import {
  deleteBooking,
  fetchBooking,
  updateBooking,
} from "../../../../redux/reducer/slice/bookingSlice";
import { toast } from "react-toastify";
import Pagination from "../../component/pagination";

export const TableBooking = ({ items }) => {
  // status input field
  const [status, setStatus] = useState("");

  // handel input change
  const onInputChange = (e, id) => {
    setStatus(e.target.value);
    const updateAppointment = async () => {
      try {
        var res = await axios.put(
          `${import.meta.env.VITE_PROXY_URI}/booking/update/${id}`,
          {
            status: e.target.value,
          }
        );
        dispatch(updateBooking(id, e.target.value));
      } catch (error) {
        console.log(error);
      }
    };
    updateAppointment();
  };

  // delete Booking
  const _deleteBooking = async (id) => {
    try {
      var res = await axios.delete(
        `${import.meta.env.VITE_PROXY_URI}/booking/delete/${id}`
      );
      toast.success(res.data.message);
      dispatch(deleteBooking(id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const zoom = async (email, id) => {
    console.log(email, id);
    try {
      var res = await axios.post(
        `${import.meta.env.VITE_PROXY_URI}/create-zoomlink/${id}`,
        {
          email,
        }
      );
      if (res.data.success) {
        toast.success("Link has been created");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <>
      {items.map((data, ind) => {
        return (
          <tr key={ind + 1}>
            <td>{data.username}</td>
            <td>{`${data.email}`}</td>
            <td>{`${data.appointment}`}</td>
            <td>{new Date(data.booked_on).toDateString()}</td>
            <td className="py-2">
              <select
                onChange={(e) => onInputChange(e, data._id)}
                className="form-select"
                aria-label="Default select example"
              >
                <option selected>{data?.status?.toUpperCase()}</option>
                {data.status !== "pending" && (
                  <option value="pending">PENDING</option>
                )}
                {data.status !== "approve" && (
                  <option value="approve">APPROVE</option>
                )}
                {data.status !== "reject" && (
                  <option value="reject">REJECT</option>
                )}
                {data.state !== "pospond" && (
                  <option value="pospond">POSPOND</option>
                )}
              </select>
            </td>
            <td className="d-flex px-2">
              {data.status === "approve" && (
                <button
                  onClick={() => zoom(data.email, data._id)}
                  style={{ width: "" }}
                  className="btn btn-sm me-1 text-primary"
                >
                  {" "}
                  <i className="fa-solid fa-video"></i>{" "}
                </button>
              )}
              <button
                onClick={() => _deleteBooking(data._id)}
                style={{ width: "" }}
                className="btn btn-sm me-1 text-danger"
              >
                {" "}
                <i className="fa-solid fa-trash"></i>{" "}
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

const Booking = () => {
  const dispatch = useDispatch();
  const [navcollapse, setNavcollapse] = useState(false);
  const booking = useSelector((state) => state.booking.booking);

  //
  function onclick() {
    setNavcollapse(!navcollapse);
  }

  //
  useEffect(() => {
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
        <Sidenav tab={"booking"} />
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
            <h2 className="fs-2 m-0">Booking</h2>
          </div>
        </nav>
        {/* Booking table  */}
        <div className=" mx-auto">
          <div className="container-fluid">
            <div className="row">
              <div className="mt-5">
                <h6 className="fw-light">RECENT BOOKING</h6>
                {booking.length === 0 ? (
                  <Loading />
                ) : (
                  <div
                    className="border table-responsive rounded shadow bg-light text-secondary mt-4 px-4"
                    style={{ width: "100%", overflowX: "scroll" }}
                  >
                    <table class="table table-border">
                      <thead className="text-secondary">
                        <tr className="">
                          <th scope="col">USERNAME</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">APPOINTMENT_NO</th>
                          <th scope="col">BOOKED_ON</th>
                          <th scope="col">STATUS</th>
                          <th scope="col">ACTION</th>
                        </tr>
                      </thead>
                      <Pagination
                        items={booking}
                        itemsPerPage={10}
                        pathname={"admin/booking"}
                      />
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
