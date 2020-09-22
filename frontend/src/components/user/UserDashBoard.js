import React from 'react'
import { Link } from 'react-router-dom'
import { userDash, editUserInfo } from '../../lib/api'
import useFetch from '../../utils/useFetch'
import { capitalize, categoryFilter, profileImageChecker } from '../../utils/multiUseFunctions'

function UserDashBoard() {
  const { data: user, loading, refetchData } = useFetch(userDash)
  const [info, setInputForEdit] = React.useState({
    bio: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    tagLine: ''
  })
  const [editPencilToggle, setEditPencilToggle] = React.useState({
    bio: false,
    linkedIn: false,
    github: false,
    portfolio: false,
    tagLine: false
  })
  if (!user) return null

  //! On toggle fetch and attach user data to state. Then toggle the specific element requested to edit. 
  const toggleInput = (name, cur) => {
    setInputForEdit({
      bio: user.bio,
      linkedIn: user.linkedIn,
      github: user.github,
      portfolio: user.portfolio,
      tagLine: user.tagLine
    })
    setEditPencilToggle({ ...editPencilToggle, [name]: !cur })
  }

  //! Handle changes from inputs.
  const handleChange = (e) => {
    setInputForEdit({ ...info, [e.target.name]: e.target.value })
  }

  //! Submit newly edited information as an imported PUT request from the info state. close toggle. refetchdata. 
  const submitEdit = async event => {
    event.preventDefault()
    try {
      await editUserInfo(info)
      setEditPencilToggle(!editPencilToggle)
      refetchData()
    } catch (err) {
      console.log(err.response)
    }
  }

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
                <h1> Welcome {capitalize(user.userName)}!</h1>
              </div>
            </div>

            <div className="section-two">
              <div className="edit-wrapper">
                {editPencilToggle.tagLine ?
                  <form className="info-wrapper" onSubmit={submitEdit}
                  >
                    <input
                      onChange={handleChange}
                      name="tagLine"
                      value={info.tagLine}
                      type="text"
                      placeholder="Add a tagline" />
                    <button>Submit</button>
                  </form>
                  :
                  <div className="info-wrapper">
                    <div className="info">
                      <p>Tag line: {user.tagLine}</p>
                    </div>
                  </div>}
                <img onClick={() => toggleInput('tagLine', editPencilToggle.tagLine)} src={require('../../assets/pencil.png')} className="edit-pencil" alt="edit" />
              </div>

              <div className="edit-wrapper">
                {editPencilToggle.portfolio ?
                  <form className="info-wrapper"
                    onSubmit={submitEdit}>
                    <input
                      onChange={handleChange}
                      name="portfolio"
                      value={info.portfolio}
                      type="text"
                      placeholder="Add a link to your portfolio" />
                    <button>Submit</button>
                  </form>
                  :
                  <div className="info-wrapper">
                    <div className="info">
                      <p>Portfolio: {user.portfolio}</p>
                    </div>
                  </div>}
                <img onClick={() => toggleInput('portfolio', editPencilToggle.portfolio)} src={require('../../assets/pencil.png')} className="edit-pencil" alt="edit" />
              </div>

              <div className="edit-wrapper">
                {editPencilToggle.github ?
                  <form className="info-wrapper"
                    onSubmit={submitEdit}>
                    <input
                      onChange={handleChange}
                      name="github"
                      value={info.github}
                      type="text"
                      placeholder="Add a link to your Github" />
                    <button>Submit</button>
                  </form>
                  :
                  <div className="info-wrapper">
                    <div className="info">
                      <p>Github: {user.github}</p>
                    </div>
                  </div>}
                <img onClick={() => toggleInput('github', editPencilToggle.github)} src={require('../../assets/pencil.png')} className="edit-pencil" alt="edit" />
              </div>

              <div className="edit-wrapper">
                {editPencilToggle.linkedIn ?
                  <form className="info-wrapper"
                    onSubmit={submitEdit}>
                    <input
                      onChange={handleChange}
                      name="linkedIn"
                      value={info.linkedIn}
                      type="text"
                      placeholder="Add link to your LinkedIn" />
                    <button>Submit</button>
                  </form>
                  :
                  <div className="info-wrapper">
                    <div className="info">
                      <p>LinkedIn: {user.linkedIn}</p>
                    </div>
                  </div>}
                <img onClick={() => toggleInput('linkedIn', editPencilToggle.linkedIn)} src={require('../../assets/pencil.png')} className="edit-pencil" alt="edit" />
              </div>

              <div className="edit-wrapper">
                {editPencilToggle.bio ?
                  <form className="info-wrapper" onSubmit={submitEdit}>
                    <input
                      onChange={handleChange}
                      name="bio"
                      value={info.bio}
                      type="text"
                      placeholder="Write a bio about your experience." />
                    <button>Submit</button>
                  </form>
                  :
                  <div className="info-wrapper">
                    <div className="info">
                      <p>Bio: {user.bio}</p>
                    </div>
                  </div>}
                <img onClick={() => toggleInput('bio', editPencilToggle.bio)} className="edit-pencil"
                  src={require('../../assets/pencil.png')}
                  alt="edit" />
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
                  <div className="video-thumb-cards no-vids">
                    <p>No Videos</p>
                  </div>}
                <Link to="/createvideo" className="video-thumb-cards new-vid">
                  <p>+</p>
                </Link>
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
                  <div className="video-thumb-cards no-vids">
                    <p>No Videos</p>
                  </div>}
                <Link to="/createvideo" className="video-thumb-cards new-vid">
                  <p>+</p>
                </Link>
              </div>
            </div>
          </div>
        </div>}
    </>
  )
}

export default UserDashBoard