import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

export default connect(
  {
    currentTab: state`profile.currentTab`,
    author: state`profile.currentProfile.username`,
  },
  function ArticlesToggle({ currentTab, author }) {
    return (
      <div className="articles-toggle">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <a
              className={`nav-link${
                currentTab === 'myArticles' ? ' active' : ''
              }`}
              href={`/#/@${author}`}
            >
              My Articles
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link${
                currentTab === 'favoritedArticles' ? ' active' : ''
              }`}
              href={`/#/@${author}/favorites`}
            >
              Favorited Articles
            </a>
          </li>
        </ul>
      </div>
    )
  }
)
