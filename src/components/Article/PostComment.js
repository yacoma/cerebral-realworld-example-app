import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'
import { CommentField } from '../fields/comment'

export default connect(
  {
    isLoading: state`blog.postCommentFormIsLoading`,
    currentUserImage: state`auth.currentUser.image`,
    formSubmitted: signal`blog.commentFormSubmitted`,
  },
  function PostComment({ isLoading, currentUserImage, formSubmitted }) {
    const handleSubmit = event => {
      event.preventDefault()
      formSubmitted()
    }
    return (
      <form className="card comment-form">
        <fieldset disabled={isLoading}>
          <CommentField path="blog.postCommentForm.comment.body" />
          <div className="card-footer">
            <img alt="" src={currentUserImage} className="comment-author-img" />
            <button className="btn btn-sm btn-primary" onClick={handleSubmit}>
              Post Comment
            </button>
          </div>
        </fieldset>
      </form>
    )
  }
)
