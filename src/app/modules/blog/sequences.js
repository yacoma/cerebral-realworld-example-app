import { sequence } from 'cerebral'
import { state, string, props, resolveObject } from 'cerebral/tags'
import { set, unset, push, splice, when, equals } from 'cerebral/operators'
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { removeEmptyFields } from '../../factories'
import * as actions from './actions'

export const fetchAllArticles = sequence('Fetch all articles', [
  actions.clearArticles,
  set(state`blog.currentFeed`, 'all'),
  httpGet('/articles'),
  actions.setArticles,
])

export const fetchArticlesFeed = sequence('Fetch created articles', [
  actions.clearArticles,
  set(state`blog.currentFeed`, 'feed'),
  httpGet(string`/articles/feed`),
  actions.setArticles,
])

const fetchArticlesByTag = sequence('Fetch articles by tag', [
  actions.clearArticles,
  set(state`blog.currentFeed`, 'tag'),
  httpGet(string`/articles?tag=${state`blog.currentTag`}`),
  actions.setArticles,
])

export const showArticlesByTag = sequence('Show articles by tag', [
  set(state`blog.currentTag`, props`tag`),
  fetchArticlesByTag,
])

export const loadFeedTab = sequence('Load feed tab', [
  set(state`blog.currentFeed`, props`feed`),
  equals(props`feed`),
  {
    feed: fetchArticlesFeed,
    all: fetchAllArticles,
  },
])

const fetchComments = sequence('Fetch Comments', [
  actions.clearComments,
  httpGet(string`/articles/${state`blog.currentArticleSlug`}/comments`),
  actions.setComments,
])

export const fetchCurrentArticle = sequence('Fetch current article', [
  httpGet(string`/articles/${state`blog.currentArticleSlug`}`),
  actions.setArticles,
  set(state`profile.currentProfile`, props`response.result.article.author`),
  fetchComments,
])

export const editArticle = sequence('Edit article', [
  set(state`blog.editorFormIsLoading`, true),
  when(state`blog.currentArticleSlug`),
  {
    true: [
      removeEmptyFields('blog.editorForm'),
      httpPut(
        string`/articles/${state`blog.currentArticleSlug`}`,
        props`cleanedForm`
      ),
    ],
    false: [
      httpPost('/articles', state`blog.editorForm`),
      set(state`blog.currentArticleSlug`, props`response.result.article.slug`),
    ],
  },
  set(state`blog.editorForm.article.title`, ''),
  set(state`blog.editorForm.article.description`, ''),
  set(state`blog.editorForm.article.body`, ''),
  set(state`blog.editorForm.article.tagInput`, ''),
  set(state`blog.editorForm.article.tagList`, []),
  actions.setArticles,
  set(state`blog.editorFormIsLoading`, false),
  redirectToSignal(
    'articleRouted',
    resolveObject({
      slug: state`blog.currentArticleSlug`,
    })
  ),
])

export const deleteArticle = sequence('Delete Article', [
  httpDelete(string`/articles/${state`blog.currentArticleSlug`}`),
  unset(state`blog.articles.${state`blog.currentArticleSlug`}`),
  redirectToSignal('homeRouted'),
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

export const postComment = sequence('Post Comment', [
  set(state`blog.postCommentFormIsLoading`, true),
  httpPost(
    string`/articles/${state`blog.currentArticleSlug`}/comments`,
    state`blog.postCommentForm`
  ),
  set(state`blog.postCommentForm.comment.body`, ''),
  actions.addComment,
  set(state`blog.postCommentFormIsLoading`, false),
])

export const deleteComment = sequence('Delete Comment', [
  httpDelete(
    string`/articles/${state`blog.currentArticleSlug`}/comments/${props`commentId`}`
  ),
  unset(
    state`blog.articles.${state`blog.currentArticleSlug`}.comments.${props`commentId`}`
  ),
])

export const fetchTags = sequence('Fetch Tags', [
  actions.clearTags,
  httpGet('/tags'),
  actions.addTags,
])

export const addTag = sequence('Add Tag to list', [
  push(
    state`blog.editorForm.article.tagList`,
    state`blog.editorForm.article.tagInput`
  ),
  set(state`blog.editorForm.article.tagInput`, ''),
])

export const removeTag = sequence('Remove Tag from list', [
  splice(state`blog.editorForm.article.tagList`, props`tagIndex`, 1),
])
