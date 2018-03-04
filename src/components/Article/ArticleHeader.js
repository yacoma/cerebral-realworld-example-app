import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticleMeta from './ArticleMeta'

export default connect(
  {
    title: state`blog.articles.${state`blog.currentArticleSlug`}.title`,
  },
  function ArticleHeader({ title }) {
    return (
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <ArticleMeta />
        </div>
      </div>
    )
  }
)
