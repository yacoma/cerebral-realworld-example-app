import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal, props } from 'cerebral/tags'

export default connect(
  {
    authenticated: state`auth.authenticated`,
    currentUsername: state`auth.currentUser.username`,
    comment: state`blog.articles.${state`blog.currentArticleSlug`}.comments.${props`commentId`}`,
    delButtonClicked: signal`blog.commentDelButtonClicked`,
  },
  function DeleteButton({
    commentId,
    comment,
    currentUsername,
    delButtonClicked,
  }) {
    if (currentUsername !== comment.author.username) {
      return null
    }
    return (
      <span className="mod-options">
        <i
          className="ion-trash-a"
          onClick={() => delButtonClicked({ commentId })}
        />
      </span>
    )
  }
)
