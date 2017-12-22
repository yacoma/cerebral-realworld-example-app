import { sequence } from 'cerebral'
import { state } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import removeUser from '../actions/removeUser'

export default sequence('Log user out', [
  set(state`auth.loginFormIsLoading`, false),
  removeUser,
  redirectToSignal('homeRouted'),
])
