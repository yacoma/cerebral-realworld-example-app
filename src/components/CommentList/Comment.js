import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import DeleteButton from './DeleteButton'

export default connect(
  {
    authenticated: state`auth.authenticated`,
    currentUsername: state`auth.currentUser.username`,
  },
  function Comment({ authenticated, currentUsername, comment }) {
    const showDelButton =
      authenticated && currentUsername === comment.author.username
    comment.author.uri = encodeURIComponent(`@${comment.author.username}`)
    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a href={`/#/${comment.author.uri}`} className="comment-author">
            <img
              alt=""
              src={comment.author.image}
              className="comment-author-img"
            />
          </a>
          &nbsp;
          <a href={`/#/${comment.author.uri}`} className="comment-author">
            {comment.author.username}
          </a>
          <span className="date-posted">{comment.createdAt}</span>
          <DeleteButton showDelButton={showDelButton} commentId={comment.id} />
          <span className="mod-options">
            <i className="ion-trash-a" />
          </span>
        </div>
      </div>
    )
  }
)
