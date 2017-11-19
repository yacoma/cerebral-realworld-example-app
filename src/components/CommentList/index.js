import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import Comment from './Comment'

export default connect(
  {
    comments: state`blog.articles.${state`blog.currentArticleSlug`}.comments`,
  },
  function CommentList({ comments }) {
    if (!comments || !comments.length) {
      return null
    }

    return Object.keys(comments).map(commentId => {
      return <Comment comment={comments[commentId]} key={commentId} />
    })
  }
)
