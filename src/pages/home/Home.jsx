import React from 'react'
import Calender from '../../component/Calender';

const Home = () => {
    const events = [
        {
            title: "Dental Doctro A",
            start: "2023-03-01",
            display:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor B",
            start: "2023-03-15",
            end: "2023-03-17",
            display:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor C",
            start: "2023-03-10",
            display:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor C",
            start: "2023-03-10",
            display:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Dental Doctor D",
            start: "2023-03-28",
            display:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
    ];
    return (
        <div className='container-fluid'>
            <div className="container">
                <div className="event_calendar ">
                    <Calender events={events} />
                </div>
            </div>
        </div>
    )
}

export default Home