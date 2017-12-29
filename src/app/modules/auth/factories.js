import { sequence } from 'cerebral'
import { props, state } from 'cerebral/tags'
import { equals, set } from 'cerebral/operators'
import { redirectToSignal } from '@cerebral/router/operators'

function getValidationErrorMessages({ props }) {
  const errorMessages = Object.keys(props.error.response.result.errors).reduce(
    (errorMessages, errorField) => {
      if (Array.isArray(props.error.response.result.errors[errorField])) {
        errorMessages.push(
          errorField +
            ': ' +
            props.error.response.result.errors[errorField].join(', ')
        )
      }
      return errorMessages
    },
    []
  )
  return { errorMessages }
}

export function showValidationError(defaultErrorMessage) {
  return sequence('Show validation error', [
    equals(props`error.response.status`),
    {
      401: [
        set(props`errorMessages`, 'Authorization needed'),
        redirectToSignal('pageRouted', { page: 'login' }),
      ],
      403: [
        set(props`errorMessages`, 'Request is not allowed'),
        redirectToSignal('pageRouted', { page: 'login' }),
      ],
      422: getValidationErrorMessages,
      otherwise: set(props`errorMessages`, [defaultErrorMessage]),
    },
    set(state`errorMessages`, props`errorMessages`),
  ])
}
