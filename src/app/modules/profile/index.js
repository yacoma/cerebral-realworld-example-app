import { Module } from 'cerebral'

import toggleFollowUser from './sequences/toggleFollowUser'

export default Module({
  signals: {
    toggleFollowClicked: toggleFollowUser,
  },

  state: {
    currentProfile: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
    currentTab: 'myArticles',
  },
})
