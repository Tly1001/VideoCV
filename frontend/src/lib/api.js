import axios from 'axios'

import { getToken } from './auth'


//* get header to send for secure route
const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

//! - AUTH Requests -
//* POST login to backend
export const login = (data) => {
  return axios.post('/api/login', data)
}

//* POST register to backend
export const register = (data) => {
  return axios.post('/api/register', data)
}

//! - User Requests -
//* GET current user profile 
export const userDash = () => {
  return axios.get('/api/profile', withHeaders())
}

//* GET all users
export const getAllUsers = () => {
  return axios.get('/api/users', withHeaders())
}

//* Get single user
export const getSingleUser = (username) => {
  return axios.get(`/api/users/${username}`)
}

//* PUT edit user.
export const editUserInfo = (info) => {
  return axios.put('/api/profile', info, withHeaders())
}

//! - Video Requests -
//* GET all videos
export const getAllVideos = () => {
  return axios.get('/api/videos')
}

//* GET single videos
export const getSingleVideo = (id) => {
  return axios.get(`/api/video/${id}`)
}

