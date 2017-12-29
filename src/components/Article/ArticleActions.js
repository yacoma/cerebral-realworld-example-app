import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    slug: state`blog.currentArticleSlug`,
    article: state`blog.articles.${state`blog.currentArticleSlug`}`,
    author: state`profile.currentProfile`,
    toggleFollowClicked: signal`profile.toggleFollowClicked`,
    toggleFavoriteClicked: signal`blog.toggleFavoriteClicked`,
  },
  function ArticleActions({
    slug,
    article,
    author,
    toggleFollowClicked,
    toggleFavoriteClicked,
  }) {
    author.uri = encodeURIComponent(`@${author.username}`)
    return (
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
          className="btn btn-sm btn-outline-secondary"
          onClick={() => toggleFollowClicked({ username: author.username })}
        >
          <i className="ion-plus-round" />&nbsp;{' '}
          {author.following ? 'Unfollow' : 'Follow'} {author.username}
        </button>
        &nbsp;&nbsp;
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => toggleFavoriteClicked({ slug: slug })}
        >
          <i className="ion-heart" />&nbsp;{' '}
          {article.favorited ? 'Unfavorite' : 'Favorite'} Article{' '}
          <span className="counter">({article.favoritesCount})</span>
        </button>
      </div>
    )
  }
)
