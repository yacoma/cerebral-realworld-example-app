import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpGet } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import routeTo from './routeTo'
import * as actions from './actions'

export const initialize = sequence('Initiate App', [
  actions.initApp,
  {
    authenticated: [httpGet('/user'), actions.setCurrentUser],
    unauthenticated: [],
  },
])

export const redirectToLogin = sequence('Redirect to login', [
  redirectToSignal('pageRouted', { page: 'login' }),
])

export const routeToHome = sequence('Route to home', [
  set(props`page`, 'home'),
  routeTo,
])

export const routeToPage = sequence('Route to page', [routeTo])

export const routeToArticle = sequence('Route to article', [
  set(props`page`, 'article'),
  routeTo,
])

export const routeToEditor = sequence('Route to editor', [
  set(props`page`, 'editor'),
  routeTo,
])

export const routeToProfile = sequence('Route to profile', [
  set(props`page`, 'profile'),
  routeTo,
])

export const routeToFavorites = sequence('Route to favorites', [
  set(props`page`, 'profile'),
  set(props`favorites`, true),
  routeTo,
])

export const changeField = sequence('Change field', [
  set(state`${props`path`}`, props`value`),
])
