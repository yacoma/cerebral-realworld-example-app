import React, { createElement } from 'react'

import ArticleTags from '../ArticleTags'
import { connect } from '@cerebral/react'
import marksy from 'marksy'
import { state } from 'cerebral/tags'

export default connect(
  {
    slug: state`blog.currentArticleSlug`,
    markdown: state`blog.articles.${state`blog.currentArticleSlug`}.body`,
  },
  function ArticleContent({ slug, markdown }) {
    const compile = marksy({ createElement })
    const compiled = compile(markdown, { sanitize: true })

    return (
      <div className="row article-content">
        <div className="col-md-12">
          {compiled.toc}
          {compiled.tree}
          <ArticleTags slug={slug} />
        </div>
      </div>
    )
  }
)
