const router = require('express').Router()
const auth = require('../controllers/auth')
const video = require('../controllers/video')
const user = require('../controllers/user')
const secureRoute = require('../lib/secureRoute')

//? Auth Routes
//* Register
router.route('/register')
  .post(auth.register)

//* Login
router.route('/login')
  .post(auth.login)

//* Video Routes
router.route('/video')
  .post(secureRoute, video.createNewVideo)

router.route('/videos')
  .get(video.videosIndex)

router.route('/video/:videoid')
  .get(video.getSingleVideo)
  .delete(secureRoute, video.deleteVideo)
  .put(secureRoute, video.editVideo)

//? User Routes

router.route('/users')
  .get(user.getAllUsers)

router.route('/users/:username')
  .get(user.getSingleUser)

router.route('/profile')
  .get(secureRoute, user.getUserProfile)
  .put(secureRoute, user.userUpdate)

module.exports = router