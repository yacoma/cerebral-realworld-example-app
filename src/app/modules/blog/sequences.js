import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, when, unset } from 'cerebral/operators'
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { fetchProfile } from '../profile/sequences'
import * as actions from './actions'

export const fetchArticles = sequence('Fetch articles', [
  actions.clearArticles,
  httpGet('/articles'),
  actions.setArticles,
])

const fetchArticlesByTag = sequence('Fetch articles by tag', [
  actions.clearArticles,
  httpGet(string`/articles?tag=${state`blog.currentTag`}`),
  actions.setArticles,
])

export const showArticlesByTag = sequence('Show articles by tag', [
  set(state`blog.currentTag`, props`tag`),
  set(state`blog.currentFeed`, 'tag'),
  fetchArticlesByTag,
])

export const fetchCurrentArticle = sequence('Fetch current article', [
  actions.clearArticles,
  httpGet(string`/articles/${state`blog.currentArticleSlug`}`),
  actions.setArticles,
  set(
    state`profile.currentProfile.username`,
    props`response.result.article.author.username`
  ),
  fetchProfile,
])

export const editArticle = sequence('Edit article', [
  set(state`blog.editorFormIsLoading`, true),
  actions.clearArticles,
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
  actions.setArticles,
  set(state`blog.editorFormIsLoading`, false),
])

export const toggleFavoriteArticle = sequence('Toggle favorite article', [
  when(state`auth.authenticated`),
  {
    true: [
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
    ],
    false: redirectToSignal('pageRouted', { page: 'login' }),
  },
])

export const postComment = sequence('Post comment', [
  set(state`blog.commentFormIsLoading`, true),
  httpPost(
    string`/articles/${state`blog.currentArticleSlug`}/comments`,
    state`blog.commentForm`
  ),
  set(state`blog.commentForm.comment.body`, ''),
  actions.addComment,
  set(state`blog.commentFormIsLoading`, false),
])

export const deleteComment = sequence('Delete Comment', [
  httpDelete(
    string`/articles/${state`blog.currentArticleSlug`}/comments/${props`commentId`}`
  ),
  unset(
    state`blog.articles.${state`blog.currentArticleSlug`}.comments.${props`commentId`}`
  ),
])

export const fetchTags = sequence('Fetch tags', [
  httpGet('/tags'),
  actions.addTags,
])
