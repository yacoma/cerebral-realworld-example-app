import { sequence } from 'cerebral'
import { state, string } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpPost } from '@cerebral/http/operators'

import addComment from '../actions/addComment'

export default sequence('Post comment', [
  set(state`blog.commentFormIsLoading`, true),
  httpPost(
    string`/articles/${state`blog.currentArticleSlug`}/comments`,
    state`blog.commentForm`
  ),
  set(state`blog.commentForm.comment.body`, ''),
  addComment,
  set(state`blog.commentFormIsLoading`, false),
])
