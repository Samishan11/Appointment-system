import { configureStore } from '@reduxjs/toolkit';
import appointmentReducer from '../slice/appointmentSlice';

export default configureStore({
  reducer: {
    appointment: appointmentReducer,
  },
});