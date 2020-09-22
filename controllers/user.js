const User = require('../models/user')
const { unauthorized } = require('../lib/errorMessages')


//* Get User profile
//? Working ? Yes
//? Errors Tested ? Yes
async function getUserProfile(req, res, next) {
  try {
    const user = await User.findById(req.currentUser._id).populate('createdVideos')
    if (!user) throw new Error(unauthorized)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

//? Show specific User profile.
//* WORKING tested
//* ERROR tested
async function getSingleUser(req, res, next) {
  try {
    const user = req.params.username
    const userProfile = await User.findOne({ userName: user }).populate('createdVideos')
    if (!userProfile) throw new Error('Not Found')
    res.status(200).json(userProfile)
  } catch (err) {
    next(err)
  }
}

//* get all users
//? Working ? Yes
//? Errors Tested ? Yes
async function getAllUsers(req, res, next) {
  try {
    const allUsers = await User.find().populate('createdVideos')
    res.status(200).json(allUsers)
  } catch (err) {
    next(err)
  }
}

//* Edit Profile
//? Working ? Yes
//? Errors Tested ? Yes
async function userUpdate(req, res, next) {
  console.log(req)
  try {
    req.body.user = req.currentUser
    const userId = req.currentUser
    const updatedProfile = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true, context: 'query' })
    if (!updatedProfile) throw new Error(unauthorized)
    res.status(202).json(updatedProfile)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getUserProfile,
  userUpdate,
  getAllUsers,
  getSingleUser
}