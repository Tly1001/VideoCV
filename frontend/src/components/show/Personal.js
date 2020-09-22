import React from 'react'
import { getAllVideos } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { categoryFilter } from '../../utils/multiUseFunctions'
import { Link } from 'react-router-dom'

function Personal() {
  const { data: videos, loading, refetchData } = useFetch(getAllVideos)

  if (!videos) return null

  //! Use Imported filter function to only return personal videos.
  const personalVideos = categoryFilter(videos, false)

  return (
    <div className="page">
      {loading ?
        <div>
          <h1>Loading.</h1>
        </div> :
        (personalVideos.length < 1) ? <h1>No videos available at this time.</h1>
          :
          <div className="all-users-wrapper">
            {personalVideos.map(vid => (
              <Link to={`/video/${vid._id}`} key={vid._id} className="user-card">
                <img src={vid.thumbnail} alt='thumbnail of video' />
                <h3>{vid.title}</h3>
                <h4>Content created by {vid.user}</h4>
              </Link>
            ))}
          </div>}
    </div>
  )
}



export default Personal