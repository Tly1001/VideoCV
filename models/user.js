const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


//! User Schema. required fields username, email, password, gender, jobseeker on signup. 
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, maxlength: 50 },
  password: { type: String, required: true, unique: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  jobseeker: { type: Boolean, required: true },
  profileImg: { type: String },
  bio: { type: String, maxlength: 250 },
  linkedIn: { type: String },
  github: { type: String },
  portfolio: { type: String },
  tagLine: { type: String, maxlength: 200 }
})

//* Attaches created videos to user schema
userSchema.virtual('createdVideos', {
  ref: 'Video',
  localField: '_id',
  foreignField: 'user'
}, { toObject: { virtuals: true } }
)

userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      delete json.email
      return json
    }
  })

//! Password Validation
//* validate incoming passwords of users trying to login against their saved one in the db
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

//* Create virtual for password confirmation
userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

//* validate if password and confirmation password match.
userSchema
  .pre('validate', function (next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Password does not match')
    }
    next()
  })

//* Password Storage
userSchema
  .pre('save', function (next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
    }
    next()
  })

module.exports = mongoose.model('User', userSchema)