import { sequence } from 'cerebral'
import { state } from 'cerebral/tags'
import { set } from 'cerebral/operators'
import { httpPut } from '@cerebral/http/operators'
import { redirectToSignal } from '@cerebral/router/operators'

import showValidationError from '../factories/showValidationError'

export default sequence('Change settings', [
  set(state`auth.settingsFormIsLoading`, true),
  httpPut('/user', state`auth.settingsForm`),
  {
    success: [
      set(state`auth.settingsForm.user.image`, ''),
      set(state`auth.settingsForm.user.username`, ''),
      set(state`auth.settingsForm.user.bio`, ''),
      set(state`auth.settingsForm.user.email`, ''),
      set(state`auth.settingsForm.user.password`, ''),
      set(state`errorMessages`, []),
      set(state`auth.settingsFormIsLoading`, false),
      redirectToSignal('homeRouted'),
    ],
    error: [
      set(state`auth.settingsForm.user.password`, ''),
      set(state`auth.settingsFormIsLoading`, false),
      showValidationError('Could not change settings!'),
    ],
  },
])
