import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import * as actions from './actions'
import * as factories from './factories'

export const initialize = sequence('Initiate App', [actions.initApp])

export const redirectToLogin = sequence('Redirect to login', [
  redirectToSignal('pageRouted', { page: 'login' }),
])

export const routeToHome = sequence('Route to home', [
  factories.routeTo('home'),
])

export const routeToPage = sequence('Route to page', [
  factories.routeTo(props`page`),
])

export const routeToArticle = sequence('Route to article', [
  factories.routeTo('article', { slug: props`slug` }),
])

export const routeToEditor = sequence('Route to editor', [
  factories.routeTo('editor', { slug: props`slug` }),
])

export const routeToProfile = sequence('Route to profile', [
  factories.routeTo('profile', {
    username: props`username`,
    favorites: props`favorites`,
  }),
])

export const changeField = sequence('Change field', [
  set(state`${props`path`}`, props`value`),
])
