import { sequence } from 'cerebral'
import { state, props, string } from 'cerebral/tags'
import { unset } from 'cerebral/operators'
import { httpDelete } from '@cerebral/http/operators'

export default sequence('Delete Comment', [
  httpDelete(
    string`/articles/${state`blog.currentArticleSlug`}/comments/${props`commentId`}`
  ),
  unset(
    state`blog.articles.${state`blog.currentArticleSlug`}.comments.${props`commentId`}`
  ),
])
