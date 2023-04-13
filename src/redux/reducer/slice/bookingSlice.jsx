import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// declearing initial state here
const initialState = {
  loading: false,
  booking: [],
  error: "",
};

// fetching boooking
export const fetchBooking = createAsyncThunk(
  "booking/fetchBooking",
  async () => {
    var res = await axios.get(`${import.meta.env.VITE_PROXY_URI}/booking/get`);
    return res.data.data;
  }
);

// booking slice
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  // data from api assign into the initial state
  extraReducers: (builder) => {
    // check weather the loading false here
    builder.addCase(fetchBooking.pending, (state) => {
      state.loading = false;
    });
    // check weather the loading true here
    builder.addCase(fetchBooking.fulfilled, (state, action) => {
      state.loading = true;
      state.booking = action.payload;
    });
    // if error occors
    builder.addCase(fetchBooking.rejected, (state, action) => {
      state.loading = true;
      state.booking = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    addBooking: (state, action) => {
      console.log(action.payload);
      const booking = {
        _id: action.payload._id,
        username: action.payload.username,
        date: action.payload.date,
        time: action.payload.time,
        email: action.payload.email,
        appointment: action.payload.appointment,
      };
      toast.success("Appointment has been booked.");
      state.booking.push(booking);
    },
    updateBooking: (state, action) => {
      state.booking.map((val) => {
        if (val._id === action.payload._id) {
          val.status = action.payload.status;
        }
      });
    },
    deleteBooking: (state, action) => {
      state.booking = state.booking.filter((val) => val._id !== action.payload);
    },
  },
});
export const { addBooking, updateBooking, booking, deleteBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
