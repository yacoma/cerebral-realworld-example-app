import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { equals, set } from 'cerebral/operators'

import { redirectToLogin } from '../../sequences'
import { getValidationErrorMessages } from './actions'

export const showValidationError = (defaultErrorMessage) =>
  sequence('Show validation error', [
    equals(props`error.response.status`),
    {
      401: [set(props`errorMessages`, 'Authorization needed'), redirectToLogin],
      403: [
        set(props`errorMessages`, 'Request is not allowed'),
        redirectToLogin,
      ],
      422: getValidationErrorMessages,
      otherwise: set(props`errorMessages`, [defaultErrorMessage]),
    },
    set(state`errorMessages`, props`errorMessages`),
  ])
