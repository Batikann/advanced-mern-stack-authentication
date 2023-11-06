require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const errorHandler = require('./middleware/errorMiddleware')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  cors({
    origin: ['http://localhost:5173/', 'https://authz-app.vercel.app'],
    credentials: true,
  })
)

/*ROUTES */
app.use('/api/users', userRoutes)
app.get('/', (req, res) => {
  res.send('Home Page')
})

//Error Handler

app.use(errorHandler)

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
