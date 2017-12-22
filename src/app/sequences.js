import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { set } from 'cerebral/operators'

import { initApp } from './actions'
import { routeTo } from './factories'

export const initialize = sequence('Initiate App', [initApp])

export const routeToHome = sequence('Route to home', [routeTo('home')])

export const routeToPage = sequence('Route to page', [routeTo(props`page`)])

export const routeToArticle = sequence('Route to article', [
  routeTo('article', { slug: props`slug` }),
])

export const routeToEditor = sequence('Route to editor', [
  routeTo('editor', { slug: props`slug` }),
])

export const routeToProfile = sequence('Route to profile', [
  routeTo('profile', {
    username: props`username`,
    favorites: props`favorites`,
  }),
])

export const changeField = sequence('Change field', [
  set(state`${props`path`}`, props`value`),
])
