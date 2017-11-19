import { sequence } from 'cerebral'
import { state, string } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpPost, httpPut } from '@cerebral/http/operators'

import mergeArticles from '../actions/mergeArticles'

export default sequence('Edit article', [
  set(state`blog.editorFormIsLoading`, true),
  when(state`blog.currentArticleSlug`),
  {
    true: httpPut(
      string`/articles/${state`blog.currentArticleSlug`}`,
      state`blog.editorForm`
    ),
    false: httpPost('/articles', state`blog.editorForm`),
  },
  set(state`blog.editorForm.article.title`, ''),
  set(state`blog.editorForm.article.description`, ''),
  set(state`blog.editorForm.article.body`, ''),
  set(state`blog.editorForm.article.tagList`, ''),
  mergeArticles,
  set(state`blog.editorFormIsLoading`, false),
])
