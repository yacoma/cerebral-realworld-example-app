import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    authenticated: state`auth.authenticated`,
  },
  function Banner({ authenticated }) {
    if (authenticated) {
      return null
    }

    return (
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    )
  }
)
