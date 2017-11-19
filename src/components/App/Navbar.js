import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    currentPage: state`app.currentPage`,
  },
  function Navbar({ currentPage }) {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/#/">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a
                className={`nav-link${currentPage === 'home' && ' active'}`}
                href="/#/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${currentPage === 'login' && ' active'}`}
                href="/#/login"
              >
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link${currentPage === 'register' && ' active'}`}
                href="/#/register"
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
)
