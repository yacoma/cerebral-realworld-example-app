import { Module } from 'cerebral'

import * as sequences from './sequences'

export default Module({
  state: {
    currentProfile: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
    currentTab: 'myArticles',
    toggleFollowIsLoading: false,
  },
  signals: {
    toggleFollowClicked: sequences.toggleFollowUser,
  },
})
