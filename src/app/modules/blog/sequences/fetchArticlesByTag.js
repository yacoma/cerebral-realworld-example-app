import { sequence } from 'cerebral'
import { state, string } from 'cerebral/tags'
import { httpGet } from '@cerebral/http/operators'

import mergeArticles from '../actions/mergeArticles'

export default sequence('Fetch articles by tag', [
  httpGet(string`/articles?tag=${state`blog.currentTag`}`),
  mergeArticles,
])
