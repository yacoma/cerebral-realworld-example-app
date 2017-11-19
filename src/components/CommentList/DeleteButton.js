import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    slug: state`blog.currentArticleSlug`,
    delButtonClicked: signal`blog.commentDelButtonClicked`,
  },
  function DeleteButton({ slug, delButtonClicked, showDelButton, commentId }) {
    if (showDelButton) {
      return (
        <span className="mod-options">
          <i
            className="ion-trash-a"
            onClick={() => delButtonClicked({ commentId: commentId })}
          />
        </span>
      )
    }
    return null
  }
)
