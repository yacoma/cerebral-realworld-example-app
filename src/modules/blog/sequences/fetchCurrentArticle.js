import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpGet } from '@cerebral/http/operators'

import mergeArticles from '../actions/mergeArticles'
import fetchProfile from '../../profile/sequences/fetchProfile'

export default sequence('Fetch current article', [
  httpGet(string`/articles/${state`blog.currentArticleSlug`}`),
  mergeArticles,
  set(
    state`profile.currentProfile.username`,
    props`response.result.article.author.username`
  ),
  fetchProfile,
])
