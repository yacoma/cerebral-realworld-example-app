import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    tags: state`blog.tags`,
    tagClicked: signal`blog.tagClicked`,
  },
  function TagList({ tags, tagClicked }) {
    if (tags) {
      return (
        <div className="tag-list">
          {tags.map(tag => {
            return (
              <a
                href=""
                className="tag-pill tag-default"
                key={tag}
                onClick={() => tagClicked({ tag: tag })}
              >
                {tag}
              </a>
            )
          })}
        </div>
      )
    } else {
      return <div>Loading tags...</div>
    }
  }
)
