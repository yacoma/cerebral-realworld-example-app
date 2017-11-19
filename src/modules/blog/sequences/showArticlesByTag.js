import { sequence } from 'cerebral'
import { set } from 'cerebral/operators'
import { state, props } from 'cerebral/tags'

import fetchArticlesByTag from '../sequences/fetchArticlesByTag'

export default sequence('Show articles by tag', [
  set(state`blog.currentTag`, props`tag`),
  set(state`blog.currentFeed`, 'tag'),
  fetchArticlesByTag,
])
