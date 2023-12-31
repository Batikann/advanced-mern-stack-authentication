import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import emailReducer from './features/email/emailService'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer,
  },
})
