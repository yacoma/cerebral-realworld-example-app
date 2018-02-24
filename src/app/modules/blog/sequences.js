import { sequence } from 'cerebral'
import { state, string, props } from 'cerebral/tags'
import { set, unset, when, equals } from 'cerebral/operators'
import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
} from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { fetchProfile } from '../profile/sequences'
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
  actions.clearTags,
  httpGet('/tags'),
  actions.addTags,
])
