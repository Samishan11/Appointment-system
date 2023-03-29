import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const Calender = ({ events }) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
                start: "today prev,next", // will normally be on the left. if RTL, will be on the right
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
            }}
            // events 
            events={events}
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
            height={"90vh"}
        />
    );
};

export default Calender;