import { sequence } from 'cerebral'
import { set, equals } from 'cerebral/operators'
import { state } from 'cerebral/tags'
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

export function routeTo(page, payload = {}) {
  return sequence('Route to', [
    set(state`currentPage`, page),
    equals(state`currentPage`),
    {
      home: [set(state`lastVisited`, 'home'), fetchArticles, fetchTags],
      login: [],
      register: [],
      settings: [set(state`lastVisited`, 'settings'), authenticate],
      article: [
        'slug' in payload
          ? [
              set(state`blog.currentArticleSlug`, payload.slug),
              fetchCurrentArticle,
            ]
          : redirectToSignal('homeRouted'),
      ],
      editor: [
        'slug' in payload
          ? [
              set(state`lastVisited`, 'editor'),
              set(state`blog.currentArticleSlug`, payload.slug),
            ]
          : [
              set(state`lastVisited`, 'editor'),
              set(state`blog.currentArticleSlug`, ''),
            ],
      ],
      profile: [
        'username' in payload
          ? [
              set(state`profile.currentProfile.username`, payload.username),
              fetchProfile,
              'favorites' in payload && payload.favorites === 'favorites'
                ? fetchFavoritedArticles
                : fetchCreatedArticles,
            ]
          : redirectToSignal('homeRouted'),
      ],
      otherwise: redirectToSignal('homeRouted'),
    },
  ])
}
