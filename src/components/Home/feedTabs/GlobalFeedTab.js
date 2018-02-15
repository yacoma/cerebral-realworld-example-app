import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    currentFeed: state`blog.currentFeed`,
    feedTabClicked: signal`blog.feedTabClicked`,
  },
  function GlobalFeedTab({ currentFeed, feedTabClicked }) {
    const handleClick = event => {
      event.preventDefault()
      feedTabClicked({ feed: 'all' })
    }
    return (
      <li className="nav-item">
        <a
          href=""
          className={`nav-link${currentFeed === 'all' ? ' active' : ''}`}
          onClick={handleClick}
        >
          Global Feed
        </a>
      </li>
    )
  }
)
