const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    photo: {
      type: String,
      required: [true, 'Please add a photo'],
      default:
        'https://img.favpng.com/25/7/23/computer-icons-user-profile-avatar-image-png-favpng-LFqDyLRhe3PBXM0sx2LufsGFU.jpg',
    },
    phone: {
      type: String,
      default: '+90',
    },
    bio: {
      type: String,
      default: 'bio',
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    userAgent: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
)

//   Encrypt password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
