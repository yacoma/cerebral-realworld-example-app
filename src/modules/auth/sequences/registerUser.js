import { sequence } from 'cerebral'
import { state } from 'cerebral/tags'
import { set, when } from 'cerebral/operators'
import { httpPost } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import showValidationError from '../factories/showValidationError'
import initUser from '../actions/initUser'

export default sequence('Register new user', [
  set(state`auth.registerFormIsLoading`, true),
  httpPost('/users', state`auth.registerForm`),
  {
    success: [
      set(state`auth.registerForm.user.username`, ''),
      set(state`auth.registerForm.user.email`, ''),
      set(state`auth.registerForm.user.password`, ''),
      set(state`app.errorMessages`, []),
      initUser,
      set(state`auth.registerFormIsLoading`, false),
      when(state`app.lastVisited`),
      {
        true: redirectToSignal('app.pageRouted', {
          page: state`app.lastVisited`,
        }),
        false: redirectToSignal('app.homeRouted'),
      },
    ],
    error: [
      set(state`auth.registerForm.user.password`, ''),
      set(state`auth.registerFormIsLoading`, false),
      showValidationError('Could not register!'),
    ],
  },
])
