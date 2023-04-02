import React from "react";
import $ from "jquery";
import * as bootstrap from "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calender = ({ events , selectable ,editable ,addAble  }) => {
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
                        title: `<a href="/detail"></a>`,
                        // placement: "auto",
                        trigger: "click",
                        // customClass: "popoverStyle",
                        content: `$<a href="/detail">view</a>`,
                        html: true,
                    });
                }}
                // events 
                events={events}
                selectable={selectable}
                editable={editable}
                dayMaxEvents={true}
                aspectRatio={6}
                eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                // mapping the events and showing as popup omn hover 
                eventDidMount={(info) => {
                    return new bootstrap.Popover(info.el, {
                        title: `<a href="/detail">${info.event.title}</a>`,
                        // placement: "auto",
                        trigger: "click",
                        // customClass: "popoverStyle",
                        content: `${info.event.display} <a href="/detail">view</a>`,
                        html: true,
                    });
                }}
                dateClick={function (arg) {
                  {addAble &&   document.querySelector("#openModal").click()
                  document.querySelector(".modal-body").html = ""
                  document.querySelector(".modal-body").html = "<h3>" + arg.dateStr + "</h3>"}
                }}
                height={"80vh"}
            />
            <button id={"openModal"} data-bs-toggle="modal" data-bs-target="#myModal"></button>
            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                            <h1 className="modal-title fs-3" id="updatemodalLabel">Update Appointment</h1>
                            <button type="button" className="btn-close text-danger fas fa-times" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body text-center">
                            <input name="fasdfasd"></input>
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