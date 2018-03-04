import React from 'react'

export default function Profile({ isCurrentUser }) {
  if (!isCurrentUser) {
    return null
  }

  return (
    <a
      className="btn btn-sm btn-outline-secondary action-btn"
      href="/#/settings"
    >
      <i className="ion-gear-a" />&nbsp;Edit Profile Settings
    </a>
  )
}
