import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { set, equals, when } from 'cerebral/operators'
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
import { routeTo } from './factories'

export const redirectToLogin = sequence('Redirect to login', [
  redirectToSignal('pageRouted', { page: 'login' }),
])

export const routeToHome = routeTo('home', [
  set(state`blog.currentArticlePage`, 1),
  when(state`auth.authenticated`),
  {
    true: fetchArticlesFeed,
    false: fetchAllArticles,
  },
  fetchTags,
])

export const routeToPage = routeTo(props`page`, [
  equals(props`page`),
  {
    login: [],
    register: [],
    settings: [set(state`lastVisited`, 'settings'), authenticate],
    otherwise: redirectToSignal('homeRouted'),
  },
])

export const routeToArticle = routeTo('article', [
  when(props`slug`),
  {
    true: [
      set(state`blog.currentArticleSlug`, props`slug`),
      fetchCurrentArticle,
    ],
    false: redirectToSignal('homeRouted'),
  },
])

export const routeToEditor = routeTo('editor', [
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
])

export const routeToProfile = routeTo('profile', [
  when(props`username`),
  {
    true: [
      set(state`profile.currentProfile.username`, props`username`),
      fetchProfile,
      set(state`blog.currentArticlePage`, 1),
      when(props`favorites`, favorites => favorites === 'favorites'),
      {
        true: fetchFavoritedArticles,
        false: fetchCreatedArticles,
      },
    ],
    false: redirectToSignal('homeRouted'),
  },
])

export const changeField = sequence('Change field', [
  set(state`${props`path`}`, props`value`),
])
