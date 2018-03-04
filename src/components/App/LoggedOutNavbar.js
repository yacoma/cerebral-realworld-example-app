import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    authenticated: state`auth.authenticated`,
    currentPage: state`currentPage`,
  },
  function LoggedOutNavbar({ authenticated, currentPage }) {
    if (authenticated) {
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
            className={`nav-link${currentPage === 'login' ? ' active' : ''}`}
            href="/#/login"
          >
            Sign in
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link${currentPage === 'register' ? ' active' : ''}`}
            href="/#/register"
          >
            Sign up
          </a>
        </li>
      </ul>
    )
  }
)
