import React from 'react'
import { useParams } from 'react-router-dom'
import video from 'video.js'
import { getSingleVideo } from '../../lib/api'
import useFetch from '../../utils/useFetch'

function VideoShow() {
  const params = useParams()
  const { data: video, loading, errors, refetchData } = useFetch(getSingleVideo, params.videoid)

  if (!video) return null
  console.log(video)

  return (
    <div className="page">
      {loading ? <h1>Loading</h1> : null}

      <video
        id="my-player"
        className="video-js"
        controls
        autoPlay
        preload="auto"
        poster={video.thumbnail}
        data-setup='{}'>
        <source src={video.videoUrl} type="video/mp4"></source>
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a
          web browser that
          <a href="https://videojs.com/html5-video-support/">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  )
}

export default VideoShow