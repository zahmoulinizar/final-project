import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import ProdSlice from './slice/ProdSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    prod:ProdSlice,
  }
})