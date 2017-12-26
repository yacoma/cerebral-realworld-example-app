import { Module } from 'cerebral'

import * as sequences from './sequences'

export default Module({
  signals: {
    toggleFollowClicked: sequences.toggleFollowUser,
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
