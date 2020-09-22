import React from 'react'
import useFetch from '../../utils/useFetch'
import { getAllUsers } from '../../lib/api'
import { Link } from 'react-router-dom'
import { capitalize, profileImageChecker } from '../../utils/multiUseFunctions'


function AllUsers() {
  const { data: users, loading, refetchData } = useFetch(getAllUsers)

  if (!users) return null

  //! Filter to display only Jobseekers
  const allSeekers = users.filter(user => user.jobseeker)

  return (
    <>
      <div className="page">
        <h1>Profiles Page</h1>
        {loading ?
          <div>
            <h1>Loading.</h1>
          </div> : 
          (allSeekers.length < 1) ? <h1>No users </h1> 
            : 
            <div className="all-users-wrapper">
              {allSeekers.map(user => (
                <Link to={`/${user.userName}`} key={user._id} className="user-card">
                  <h5>{capitalize(user.userName)}</h5>
                  <div>{profileImageChecker(user)}</div>
                  <p>{capitalize(user.userName)} has {user.createdVideos.length} {user.createdVideos.length === 1 ? 'video' : 'videos'}</p>
                </Link>
              ))}
            </div>}
      </div>
    </>
  )
}

export default AllUsers