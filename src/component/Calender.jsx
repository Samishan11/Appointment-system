import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { TimePicker } from 'react-ios-time-picker';
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
const Calender = ({ events, selectable, editable }) => {
console.log(events)
    const [formData, setFormData] = React.useState({
        title: "",
        description: "",
        date: new Date()
    })
    // set time
    const [value, onChange] = React.useState('10:00');

    // update the event 
    const updateEvent = async (id, date) => {
        try {
            // get the year month and date from the full date 
            const date_ = new Date(date);
            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }
            const year = date_.getFullYear(); // get year
            const month = padTo2Digits(date_.getMonth() + 1); //get month 
            const day = padTo2Digits(date_.getDate()); // get day 
            const newdate = [year, month, day].join('-'); // joining day month and year eg: 2023-04-5
            // fetching api here 
            var res = await axios.put(`${import.meta.env.VITE_PROXY_URI}/appointment/update/${id}`, { date: newdate })
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                }}
                eventAdd={() => {
                    return new bootstrap.Popover(info.el, {
                        title: `<p id="detailLink" href="/detail"></p>`,
                        // placement: "auto",
                        trigger: "click",
                        // customClass: "popoverStyle",
                        content: `<p  href="/detail">view</p>`,
                        html: true,
                    });
                }}
                // events 
                events={events}
                eventDrop={(arg) => {
                    // console.log(arg.event._instance.range.start)
                    updateEvent(arg.event.extendedProps._id, arg.event._instance.range.start)
                }}
                // datesSet={(dateInfo) => {
                //     console.log(dateInfo.start) //start of the range the calendar date
                //     console.log(dateInfo.end) //end of the range the calendar date
                // }}
                // eventChange={(arg) => { console.log(arg)  }}
                selectable={selectable}
                editable={editable}
                dayMaxEvents={true}
                aspectRatio={6}
                eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                // mapping the events and showing as popup omn hover 
                eventDidMount={(info) => {
                    return new bootstrap.Popover(info.el, {
                        title: `<p id="titleLink">${info.event.title}</p>`,
                        // placement: "auto",
                        trigger: "click",
                        // customClass: "popoverStyle",
                        content: `${info.event.extendedProps.description} <a href=${`/detail/${info.event.extendedProps._id}`}>view</a>`,
                        html: true,
                    });
                }}
                // dateClick={function (arg) {
                //     {
                //         addAble &&
                //             document.querySelector("#openModal").click()
                //         document.querySelector(".modal-body").html = ""
                //         document.querySelector(".modal-body").html = "<h3>" + arg.dateStr + "</h3>"
                //     }
                // }}
                height={"80vh"}
            />
            <button id={"openModal"} data-bs-toggle="modal" data-bs-target="#myModal"></button>
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-3" id="updatemodalLabel">Update Appointment</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="event_form mt-3">
                                        <div className="form-group">
                                            <div className="font-control">
                                                <input placeholder='Event Title' type="text" className='form-control py-2 mt-2' />
                                            </div>
                                        </div>
                                        <div className="form-group mt-4">
                                            <div className="font-control">
                                                <input placeholder='Location' type="text" className='form-control py-2 mt-2' />
                                            </div>
                                        </div>
                                        <div className="form-group mt-4">
                                            <div class="input-group date" data-provide="datepicker">

                                                <input

                                                    type="date"
                                                    style={{ position: "relative" }}
                                                    className={
                                                        "form-control rounded text-sm text-secondary"
                                                    }
                                                    placeholder=" Expiry date"
                                                />
                                                {/* <i style={{ position: "absolute", right: '5%', top: "25%" }} className='fa-solid fa-calendar'></i> */}

                                            </div>
                                        </div>
                                        <div className="form mt-4">
                                            <div class="input-group date" data-provide="datepicker">
                                                <TimePicker onChange={onChange} value={value} />
                                                <i style={{ position: "absolute", right: '1.5%', top: "25%" }} className='fa-solid fa-clock'></i>
                                            </div>
                                        </div>
                                        <div className="form-group mt-4">
                                            <div className="font-control">
                                                <textarea placeholder='Detail' type="text" className='form-control py-3 mt-2' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Calender;