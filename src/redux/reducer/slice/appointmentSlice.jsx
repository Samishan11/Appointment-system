import { createSlice } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: [
        {
            a:"a",
            b:"a",
            c:"a"
        }
    ],
    reducers: {
        appointment: (state, action)=>{
            state.push(initialState)
        },
        add: (state, action) => {
            const appointment = {
                id: uuid(),
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                description: action.payload.description,
                image: action.payload.image,
            };

            state.push(appointment);
        },
    }
});

export const { add ,appointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;