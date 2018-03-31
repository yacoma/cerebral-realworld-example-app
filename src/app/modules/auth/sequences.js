import { sequence } from 'cerebral'
import { state, props, resolveObject } from 'cerebral/tags'
import { set, equals, when } from 'cerebral/operators'
import { httpPost, httpPut } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import { removeEmptyFields } from '../../factories'
import { fetchArticlesFeed, fetchAllArticles } from '../blog/sequences'
import * as actions from './actions'
import * as factories from './factories'

const redirectToLastVisited = sequence('Redirect to last visited page', [
  when(state`lastVisited`),
  {
    true: [
      equals(state`lastVisited`),
      {
        editor: redirectToSignal('editorRouted'),
        otherwise: redirectToSignal(
          'pageRouted',
          resolveObject({
            page: state`lastVisited`,
          })
        ),
      },
    ],
    false: redirectToSignal('homeRouted'),
  },
])

export const registerUser = sequence('Register new user', [
  set(state`auth.registerFormIsLoading`, true),
  httpPost('/users', state`auth.registerForm`),
  {
    success: [
      set(state`auth.registerForm.user.username`, ''),
      set(state`auth.registerForm.user.email`, ''),
      set(state`auth.registerForm.user.password`, ''),
      set(state`errorMessages`, []),
      actions.initUser,
      actions.setUser,
      fetchArticlesFeed,
      set(state`auth.registerFormIsLoading`, false),
      redirectToLastVisited,
    ],
    error: [
      set(state`auth.registerForm.user.password`, ''),
      set(state`auth.registerFormIsLoading`, false),
      factories.showValidationError('Could not register!'),
    ],
  },
])

export const signinUser = sequence('Sign-in user', [
  set(state`auth.loginFormIsLoading`, true),
  httpPost('/users/login', state`auth.loginForm`),
  {
    success: [
      set(state`auth.loginForm.user.email`, ''),
      set(state`auth.loginForm.user.password`, ''),
      set(state`errorMessages`, []),
      actions.initUser,
      actions.setUser,
      fetchArticlesFeed,
      set(state`auth.loginFormIsLoading`, false),
      redirectToLastVisited,
    ],
    error: [
      set(state`auth.loginForm.user.password`, ''),
      set(state`auth.loginFormIsLoading`, false),
      factories.showValidationError('Could not log-in!'),
    ],
  },
])

export const logoutUser = sequence('Log user out', [
  set(state`auth.loginFormIsLoading`, false),
  actions.removeUser,
  fetchAllArticles,
  redirectToSignal('homeRouted'),
])

export const changeSettings = sequence('Change settings', [
  set(state`auth.settingsFormIsLoading`, true),
  removeEmptyFields('auth.settingsForm'),
  httpPut('/user', props`cleanedForm`),
  {
    success: [
      set(state`auth.settingsForm.user.image`, ''),
      set(state`auth.settingsForm.user.username`, ''),
      set(state`auth.settingsForm.user.bio`, ''),
      set(state`auth.settingsForm.user.email`, ''),
      set(state`auth.settingsForm.user.password`, ''),
      set(state`errorMessages`, []),
      actions.setUser,
      set(state`auth.settingsFormIsLoading`, false),
      redirectToSignal('homeRouted'),
    ],
    error: [
      set(state`auth.settingsForm.user.password`, ''),
      set(state`auth.settingsFormIsLoading`, false),
      factories.showValidationError('Could not change settings!'),
    ],
  },
])
