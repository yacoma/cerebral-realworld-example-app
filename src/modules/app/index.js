import * as sequences from './sequences'

export default ({ controller }) => {
  controller.on('initialized', () => {
    controller.getSignal('app.appMounted')({})
  })
  return {
    signals: {
      appMounted: sequences.initialize,
      homeRouted: sequences.routeToHome,
      pageRouted: sequences.routeToPage,
      articleRouted: sequences.routeToArticle,
      editorRouted: sequences.routeToEditor,
      profileRouted: sequences.routeToProfile,
      fieldChanged: sequences.changeField,
    },
    state: {
      currentPage: '',
      lastVisited: '',
      errorMessages: [],
    },
  }
}
