import Router from '@cerebral/router'

export default Router({
  routes: [
    {
      path: '/article/:slug',
      signal: 'articleRouted',
    },
    {
      path: '/editor/:slug',
      signal: 'editorRouted',
    },
    {
      path: '/@:username/favorites',
      signal: 'favoritesRouted',
    },
    {
      path: '/@:username',
      signal: 'profileRouted',
    },
    {
      path: '/:page',
      signal: 'pageRouted',
    },
    {
      path: '/',
      signal: 'homeRouted',
    },
  ],
  onlyHash: true,
})
