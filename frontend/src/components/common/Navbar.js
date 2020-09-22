import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { isAuthenticated, logout } from '../../lib/auth'

function Navbar() {
  const [authenticated, setAuthenticated] = React.useState(isAuthenticated())
  const { pathname } = useLocation()
  const [navScroll, setNavScroll] = React.useState('nav-transparent')

  React.useEffect(() => {
    setAuthenticated(isAuthenticated())
    function onScroll() {
      window.pageYOffset > 50 ? setNavScroll('nav-colored') : setNavScroll('nav-transparent')
    }
    window.addEventListener('scroll', onScroll)
  }, [pathname])

  return (
    <>
      <nav id="nav" className={navScroll}>

        <div className='nav-left'>
          <img src={require('../../assets/videocv-logo.png')} alt="Logo" width="80" height="40" />
          <ul className="nav-links">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/about">About</Link></li>
            <li><Link className="nav-link" to="/profiles">Profiles</Link></li>
            <li className="nav-link dropdown"> Categories
              <div className="dropdown-content">
                <Link to="/projects">Projects</Link>
                <Link to="/personal">Personal</Link>
              </div>
            </li>
          </ul>
        </div>

        <div className='nav-right'>
          <ul className="nav-links">
            <li className="nav-link dropdown settings"> ⚙
              <div className="dropdown-content">
                {authenticated && <Link to="/dashboard">My profile</Link>}
                {!authenticated && <Link to="/login">Login</Link>}
                {authenticated && <Link onClick={logout} to="/"> Log Out</Link>}
                {!authenticated && <Link to="/register">Register</Link>}
              </div>
            </li>
          </ul>
        </div>

      </nav>
    </>
  )
}

export default Navbar