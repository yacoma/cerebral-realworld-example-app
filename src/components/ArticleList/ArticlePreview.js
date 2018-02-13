import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

import ArticleTags from '../ArticleTags'

export default connect(
  {
    article: state`blog.articles.${props`slug`}`,
    author: state`blog.articles.${props`slug`}.author`,
    toggleFavoriteClicked: signal`blog.toggleFavoriteClicked`,
  },
  function ArticlePreview({ article, author, toggleFavoriteClicked, slug }) {
    author.uri = `@${author.username}`
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href={`/#/${author.uri}`}>
            <img alt="" src={author.image} />
          </a>
          <div className="info">
            <a href={`/#/${author.uri}`} className="author">
              {author.username}
            </a>
            <span className="date">{article.createdAt}</span>
          </div>
          <button
            className="btn btn-outline-primary btn-sm pull-xs-right"
            onClick={() => toggleFavoriteClicked({ slug: slug })}
          >
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
        <a href={`/#/article/${slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
          <ArticleTags slug={slug} />
        </a>
      </div>
    )
  }
)
