import React from 'react'
import { connect } from '@cerebral/react'
import { state } from 'cerebral/tags'

import ArticleList from '../ArticleList'
import ArticlesToggle from './ArticlesToggle'
import EditProfileSettings from './EditProfileSettings'
import FollowUserButton from './FollowUserButton'

export default connect(
  {
    profile: state`profile.currentProfile`,
    currentUser: state`auth.currentUser`,
  },
  function Profile({ profile, currentUser }) {
    const isCurrentUser = profile.username === currentUser.username
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img alt="" src={profile.image} className="user-img" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                <EditProfileSettings isCurrentUser={isCurrentUser} />
                <FollowUserButton isCurrentUser={isCurrentUser} />
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
