import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authService from './authService'

const initialState = {
  isLoggedIn: false,
  user: null,
  users: [],
  twoFactor: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//REGISTER USER
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Login USER
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//lOGOUT USER
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authService.logout()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Login Status User
export const getLoginStatus = createAsyncThunk(
  'auth/loginStatus',
  async (_, thunkAPI) => {
    try {
      return await authService.getLoginStatus()
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//Login Status User
export const getUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    return await authService.getUser()
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//update USER
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData, thunkAPI) => {
    try {
      return await authService.updateUser(userData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    RESET: (state) => {
      state.twoFactor = false
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Register USER
      .addCase(register.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload

        toast.success('Registration successfull')
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload)
      })
      // login USER
      .addCase(login.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = true
        state.user = action.payload

        toast.success('Login successfull')
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
        toast.error(action.payload)
      })
      // Logout USER
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = false
        state.user = null
        toast.success(action.payload)
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

        toast.error(action.payload)
      })
      // Login Status USER
      .addCase(getLoginStatus.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getLoginStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isLoggedIn = action.payload
      })
      .addCase(getLoginStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Get USER
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      // update USER
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
  },
})

export const { RESET } = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectUser = (state) => state.auth.user

export default authSlice.reducer
