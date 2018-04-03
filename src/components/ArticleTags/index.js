import React from 'react'
import { connect } from '@cerebral/react'
import { state, props } from 'cerebral/tags'

export default connect(
  {
    tags: state`blog.articles.${props`slug`}.tagList`,
  },
  function ArticleTags({ tags }) {
    if (!tags || !tags.length) {
      return null
    }

    return (
      <ul className="tag-list">
        {tags.map((tag) => {
          return (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          )
        })}
      </ul>
    )
  }
)
