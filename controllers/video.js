const Video = require('../models/video')
const { notFound, unauthorized } = require('../lib/errorMessages')

//* Video Index
//? Working ? Yes
//? Errors tested ? N/A
async function videosIndex(req, res) {
  try {
    const videos = await Video.find().populate('user')
    res.status(200).json(videos)
  } catch (err) {
    res.json(err)
  }
}

//* Get video
//? Working ? Yes
//? Errors Tested ? Yes
async function getSingleVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.videoid).populate('user')
    if (!video) throw new Error(notFound)
    res.status(200).json(video)
  } catch (err) {
    next(err)
  }
}

//* Create New video
//? Working ? Yes
//? Errors Tested ? Yes
async function createNewVideo(req,res,next) {
  try {
    req.body.user = req.currentUser
    const createdVideo = await Video.create(req.body)
    res.status(201).json(createdVideo)
  } catch (err) {
    next(err)
  }
}

//* Delete video
//? Working ? Yes
//? Errors Tested ? Yes
async function deleteVideo(req,res,next) {
  try {
    const videoToDelete = await Video.findById(req.params.videoid)
    if (!videoToDelete) throw new Error(notFound)
    if (!videoToDelete.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    await videoToDelete.remove()
    res.sendStatus(204)
  } catch (err){
    next(err)
  }
}

//* Edit video
//? Working ? Yes
//? Errors Tested ? Yes.
async function editVideo(req,res,next) {
  req.body.user = req.currentUser
  try {
    const videoToEdit = await Video.findById(req.params.videoid)
    if (!videoToEdit) throw new Error('Not Found')
    if (!videoToEdit.user.equals(req.currentUser._id)) throw new Error(unauthorized)
    Object.assign(videoToEdit, req.body)
    await videoToEdit.save()
    res.status(202).json(videoToEdit)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  videosIndex,
  getSingleVideo,
  createNewVideo,
  deleteVideo,
  editVideo
}