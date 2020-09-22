import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../../utils/useFetch'
import { getSingleUser } from '../../lib/api'
import { capitalize, categoryFilter, profileImageChecker } from '../../utils/multiUseFunctions'

function GetSingleUser() {
  const params = useParams()
  const { data: user, loading } = useFetch(getSingleUser, params.username)

  if (!user) return null
  return (
    <>
      {loading ? <div> Loading </div> :

        <div className="page">
          <div className="dashboard-top">
            <div className="section-one">
              <div className="profile-image">
                <div>{profileImageChecker(user)}</div>
              </div>
              <div className="intro">
                <h1>{capitalize(user.userName)}</h1>
              </div>
            </div>

            <div className="section-two">
              <div className="edit-wrapper">
                <div className="info-wrapper">
                  <div className="info">
                    <p>{user.tagLine ? `Tag line: ${user.tagLine} ` : null}</p>
                  </div>
                </div>
              </div>

              <div className="edit-wrapper">
                <div className="info-wrapper">
                  <div className="info">
                    <p>{user.portfolio ? `Portfolio: ${user.portfolio} ` : null}</p>
                  </div>
                </div>
              </div>

              <div className="edit-wrapper">
                <div className="info-wrapper">
                  <div className="info">
                    <p>{user.github ? `Github: ${user.github} ` : null}</p>
                  </div>
                </div>
              </div>

              <div className="edit-wrapper">
                <div className="info-wrapper">
                  <div className="info">
                    <p>{user.linkedIn ? `LinkedIn: ${user.linkedIn} ` : null}</p>
                  </div>
                </div>
              </div>

              <div className="edit-wrapper">
                <div className="info-wrapper">
                  <div className="info">
                    <p>{user.bio ? `Bio: ${user.bio} ` : null}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="videos-wrapper">
            <h1> {capitalize(user.userName)}'s Videoes </h1>
            <div className="videos">
              <div className="category-wrapper">
                <h2>Projects:</h2>
              </div>
              
              <div className="video-thumbs-wrapper">
                {categoryFilter(user.createdVideos, true).length >= 1 ?
                  <div className="video-thumbs-wrapper">
                    {categoryFilter(user.createdVideos, true).map(vid => (
                      <Link to={`/video/${vid._id}`} key={vid._id}>
                        <div key={vid._id} className="video-thumb-cards">
                          <h4>{vid.title}</h4>
                          <img src={vid.thumbnail} alt={vid.title} />
                        </div>
                      </Link>
                    ))}
                  </div> :

                  <div className="no-vids">
                    <p>No Videos</p>
                  </div>}
              </div>
            </div>
            <div className="videos">
              <div className="category-wrapper">
                <h2> Personal: </h2>
              </div>
              <div className="video-thumbs-wrapper">
                {categoryFilter(user.createdVideos, false).length >= 1 ?
                  <div className="video-thumbs-wrapper">
                    {categoryFilter(user.createdVideos, false).map(vid => (
                      <Link to={`/video/${vid._id}`} key={vid._id}>
                        <div key={vid._id} className="video-thumb-cards">
                          <h4>{vid.title}</h4>
                          <img src={vid.thumbnail} alt={vid.title} />
                        </div>
                      </Link>
                    ))}
                  </div> :

                  <div className="no-vids">
                    <p>No Videos</p>
                  </div>}
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default GetSingleUser