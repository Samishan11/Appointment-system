import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    appointment: [],
    error: ""
}
const proxy = 'http://localhost:5000/api'
// fetching the
export const fetchAppointment = createAsyncThunk('appointment/fetchAppointment', async () => {
    const response = await axios.get(`${proxy}/appointment/get`);
    return response.data.data
})

// 
const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    // data from api assign into the initial state
    extraReducers: (builder) => {
        builder.addCase(fetchAppointment.pending, (state) => {
            state.loading = false
        })
        builder.addCase(fetchAppointment.fulfilled, (state, action) => {
            state.loading = true
            state.appointment = action.payload
        })
        builder.addCase(fetchAppointment.rejected, (state, action) => {
            state.loading = true
            state.appointment = []
            state.error = action.error.message
        })
    },
    reducers: {
        //    add appointment 
        add: (state, action, image) => {
            console.log(action)
            const appointment = {
                _id: Math.random(),
                title: action.payload.inputFields.title,
                date: action.payload.inputFields.date,
                time: action.payload.inputFields.time,
                description: action.payload.inputFields.description,
                image: action.payload.image,
            };

            state.appointment.push(appointment);
        },
        // deleting the appointment
        deleteAppointment: (state, action) => {
            state.appointment = state.appointment.filter((val) => val._id !== action.payload);
        },
    }
});

export const { add, appointment, deleteAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;