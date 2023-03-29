import React from 'react'
// import Event from '../../component/Event'

const Manageevent = () => {
    const data = [
        {
            EndTime: new Date(2022, 3, 30, 0, 0),
            Id: '2',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 29, 0, 0),
            Subject: 'Plumbing Checklist | Jaimungal | 3671 :: Pool',
        },
        {
            EndTime: new Date(2022, 3, 30, 0, 0),
            Id: '4',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 28, 0, 0),
            Subject: 'Underground Plumbing | Jaimungal | 3671 :: Pool',
        },
        {
            EndTime: new Date(2022, 3, 30, 12, 30),
            Id: '7',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 24, 0, 0),
            Subject: 'Steel/ Checklist | VP Highland Model | 3719 :: Pool',
        },
        {
            EndTime: new Date(2022, 3, 30, 0, 0),
            Id: '9',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 29, 0, 0),
            Subject: 'Tile Selections/ Pavers/ Finish | VP Highland Model | 3719 :: Pool',
        },
        {
            EndTime: new Date(2022, 3, 30, 0, 0),
            Id: '10',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 26, 0, 0),
            Subject: 'Layout/ Form Rebar Shell | VP Highland Model | 3719 :: Pool',
        },
        {
            EndTime: new Date(2022, 3, 30, 0, 0),
            Id: '10',
            IsAllDay: true,
            StartTime: new Date(2022, 3, 26, 0, 0),
            Subject: ' VP Highland Model | 3719 :: Pool',
        }
    ];
    return (
        <div>
            {/* <Event data={data} /> */}
        </div>
    )
}

export default Manageevent