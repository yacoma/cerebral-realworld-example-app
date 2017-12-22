import { sequence } from 'cerebral'
import { state, string } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpGet } from '@cerebral/http/operators'

import mergeArticles from '../../blog/actions/mergeArticles'

export default sequence('Fetch favorited articles', [
  httpGet(
    string`/articles?favorited=${state`profile.currentProfile.username`}`
  ),
  mergeArticles,
  set(state`profile.currentTab`, 'favoritedArticles'),
])
