import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Layout from './components/layout/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import LoginWithCode from './pages/auth/LoginWithCode'
import Verify from './pages/auth/Verify'
import Profile from './pages/profile/Profile'
import ChangePassword from './pages/changePassword/ChangePassword'
import UserList from './pages/userList/UserList'

import axios from 'axios'

axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetPassword/:resetToken" element={<Reset />} />
        <Route path="/loginWithCode/:email" element={<LoginWithCode />} />
        <Route
          path="/verify/:verificationToken"
          element={
            <Layout>
              <Verify />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route
          path="/changePassword"
          element={
            <Layout>
              <ChangePassword />
            </Layout>
          }
        />
        <Route
          path="/users"
          element={
            <Layout>
              <UserList />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
