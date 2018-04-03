import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    currentFeed: state`blog.currentFeed`,
    authenticated: state`auth.authenticated`,
    feedTabClicked: signal`blog.feedTabClicked`,
  },
  function YourFeedTab({ currentFeed, authenticated, feedTabClicked }) {
    if (!authenticated) {
      return null
    }

    const handleClick = (event) => {
      event.preventDefault()
      feedTabClicked({ feed: 'feed' })
    }
    return (
      <li className="nav-item">
        <a
          href=""
          className={`nav-link${currentFeed === 'feed' ? ' active' : ''}`}
          onClick={handleClick}
        >
          Your Feed
        </a>
      </li>
    )
  }
)
