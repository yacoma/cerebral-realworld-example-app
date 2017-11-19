import toggleFollowUser from './sequences/toggleFollowUser'

export default {
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
}
