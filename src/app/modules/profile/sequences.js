import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpGet, httpDelete, httpPost } from '@cerebral/http/operators'

import { mergeArticles } from '../blog/actions'

export const toggleFollowUser = sequence('Toggle follow user', [
  when(state`profile.following`),
  {
    true: [
      httpDelete(string`/profiles/${props`username`}/follow`),
      set(state`profile.following`, false),
    ],
    false: [
      httpPost(string`/profiles/${props`username`}/follow`),
      set(state`profile.following`, true),
    ],
  },
])

export const fetchProfile = sequence('Fetch profile', [
  httpGet(string`/profiles/${state`profile.currentProfile.username`}`),
  set(state`profile.currentProfile`, props`response.result.profile`),
])

export const fetchCreatedArticles = sequence('Fetch created articles', [
  httpGet(string`/articles?author=${state`profile.currentProfile.username`}`),
  mergeArticles,
  set(state`profile.currentTab`, 'myArticles'),
])

export const fetchFavoritedArticles = sequence('Fetch favorited articles', [
  httpGet(
    string`/articles?favorited=${state`profile.currentProfile.username`}`
  ),
  mergeArticles,
  set(state`profile.currentTab`, 'favoritedArticles'),
])
