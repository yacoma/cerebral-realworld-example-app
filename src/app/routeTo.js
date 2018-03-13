import { sequence } from 'cerebral'
import { set, equals, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { redirectToSignal } from '@cerebral/router/operators'

import {
  fetchAllArticles,
  fetchArticlesFeed,
  fetchCurrentArticle,
  fetchTags,
} from './modules/blog/sequences'
import {
  fetchProfile,
  fetchCreatedArticles,
  fetchFavoritedArticles,
} from './modules/profile/sequences'
import { authenticate } from './actions'

const routeTo = sequence('Route to', [
  equals(props`page`),
  {
    home: [
      set(state`lastVisited`, 'home'),
      set(state`blog.currentArticlePage`, 1),
      when(state`auth.authenticated`),
      {
        true: fetchArticlesFeed,
        false: fetchAllArticles,
      },
      fetchTags,
    ],
    login: [],
    register: [],
    settings: [set(state`lastVisited`, 'settings'), authenticate],
    article: [
      when(props`slug`),
      {
        true: [
          set(state`blog.currentArticleSlug`, props`slug`),
          fetchCurrentArticle,
        ],
        false: redirectToSignal('homeRouted'),
      },
    ],
    editor: [
      when(props`slug`),
      {
        true: [
          set(
            state`blog.editorForm.article.tagList`,
            state`blog.articles.${state`blog.currentArticleSlug`}.tagList`
          ),
          set(state`lastVisited`, 'editor'),
          set(state`blog.currentArticleSlug`, props`slug`),
        ],
        false: [
          set(state`lastVisited`, 'editor'),
          set(state`blog.currentArticleSlug`, ''),
        ],
      },
    ],
    profile: [
      when(props`username`),
      {
        true: [
          set(state`profile.currentProfile.username`, props`username`),
          fetchProfile,
          set(state`blog.currentArticlePage`, 1),
          when(props`favorites`),
          {
            true: fetchFavoritedArticles,
            false: fetchCreatedArticles,
          },
        ],
        false: redirectToSignal('homeRouted'),
      },
    ],
    otherwise: redirectToSignal('homeRouted'),
  },
  set(state`currentPage`, props`page`),
])

export default routeTo
