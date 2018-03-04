import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticleActions from './ArticleActions'

export default connect(
  {
    createdAt: state`blog.articles.${state`blog.currentArticleSlug`}.createdAt`,
    author: state`profile.currentProfile`,
  },
  function ArticleMeta({ createdAt, author }) {
    const authorUri = `/#/@${author.username}`
    return (
      <div className="article-meta">
        <a href={authorUri}>
          <img alt="" src={author.image} />
        </a>
        <div className="info">
          <a href={authorUri} className="author">
            {author.username}
          </a>
          <span className="date">{new Date(createdAt).toDateString()}</span>
        </div>
        <ArticleActions />
      </div>
    )
  }
)
