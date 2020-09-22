import React from 'react'

//! Function to take userName and capitalize the first letter and send the rest of the username to lower case
export const capitalize = (user) => {
  return user[0].toUpperCase() + user.slice(1).toLowerCase()
}

//! Function to filter array of user's videos based on category (project or personal)
export const categoryFilter = (arr, bool) => {
  if (!arr) return 0
  return arr.filter(vid => vid.project === bool)
}

//! Function to check if the user has a profile picture then assign a profile picture based on gender if no profile picture is present. 
export const profileImageChecker = (user) => {
  return user.profileImg ?
    <img src={user.profileImg} alt="profile picture" height="200px" width="200px" />
    : (user.gender === 'Male') ?
      <img src={require('../assets/Male.png')} alt="Male" height="200px" width="200px" />
      :
      <img src={require('../assets/Female.png')} alt="Female" height="200px" width="200px" />
}


