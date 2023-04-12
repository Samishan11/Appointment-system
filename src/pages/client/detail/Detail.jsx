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
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
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
  const [loading, setLoading] = useState(true);
  const [filteUser, setFilteruser] = useState({});
  useEffect(() => {
    const fiterDoctorByUsername = user.find((data) => {
      if (
        data?.username?.toLowerCase()?.replace(/\s/g, "") ===
        appointmentData?.doctor?.toLowerCase()?.replace(/\s/g, "")
      ) {
        setLoading(false);
        return data;
      }
    });
    setFilteruser(fiterDoctorByUsername);
  }, [user]);

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
  console.log(errors);
  const onSubmit = async (data) => {
    console.log(data);
    try {
      var res = await axios.post(
        `${import.meta.env.VITE_PROXY_URI}/booking`,
        data
      );
      dispatch(addBooking(res.data.data));
      reset({
        username: "",
        email: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid">
      {appointmentData ? (
        <div className="row mt-2">
          <div className="col-md-7 m-0 p-0 mx-auto">
            {!loading ? (
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
                      <p className="h4 text-light fw-bold">
                        BOOK AN APPOINTMENT
                      </p>
                      <p className=" b-3 text-light w-50">
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
              <Skeleton className="mb-3" variant="rounded" height={"27rem"} />
            )}
            <div className="docotor_info ">
              <div className="profile mt-2 d-flex align-items-center">
                {!loading ? (
                  <img
                    className="rounded-circle me-2"
                    src={filteUser?.image?.url}
                    alt=""
                  />
                ) : (
                  <Skeleton
                    className="mb-2 me-2"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                )}
                {!loading ? (
                  <span className="fw-bold">
                    {filteUser?.specialities} <></>
                    {filteUser?.username}
                  </span>
                ) : (
                  <Skeleton variant="rounded" width={200} height={20} />
                )}
              </div>
              {!loading ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-envelope me-2"></i>
                  <span>{filteUser?.email}</span>
                </div>
              ) : (
                <Skeleton className="mb-2" variant="rounded" width={"10rem"} />
              )}
              {!loading ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-location-dot me-2"></i>
                  <span>{filteUser?.address}</span>
                </div>
              ) : (
                <Skeleton className="mb-2" variant="rounded" width={"10rem"} />
              )}
              {!loading ? (
                <div className="mx-2 mt-2">
                  <i className="fa-solid fa-phone me-1"></i>
                  <span>+977-{filteUser?.phone}</span>
                </div>
              ) : (
                <Skeleton variant="rounded" width={"10rem"} />
              )}
            </div>
            <div className="overview mt-4 mx-auto px-2">
              {!loading ? (
                <p className="h4 fw-bold mb-2" style={{ color: "#005963" }}>
                  About {appointmentData?.doctor}
                </p>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={"20rem"}
                  height={"40px"}
                  className="mb-2"
                />
              )}
              {!loading ? (
                <Typography
                  style={{ width: "100%", textAlign: "justify" }}
                  variant="body1"
                  gutterBottom
                >
                  {filteUser?.about}
                </Typography>
              ) : (
                <Stack>
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                </Stack>
              )}
            </div>
            <div className="overview mt-5 mx-auto px-2">
              {!loading ? (
                <p className="h4 fw-bold mb-2" style={{ color: "#005963" }}>
                  Subspecialities
                </p>
              ) : (
                <Skeleton
                  variant="rounded"
                  width={"20rem"}
                  height={"40px"}
                  className="mb-2"
                />
              )}
              {!loading ? (
                <Typography
                  style={{ width: "100%", textAlign: "justify" }}
                  variant="body1"
                  gutterBottom
                >
                  {filteUser?.subspecialities}
                </Typography>
              ) : (
                <Stack>
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                  <Skeleton
                    className="mb-2"
                    variant="rounded"
                    height={"20px"}
                  />
                </Stack>
              )}
            </div>
          </div>
          <div className="col-md-4 mx-auto pb-2">
            {!loading ? (
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
                            message: "This is required.",
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
              <Stack>
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
                <Skeleton
                  variant="rounded"
                  className={"mt-2"}
                  height={"70px"}
                />
              </Stack>
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
