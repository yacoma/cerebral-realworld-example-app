import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticleHeader from './ArticleHeader'
import ArticleContent from './ArticleContent'
import ArticleMeta from './ArticleMeta'
import PostComment from './PostComment'
import CommentList from '../CommentList'

export default connect(
  {
    article: state`blog.articles.${state`blog.currentArticleSlug`}`,
  },
  function Article({ article }) {
    if (!article) {
      return null
    }
    return (
      <div className="article-page">
        <ArticleHeader />
        <div className="container page">
          <ArticleContent />
          <hr />
          <div className="article-actions">
            <ArticleMeta />
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
)
