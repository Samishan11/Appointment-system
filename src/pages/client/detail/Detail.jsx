import React, { useState, useEffect, useRef } from "react";
import "react-nice-dates/build/style.css";
import { Link, useParams } from "react-router-dom";
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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Divider from "@mui/material/Divider";
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const appointmentData = useSelector(
    (state) => state.appointment.singleAppointment
  );
  //
  useEffect(() => {
    dispatch(fetchSingleAppointment(id));
    dispatch(fetchuser());
  }, []);

  // book now
  const ref = useRef(null);

  const handleClick = () => {
    ref.current.children[0].focus();
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
      dispatch(addBooking(res.data.data));
      reset({
        username: "",
        email: "",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const _appointment = useSelector((state) => state.appointment.appointment);
  const [nextAppointment, setNextAppointment] = useState(null);
  useEffect(() => {
    const filter = _appointment.filter((data) => {
      if (data._id !== appointmentData._id) {
        return data;
      }
    });
    setNextAppointment(filter);
  }, []);
  return (
    <div className="container-fluid pb-4">
      <div className="row">
        <div className="col-md-7 m-0 p-0 mx-auto">
          {appointmentData.doctor ? (
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
                    <p className="h4 text-light fw-bold">BOOK AN APPOINTMENT</p>
                    <p className=" b-3 text-light w-50">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Assumenda, in? Sit incidunt vero voluptates ut amet, dolor
                      pariatur voluptatibus. Laudantium! Lorem ipsum dolor sit
                      amet consectetur adipisicing elit. Assumenda, in? Sit
                      incidunt vero voluptates ut amet, dolor pariatur
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
              {appointmentData?.doctor?.image?.url ? (
                <img
                  className="rounded-circle me-2"
                  src={appointmentData?.doctor?.image?.url}
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
              {appointmentData?.doctor ? (
                <span className="fw-bold">
                  {appointmentData?.doctor?.specialities} <></>
                  {appointmentData?.doctor?.username}
                </span>
              ) : (
                <Skeleton variant="rounded" width={200} height={20} />
              )}
            </div>
            {appointmentData?.doctor ? (
              <div className="mx-2 mt-2">
                <i className="fa-solid fa-envelope me-2"></i>
                <span>{appointmentData?.doctor?.email}</span>
              </div>
            ) : (
              <Skeleton className="mb-2" variant="rounded" width={"10rem"} />
            )}
            {appointmentData?.doctor ? (
              <div className="mx-2 mt-2">
                <i className="fa-solid fa-location-dot me-2"></i>
                <span>{appointmentData?.doctor?.address}</span>
              </div>
            ) : (
              <Skeleton className="mb-2" variant="rounded" width={"10rem"} />
            )}
            {appointmentData?.doctor ? (
              <div className="mx-2 mt-2">
                <i className="fa-solid fa-phone me-1"></i>
                <span>+977-{appointmentData?.doctor?.phone}</span>
              </div>
            ) : (
              <Skeleton variant="rounded" width={"10rem"} />
            )}
          </div>
          <div className="overview mt-4 mx-auto px-2">
            {appointmentData?.doctor ? (
              <p className="h4 fw-bold mb-2" style={{ color: "#005963" }}>
                About {appointmentData?.doctor?.usename}
              </p>
            ) : (
              <Skeleton
                variant="rounded"
                width={"20rem"}
                height={"40px"}
                className="mb-2"
              />
            )}
            {appointmentData?.doctor ? (
              <Typography
                style={{ width: "100%", textAlign: "justify" }}
                variant="body1"
                gutterBottom
              >
                {appointmentData?.doctor?.about}
              </Typography>
            ) : (
              <Stack>
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
              </Stack>
            )}
          </div>
          <div className="overview mt-5 mx-auto px-2">
            {appointmentData?.doctor ? (
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
            {appointmentData?.doctor ? (
              <Typography
                style={{ width: "100%", textAlign: "justify" }}
                variant="body1"
                gutterBottom
              >
                {appointmentData?.doctor?.subspecialities}
              </Typography>
            ) : (
              <Stack>
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
                <Skeleton className="mb-2" variant="rounded" height={"20px"} />
              </Stack>
            )}
          </div>
        </div>
        <div className="col-md-4 mx-auto pb-2">
          <div>
            {appointmentData.doctor ? (
              <div className="booking pt-3 mb-5">
                {appointmentData.doctor ? (
                  <p
                    className="h4 fw-bolder title"
                    style={{ color: "#005963" }}
                  >
                    Booking Summery
                  </p>
                ) : (
                  <Skeleton width={250} height={50} />
                )}
                <div className="booking_form mt-4 position-relative">
                  <div className="contact_form mt-3">
                    <div className="form-group">
                      <div ref={ref} className="font-control">
                        <input
                          id="username"
                          placeholder="Username"
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
                        Book Appointment
                        <i className="fa-solid fa-arrow-right"></i>
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
            <div className="booking related pt-3">
              {appointmentData.doctor ? (
                <p className="h4 fw-bolder title" style={{ color: "#005963" }}>
                  Appointments
                </p>
              ) : (
                <Skeleton width={250} height={50} />
              )}
              {nextAppointment?.length >= 1 ? (
                <div className="booking_form mt-3 position-relative">
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    {nextAppointment.map((data, ind) => {
                      return nextAppointment?.length >= 0 ? (
                        <>
                          <ListItem key={ind} className="bg-light">
                            <ListItemAvatar>
                              <Avatar src={appointmentData?.image?.url}>
                                <ImageIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={appointmentData.title}
                              secondary={new Date(
                                appointmentData.date
                              )?.toDateString()}
                            />
                            <ListItemAvatar>
                              <Link to={`/detail/${data._id}`}>
                                <Avatar
                                  style={{ background: "rgb(84, 202, 206)" }}
                                  className="bg-primary-cus"
                                >
                                  <KeyboardArrowRightOutlinedIcon />
                                </Avatar>
                              </Link>
                            </ListItemAvatar>
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      ) : (
                        <div className="col-md-10 col-lg-10 pt-3 d-flex justify-content-between align-items-center">
                          <Skeleton variant="circular" height={50} width={50} />
                          <Stack>
                            <Skeleton
                              className="mb-1"
                              variant="rounded"
                              height={10}
                              width={150}
                            />
                            <Skeleton
                              variant="rounded"
                              height={10}
                              width={100}
                            />
                          </Stack>
                          <Skeleton variant="circular" height={50} width={50} />
                        </div>
                      );
                    })}
                  </List>
                </div>
              ) : appointmentData.doctor ? (
                <Loading />
              ) : (
                <>
                  <Skeleton
                    className="mx-auto mt-3"
                    height={60}
                    variant="rounded"
                  />
                  <Skeleton
                    className="mx-auto mt-3"
                    height={60}
                    variant="rounded"
                  />
                  <Skeleton
                    className="mx-auto mt-3"
                    height={60}
                    variant="rounded"
                  />
                  <Skeleton
                    className="mx-auto mt-3"
                    height={60}
                    variant="rounded"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
