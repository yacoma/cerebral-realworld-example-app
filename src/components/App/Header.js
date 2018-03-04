import React from 'react'

import LoggedOutNavbar from './LoggedOutNavbar'
import LoggedInNavbar from './LoggedInNavbar'

export default function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/#/">
          conduit
        </a>

        <LoggedOutNavbar />

        <LoggedInNavbar />
      </div>
    </nav>
  )
}
