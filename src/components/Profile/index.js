import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

import ArticleList from '../ArticleList'
import ArticlesToggle from './ArticlesToggle'

export default connect(
  {
    profile: state`profile.currentProfile`,
    toggleFollowClicked: signal`profile.toggleFollowClicked`,
  },
  function Profile({ profile, toggleFollowClicked }) {
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img alt="" src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={() =>
                    toggleFollowClicked({ username: profile.username })
                  }
                >
                  <i className="ion-plus-round" />&nbsp;{' '}
                  {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <ArticlesToggle />
              <ArticleList />
            </div>
          </div>
        </div>
      </div>
    )
  }
)
