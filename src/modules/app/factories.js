import { sequence } from 'cerebral'
import { set, equals } from 'cerebral/operators'
import { state } from 'cerebral/tags'
import { redirectToSignal } from '@cerebral/router/operators'

import fetchArticles from '../blog/sequences/fetchArticles'
import fetchTags from '../blog/sequences/fetchTags'
import fetchCurrentArticle from '../blog/sequences/fetchCurrentArticle'
import fetchProfile from '../profile/sequences/fetchProfile'
import fetchFavoritedArticles from '../profile/sequences/fetchFavoritedArticles'
import fetchCreatedArticles from '../profile/sequences/fetchCreatedArticles'
import { authenticate } from './actions'

export function routeTo(page, props = {}) {
  return sequence('Route to', [
    set(state`app.currentPage`, page),
    equals(state`app.currentPage`),
    {
      home: [set(state`app.lastVisited`, 'home'), fetchArticles, fetchTags],
      login: [],
      register: [],
      settings: [set(state`app.lastVisited`, 'settings'), authenticate],
      article: [
        'slug' in props
          ? [
              set(state`blog.currentArticleSlug`, props.slug),
              fetchCurrentArticle,
            ]
          : redirectToSignal('app.homeRouted'),
      ],
      editor: [
        'slug' in props
          ? [
              set(state`app.lastVisited`, 'editor'),
              set(state`blog.currentArticleSlug`, props.slug),
            ]
          : [
              set(state`app.lastVisited`, 'editor'),
              set(state`blog.currentArticleSlug`, ''),
            ],
      ],
      profile: [
        'username' in props
          ? [
              set(state`profile.currentProfile.username`, props.username),
              fetchProfile,
              'favorites' in props && props.favorites === 'favorites'
                ? fetchFavoritedArticles
                : fetchCreatedArticles,
            ]
          : redirectToSignal('app.homeRouted'),
      ],
      otherwise: redirectToSignal('app.homeRouted'),
    },
  ])
}
