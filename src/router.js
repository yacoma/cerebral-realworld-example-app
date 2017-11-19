import Router from '@cerebral/router'

export default Router({
  routes: [
    {
      path: '/article/:slug',
      signal: 'app.articleRouted',
    },
    {
      path: '/editor/:slug',
      signal: 'app.editorRouted',
    },
    {
      path: '/@:username/:favorites',
      signal: 'app.profileRouted',
    },
    {
      path: '/:page',
      signal: 'app.pageRouted',
    },
    {
      path: '/',
      signal: 'app.homeRouted',
    },
  ],
  onlyHash: true,
})
