import React from 'react'
import { connect } from '@cerebral/react'
import { state, props } from 'cerebral/tags'

import DeleteButton from './DeleteButton'

export default connect(
  {
    comment: state`blog.articles.${state`blog.currentArticleSlug`}.comments.${props`commentId`}`,
  },
  function Comment({ commentId, comment }) {
    const commentAuthorUri = `/#/@${comment.author.username}`
    return (
      <div className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a href={commentAuthorUri} className="comment-author">
            <img
              alt=""
              src={comment.author.image}
              className="comment-author-img"
            />
          </a>
          &nbsp;
          <a href={commentAuthorUri} className="comment-author">
            {comment.author.username}
          </a>
          <span className="date-posted">
            {new Date(comment.createdAt).toDateString()}
          </span>
          <DeleteButton commentId={commentId} />
        </div>
      </div>
    )
  }
)
