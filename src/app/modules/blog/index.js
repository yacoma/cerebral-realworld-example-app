import { Module } from 'cerebral'

import * as sequences from './sequences'

export default Module({
  signals: {
    editorFormSubmitted: sequences.editArticle,
    commentFormSubmitted: sequences.postComment,
    toggleFavoriteClicked: sequences.toggleFavoriteArticle,
    tagClicked: sequences.showArticlesByTag,
    commentDelButtonClicked: sequences.deleteComment,
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
})
