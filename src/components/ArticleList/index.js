import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticlePreview from './ArticlePreview'
import ListPagination from './ListPagination'

export default connect(
  {
    articles: state`blog.articles`,
    articlesAreLoading: state`blog.articlesAreLoading`,
  },
  function ArticleList({ articles, articlesAreLoading }) {
    if (articlesAreLoading) {
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
        <ListPagination />
      </div>
    )
  }
)
