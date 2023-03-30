import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
const initialState = {
    loading: false,
    appointment: [],
    error: "",
    singleAppointment: {}
}
const proxy = 'http://localhost:5000/api'
// fetching api 
export const fetchAppointment = createAsyncThunk('appointment/fetchAppointment', async () => {
    const response = await axios.get(`${proxy}/appointment/get`);
    return response.data.data
})
// appointment slice 
const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    // data from api assign into the initial state
    extraReducers: (builder) => {
        // check weather the loading false here
        builder.addCase(fetchAppointment.pending, (state) => {
            state.loading = false
        })
        // check weather the loading true here
        builder.addCase(fetchAppointment.fulfilled, (state, action) => {
            state.loading = true
            state.appointment = action.payload
        })
        // if error occors 
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
            // toast.info("Product Update Sucessfully",{position:'top-right'})

            state.appointment.push(appointment);
        },
        // get single appointent data 
        singleAppointment: (state, action) => {
            const appointment = {
                _id: action.payload._id,
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                description: action.payload.description,
                image: action.payload.image,
            };
            state.singleAppointment = appointment;
        },
        // update an appointment
        updateAppointment: (state, action) => {
            state.appointment.map((val) => {
                if (val._id === action.payload[0]._id) {
                    val.title = action.payload[0].title,
                        val.date = action.payload[0].date,
                        val.time = action.payload[0].time,
                        val.description = action.payload[0].description,
                        val.image = action.payload.image
                }
            })
        },
        // deleting an appointment
        deleteAppointment: (state, action) => {
            state.appointment = state.appointment.filter((val) => val._id !== action.payload);
        },
    }
});

export const { add, appointment, deleteAppointment, singleAppointment, updateAppointment } = appointmentSlice.actions;

export default appointmentSlice.reducer;