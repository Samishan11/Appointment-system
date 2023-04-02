import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../reducer/slice/appointmentSlice';
import bookingReducer from '../reducer/slice/bookingSlice';
import userReducer from '../reducer/slice/userSlice';
export default configureStore({
  reducer: {
    appointment: appointmentReducer,
    booking: bookingReducer,
    user: userReducer,
  },
});