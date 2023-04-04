import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    appointment: [],
    error: "",
    singleAppointment: {}
}

// fetching api 
export const fetchAppointment = createAsyncThunk('appointment/fetchAppointment', async () => {
    const response = await axios.get(`${import.meta.env.VITE_PROXY_URI}/appointment/get`);
    return response.data.data
})

// fetching single api 
export const fetchSingleAppointment = createAsyncThunk('appointment/fetchSingleAppointment', async (id) => {
    var response = await axios.get(`${import.meta.env.VITE_PROXY_URI}/appointment/${id}`);
    return response.data.data
})

// get the time interval
export const getInterval = (a) => {
    const date = new Date(a.date)
    const dateString = date.toISOString().slice(0, 10);
    const startTimeStr = a.time;
    const endTimeStr = a.time_end;
    const startDate = new Date(dateString + "T" + startTimeStr);
    const endDate = new Date(dateString + "T" + endTimeStr);
    const diffInMs = endDate.getTime() - startDate.getTime();
    const diffInMin = Math.round(diffInMs / (1000 * 60));
    const finalInterval =  diffInMin >= 60 ? parseInt(diffInMin/60) + " hour" : diffInMin+" minute"
    return finalInterval;
}

// appointment slice 
const appointmentSlice = createSlice({
    name: 'appointment',
    initialState,
    // data from api assign into the initial state
    extraReducers: (builder) => {
        // check weather the loading false here
        builder.addCase(fetchAppointment.pending, (state) => {
            state.loading = true
        })
        // check weather the loading true here
        builder.addCase(fetchAppointment.fulfilled, (state, action) => {
            state.loading = false
            state.appointment = action.payload
        })
        // if error occors 
        builder.addCase(fetchAppointment.rejected, (state, action) => {
            state.loading = true
            state.appointment = []
            state.error = action.error.message
        })
        // check weather the loading false here
        builder.addCase(fetchSingleAppointment.pending, (state) => {
            state.loading = true
        })
        // check weather the loading true here
        builder.addCase(fetchSingleAppointment.fulfilled, (state, action) => {
            state.loading = false
            state.singleAppointment = action.payload
        })
        // if error occors 
        builder.addCase(fetchSingleAppointment.rejected, (state, action) => {
            state.loading = true
            state.singleAppointment = {}
            state.error = action.error.message
        })
    },
    reducers: {
        //    add appointment 
        add: (state, action) => {
           
            const appointment = {
                _id: action.payload._id,
                title: action.payload.title,
                date: action.payload.date,
                time: action.payload.time,
                description: action.payload.description,
                image: action.payload.image.url,
                interval: getInterval(action.payload)
            };
            toast.success("Appointment Add Sucessfully", { position: 'top-right' })
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
                        val.image = action.payload.image,
                        val.interval = getInterval(action.payload)
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