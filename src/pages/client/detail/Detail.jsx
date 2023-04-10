import React, { useState, useEffect, useRef } from "react";
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "react-nice-dates/build/style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../admin/component/loading";
import { useDispatch, useSelector } from "react-redux";
import { addBooking } from "../../../redux/reducer/slice/bookingSlice";
import { fetchSingleAppointment } from "../../../redux/reducer/slice/appointmentSlice";
import { toast } from "react-toastify";
import { fetchuser } from "../../../redux/reducer/slice/userSlice";
import { LoadingSkeleton } from "../../../component/Skeleton/Skeleton";
import Skeleton from "react-loading-skeleton";
import { useForm } from "react-hook-form";
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  //
  useEffect(() => {
    dispatch(fetchSingleAppointment(id));
    dispatch(fetchuser());
  }, []);

  const appointmentData = useSelector(
    (state) => state.appointment.singleAppointment
  );

  //   filter user and show data
  const [filteUser, setFilteruser] = useState({});
  useEffect(() => {
    const fiterDoctorByUsername = user.find((data) => {
      if (
        data?.username?.toLowerCase()?.replace(/\s/g, "") ===
        appointmentData?.doctor?.toLowerCase()?.replace(/\s/g, "")
      ) {
        return data;
      }
    });
    setFilteruser(fiterDoctorByUsername);
  }, [user]);
  const [value, onChange] = useState(appointmentData?.time);

  // book now
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // booking
  const onSubmit = async (data) => {
    console.log(data);
    try {
      var res = await axios.post(
        `${import.meta.env.VITE_PROXY_URI}/booking`,
        data
      );
      reset({
        username: "",
        email: "",
      });
      dispatch(addBooking(res.data.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid">
      {appointmentData ? (
        <div className="row mt-2">
          <div className="col-md-7 m-0 p-0 mx-auto">
            {appointmentData?.title || appointmentData?.description ? (
              <div className="top rounded border">
                <div className="row mx-auto">
                  <div
                    style={{
                      backgroundImage: `  linear-gradient(
                  rgba(0, 0, 0, 0.6), 
                  rgba(0, 0, 0, 0.6)
                ),url(${appointmentData?.image?.url})`,
                    }}
                    className="col-md-12 banner_book position-relative m-0 p-0 "
                  >
                    <div className="banner_content_book">
                      <p className="h3 text-light">BOOK AN APPOINTMENT</p>
                      <p
                        style={{ fontSize: "1rem" }}
                        className=" b-3 text-light w-50"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Assumenda, in? Sit incidunt vero voluptates ut amet,
                        dolor pariatur voluptatibus. Laudantium! Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Assumenda,
                        in? Sit incidunt vero voluptates ut amet, dolor pariatur
                        voluptatibus. Laudantium!
                      </p>
                      <button
                        className="btn btn-primary"
                        style={{ width: "150px" }}
                        onClick={handleClick}
                      >
                        Book Now <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <LoadingSkeleton height={"25rem"} />
            )}
            <div className="docotor_info d-flex justify-content-around align-items-center">
              <div className="profile mt-2 d-flex align-items-center">
                {filteUser?.image?.url ? (
                  <img
                    className="rounded-circle me-2"
                    src={filteUser?.image?.url}
                    alt=""
                  />
                ) : (
                  <LoadingSkeleton
                    width={"40px"}
                    height={"40px"}
                    className={"rounded-circle me-2"}
                    count={1}
                  />
                )}
                {fetchuser?.specialities || filteUser?.username ? (
                  <span className="fw-bold">
                    {filteUser?.specialities} <></>
                    {filteUser?.username}
                  </span>
                ) : (
                  <LoadingSkeleton width={"8rem"} count={1} />
                )}
              </div>
              {filteUser?.email ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-envelope me-2"></i>
                  <span>{filteUser?.email}</span>
                </div>
              ) : (
                <LoadingSkeleton width={"8rem"} count={1} />
              )}
              {filteUser?.address ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <span>{filteUser?.address}</span>
                </div>
              ) : (
                <LoadingSkeleton width={"8rem"} count={1} />
              )}
              {filteUser?.phone ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-phone me-2"></i>
                  <span>+977-{filteUser?.phone}</span>
                </div>
              ) : (
                <LoadingSkeleton width={"8rem"} count={1} />
              )}
            </div>
            <div className="overview mt-4 mx-auto px-2">
              {filteUser?.about ? (
                <p className="h4 fw-bold mb-2" style={{ color: "#005963" }}>
                  About {appointmentData?.doctor}
                </p>
              ) : (
                <LoadingSkeleton width={"20rem"} height={"40px"} count={1} />
              )}
              {filteUser?.about ? (
                <p className="text-dark" style={{ fontSize: "1rem" }}>
                  {filteUser?.about}
                </p>
              ) : (
                <LoadingSkeleton height={"20px"} count={5} />
              )}
            </div>
            <div className="overview mt-5 mx-auto px-2">
              {filteUser?.subspecialities ? (
                <p className="h4 fw-bold mb-2" style={{ color: "#005963" }}>
                  Subspecialities
                </p>
              ) : (
                <LoadingSkeleton width={"20rem"} height={"40px"} count={1} />
              )}
              {filteUser?.subspecialities ? (
                <p className="text-dark" style={{ fontSize: "1rem" }}>
                  {filteUser?.subspecialities}
                </p>
              ) : (
                <LoadingSkeleton height={"20px"} count={5} />
              )}
            </div>
          </div>
          <div className="col-md-4 mx-auto">
            {filteUser ? (
              <div className="booking pt-3">
                <p className="h4 fw-bolder" style={{ color: "#005963" }}>
                  Booking Summery
                </p>
                <div className="booking_form mt-4 position-relative">
                  <div className="contact_form mt-3">
                    <div className="form-group">
                      <div className="font-control">
                        <input
                          id="username"
                          placeholder="Username"
                          ref={inputRef}
                          name="username"
                          {...register("username", {
                            required: true,
                            maxLength: 100,
                          })}
                          type="text"
                          className="form-control my-form py-2 mt-2"
                        />
                      </div>
                    </div>
                    <div className="form-group mt-4">
                      <div className="font-control">
                        <input
                          placeholder="example@gmail.com"
                          type="email"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                          className="form-control my-form py-2 mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="forms">
                    <div className="form mt-4">
                      <div class="input-group date" data-provide="datepicker">
                        <input
                          disabled
                          type="date"
                          style={{ position: "relative" }}
                          className={
                            "form-control my-form rounded text-sm text-secondary"
                          }
                          value={appointmentData?.date}
                          placeholder=" Expiry date"
                        />
                        <i
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "25%",
                          }}
                          className="fa-solid fa-calendar"
                        ></i>
                      </div>
                    </div>
                    <div className="form mt-4">
                      <div class="input-group date" data-provide="datepicker">
                        <input
                          className="form-control my-form"
                          disabled
                          type="time"
                          value={appointmentData?.time}
                        />
                        <i
                          style={{
                            position: "absolute",
                            right: "5%",
                            top: "25%",
                          }}
                          className="fa-solid fa-clock"
                        ></i>
                      </div>
                    </div>

                    <div className="button_book mt-4">
                      <button
                        onClick={handleSubmit((data) =>
                          onSubmit({
                            ...data,
                            date: appointmentData.date,
                            time: appointmentData.time,
                            appointment: appointmentData._id,
                          })
                        )}
                        className="btn btn-outline-primary py-2 mx-auto d-block"
                      >
                        Book Appointment{" "}
                        <i className="fa-solid fa-arrow-right"></i>{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <LoadingSkeleton className={"mt-2"} height={"50px"} count={6} />
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Detail;
