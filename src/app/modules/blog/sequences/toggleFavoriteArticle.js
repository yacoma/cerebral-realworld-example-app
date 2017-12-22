import { sequence } from 'cerebral'
import { state, props, string } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpDelete, httpPost } from '@cerebral/http/operators'

export default sequence('Toggle favorite article', [
  when(state`blog.articles.${props`slug`}.favorited`),
  {
    true: [
      httpDelete(string`/articles/${props`slug`}/favorite`),
      set(state`blog.articles.${props`slug`}.favorited`, false),
    ],
    false: [
      httpPost(string`/articles/${props`slug`}/favorite`),
      set(state`blog.articles.${props`slug`}.favorited`, true),
    ],
  },
])
