import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticlePreview from './ArticlePreview'

export default connect(
  {
    articles: state`blog.articles`,
  },
  function ArticleList({ articles }) {
    if (!articles) {
      return <div className="article-preview">Loading articles...</div>
    }

    if (!Object.keys(articles).length) {
      return <div className="article-preview">No articles are here... yet.</div>
    }

    return (
      <div>
        {Object.keys(articles).map(slug => {
          return <ArticlePreview key={slug} slug={slug} />
        })}
      </div>
    )
  }
)
