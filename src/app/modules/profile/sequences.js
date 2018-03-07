import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpGet, httpDelete, httpPost } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { articlesOffset } from '../../computed'
import { setArticles, clearArticles } from '../blog/actions'

export const toggleFollowUser = sequence('Toggle follow user', [
  when(state`auth.authenticated`),
  {
    true: [
      set(state`profile.toggleFollowIsLoading`, true),
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
      set(state`profile.toggleFollowIsLoading`, false),
    ],
    false: redirectToSignal('pageRouted', { page: 'login' }),
  },
])

export const fetchProfile = sequence('Fetch profile', [
  httpGet(string`/profiles/${state`profile.currentProfile.username`}`),
  set(state`profile.currentProfile`, props`response.result.profile`),
])

export const fetchCreatedArticles = sequence('Fetch created articles', [
  set(state`blog.articlesAreLoading`, true),
  clearArticles,
  set(state`blog.currentFeed`, 'created'),
  httpGet(
    string`/articles?author=${state`profile.currentProfile.username`}&limit=10&offset=${articlesOffset}`
  ),
  setArticles,
  set(state`profile.currentTab`, 'myArticles'),
  set(state`blog.articlesAreLoading`, false),
])

export const fetchFavoritedArticles = sequence('Fetch favorited articles', [
  set(state`blog.articlesAreLoading`, true),
  clearArticles,
  set(state`blog.currentFeed`, 'favorited'),
  httpGet(
    string`/articles?favorited=${state`profile.currentProfile.username`}&limit=10&offset=${articlesOffset}`
  ),
  setArticles,
  set(state`profile.currentTab`, 'favoritedArticles'),
  set(state`blog.articlesAreLoading`, false),
])
