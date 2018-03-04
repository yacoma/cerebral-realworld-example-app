import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpGet, httpDelete, httpPost } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { setArticles, clearArticles } from '../blog/actions'

export const toggleFollowUser = sequence('Toggle follow user', [
  when(state`auth.authenticated`),
  {
    true: [
      when(state`profile.currentProfile.following`),
      {
        true: [
          httpDelete(string`/profiles/${props`username`}/follow`),
          set(state`profile.currentProfile.following`, false),
        ],
        false: [
          httpPost(string`/profiles/${props`username`}/follow`),
          set(state`profile.currentProfile.following`, true),
        ],
      },
    ],
    false: redirectToSignal('pageRouted', { page: 'login' }),
  },
])

export const fetchProfile = sequence('Fetch profile', [
  httpGet(string`/profiles/${state`profile.currentProfile.username`}`),
  set(state`profile.currentProfile`, props`response.result.profile`),
])

export const fetchCreatedArticles = sequence('Fetch created articles', [
  clearArticles,
  httpGet(string`/articles?author=${state`profile.currentProfile.username`}`),
  setArticles,
  set(state`profile.currentTab`, 'myArticles'),
])

export const fetchFavoritedArticles = sequence('Fetch favorited articles', [
  clearArticles,
  httpGet(
    string`/articles?favorited=${state`profile.currentProfile.username`}`
  ),
  setArticles,
  set(state`profile.currentTab`, 'favoritedArticles'),
])
