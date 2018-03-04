import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    profile: state`profile.currentProfile`,
    toggleFollowClicked: signal`profile.toggleFollowClicked`,
  },
  function Profile({ isCurrentUser, profile, toggleFollowClicked }) {
    if (isCurrentUser) {
      return null
    }

    return (
      <button
        className="btn btn-sm btn-outline-secondary action-btn"
        onClick={() => toggleFollowClicked({ username: profile.username })}
      >
        <i className="ion-plus-round" />&nbsp;{' '}
        {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
      </button>
    )
  }
)
