import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    authenticated: state`auth.authenticated`,
    currentUsername: state`auth.currentUser.username`,
    delButtonClicked: signal`blog.commentDelButtonClicked`,
  },
  function DeleteButton({ comment, currentUsername, delButtonClicked }) {
    if (currentUsername !== comment.author.username) {
      return null
    }
    return (
      <span className="mod-options">
        <i
          className="ion-trash-a"
          onClick={() => delButtonClicked({ commentId: comment.id })}
        />
      </span>
    )
  }
)
