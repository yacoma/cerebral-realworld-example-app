import editArticle from './sequences/editArticle'
import postComment from './sequences/postComment'
import toggleFavoriteArticle from './sequences/toggleFavoriteArticle'
import showArticlesByTag from './sequences/showArticlesByTag'
import deleteComment from './sequences/deleteComment'

export default {
  signals: {
    editorFormSubmitted: editArticle,
    commentFormSubmitted: postComment,
    toggleFavoriteClicked: toggleFavoriteArticle,
    tagClicked: showArticlesByTag,
    commentDelButtonClicked: deleteComment,
  },

  state: {
    currentArticleSlug: '',
    currentFeed: 'global',
    currentTag: '',
    articles: {},
    tags: [],
    editorForm: {
      article: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    },
    editorFormIsLoading: false,
    postCommentForm: {
      comment: {
        body: '',
      },
    },
    postCommentFormIsLoading: false,
  },
}
