import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    currentFeed: state`blog.currentFeed`,
    currentTag: state`blog.currentTag`,
  },
  function TagFilterTab({ currentFeed, currentTag }) {
    if (currentFeed !== 'tag') {
      return null
    }

    return (
      <li className="nav-item">
        <a href="" className="nav-link active">
          <i className="ion-pound" /> {currentTag}
        </a>
      </li>
    )
  }
)
