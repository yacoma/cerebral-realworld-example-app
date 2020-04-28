import React from 'react'
import { connect } from '@cerebral/react'
import { state, signal } from 'cerebral/tags'

export default connect(
  {
    profile: state`profile.currentProfile`,
    toggleFollowIsLoading: state`profile.toggleFollowIsLoading`,
    toggleFollowClicked: signal`profile.toggleFollowClicked`,
  },
  function Profile({
    isCurrentUser,
    profile,
    toggleFollowIsLoading,
    toggleFollowClicked,
  }) {
    if (isCurrentUser) {
      return null
    }

    let followButtonClass = profile.following
      ? 'btn btn-sm btn-secondary action-btn'
      : 'btn btn-sm btn-outline-secondary action-btn'
    if (toggleFollowIsLoading) {
      followButtonClass += ' disabled'
    }
    return (
      <button
        className={followButtonClass}
        onClick={() => toggleFollowClicked({ username: profile.username })}
      >
        <i className="ion-plus-round" />
        &nbsp; {profile.following ? 'Unfollow' : 'Follow'} {profile.username}
      </button>
    )
  }
)
