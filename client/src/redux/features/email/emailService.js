import axios from 'axios'
import { API_URL } from '../auth/authService'

/*SEND Automated Email */

const sendAutomatedEmail = async (emailData) => {
  const res = await axios.post(API_URL + 'sendAutomatedEmail', emailData)
  return res.data.message
}

const emailService = { sendAutomatedEmail }

export default emailService
