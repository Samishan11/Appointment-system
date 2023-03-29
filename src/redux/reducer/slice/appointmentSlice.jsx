import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: [
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        },
        {
            title: "Title",
            doctor: "Doctor",
            date: "2023/02/29",
            time: "11 AM",
        }
    ],
    reducers: {
        appointment: (state, action) => {
            console.log(action)
            state = appointment
        },
        add: (state, action, image) => {
            console.log(action)
            const appointment = {
                title: action.payload.inputFields.title,
                date: action.payload.inputFields.date,
                time: action.payload.inputFields.time,
                description: action.payload.inputFields.description,
                image: action.payload.image,
            };

            state.push(appointment);
        },
    }
});

export const { add, appointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;