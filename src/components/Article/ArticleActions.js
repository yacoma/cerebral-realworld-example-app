import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    slug: state`blog.currentArticleSlug`,
    article: state`blog.articles.${state`blog.currentArticleSlug`}`,
    author: state`profile.currentProfile`,
    currentUser: state`auth.currentUser`,
    toggleFollowClicked: signal`profile.toggleFollowClicked`,
    toggleFavoriteClicked: signal`blog.toggleFavoriteClicked`,
    articleDelButtonClicked: signal`blog.articleDelButtonClicked`,
  },
  function ArticleActions({
    slug,
    article,
    author,
    currentUser,
    toggleFollowClicked,
    toggleFavoriteClicked,
    articleDelButtonClicked,
  }) {
    if (author.username === currentUser.username) {
      return (
        <span>
          <a
            className="btn btn-outline-secondary btn-sm"
            href={`/#/editor/${slug}`}
          >
            <i className="ion-edit" />&nbsp;Edit Article
          </a>
          &nbsp;&nbsp;
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => articleDelButtonClicked()}
          >
            <i className="ion-trash-a" /> Delete Article
          </button>
        </span>
      )
    }
    return (
      <span>
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
      </span>
    )
  }
)
