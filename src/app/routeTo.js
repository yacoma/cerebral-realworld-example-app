import { sequence } from 'cerebral'
import { set, equals, when } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'
import { redirectToSignal } from '@cerebral/router/operators'

import {
  fetchArticles,
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
  set(state`currentPage`, props`page`),
  equals(state`currentPage`),
  {
    home: [set(state`lastVisited`, 'home'), fetchArticles, fetchTags],
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
])

export default routeTo
