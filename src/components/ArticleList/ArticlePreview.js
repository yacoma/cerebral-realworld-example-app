import React from 'react'
import { connect } from '@cerebral/react'
import { state, props, signal } from 'cerebral/tags'

import ArticleTags from '../ArticleTags'

export default connect(
  {
    article: state`blog.articles.${props`slug`}`,
    toggleFavoriteClicked: signal`blog.toggleFavoriteClicked`,
  },
  function ArticlePreview({ slug, article, toggleFavoriteClicked }) {
    const authorUri = `/#/@${article.author.username}`
    return (
      <div className="article-preview">
        <div className="article-meta">
          <a href={authorUri}>
            <img alt="" src={article.author.image} />
          </a>
          <div className="info">
            <a href={authorUri} className="author">
              {article.author.username}
            </a>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
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
