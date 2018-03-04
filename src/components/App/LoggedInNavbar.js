import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    authenticated: state`auth.authenticated`,
    currentPage: state`currentPage`,
    currentUser: state`auth.currentUser`,
  },
  function LoggedInNavbar({ authenticated, currentPage, currentUser }) {
    if (!authenticated) {
      return null
    }

    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <a
            className={`nav-link${currentPage === 'home' ? ' active' : ''}`}
            href="/#/"
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link${currentPage === 'editor' ? ' active' : ''}`}
            href="/#/editor"
          >
            <i className="ion-compose" />&nbsp;New Article
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link${currentPage === 'settings' ? ' active' : ''}`}
            href="/#/settings"
          >
            <i className="ion-gear-a" />&nbsp;Settings
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link${currentPage === 'profile' ? ' active' : ''}`}
            href={`/#/@${currentUser.username}`}
          >
            <img src={currentUser.image} className="user-pic" alt="" />
            {currentUser.username}
          </a>
        </li>
      </ul>
    )
  }
)
