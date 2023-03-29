import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../reducer/slice/appointmentSlice';

export default configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
});