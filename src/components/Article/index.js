import React from 'react'

import ArticleHeader from './ArticleHeader'
import ArticleContent from './ArticleContent'
import ArticleActions from './ArticleActions'
import PostComment from './PostComment'
import CommentList from '../CommentList'

export default function Article() {
  return (
    <div className="article-page">
      <ArticleHeader />
      <div className="container page">
        <ArticleContent />
        <hr />
        <div className="article-actions">
          <ArticleActions />
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <PostComment />
            <CommentList />
          </div>
        </div>
      </div>
    </div>
  )
}
